// ============================================
// PlayFab ランキング管理モジュール
// ============================================

// PlayFab設定
var PLAYFAB_CONFIG = {
    TITLE_ID: "6AB34",
    LEADERBOARD_NORMAL: "pong_normal_time",
    LEADERBOARD_HARD: "pong_hard_time",
    CUSTOM_ID_KEY: "pong_playfab_custom_id",
    PLAYER_NAME_KEY: "pong_player_name"
};

// グローバル変数
var isPlayFabLoggedIn = false;
var playfabPlayerId = null;

// ============================================
// UUID生成（匿名ログイン用）
// ============================================
function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// ============================================
// PlayFab初期化
// ============================================
function initPlayFab() {
    if (typeof PlayFab === 'undefined') {
        console.error('PlayFab SDK not loaded');
        return false;
    }

    PlayFab.settings.titleId = PLAYFAB_CONFIG.TITLE_ID;
    console.log('PlayFab initialized with Title ID:', PLAYFAB_CONFIG.TITLE_ID);
    return true;
}

// ============================================
// PlayFabに匿名ログイン
// ============================================
function loginToPlayFab(callback) {
    // すでにログイン済みの場合
    if (isPlayFabLoggedIn && playfabPlayerId) {
        console.log('Already logged in to PlayFab');
        if (callback) callback({ success: true, playFabId: playfabPlayerId });
        return;
    }

    // ローカルストレージからカスタムIDを取得（なければ生成）
    var customId = localStorage.getItem(PLAYFAB_CONFIG.CUSTOM_ID_KEY);
    if (!customId) {
        customId = generateUUID();
        localStorage.setItem(PLAYFAB_CONFIG.CUSTOM_ID_KEY, customId);
        console.log('Generated new Custom ID:', customId);
    }

    var loginRequest = {
        TitleId: PlayFab.settings.titleId,
        CustomId: customId,
        CreateAccount: true
    };

    PlayFab.ClientApi.LoginWithCustomID(loginRequest,
        function(result) {
            isPlayFabLoggedIn = true;
            playfabPlayerId = result.data.PlayFabId;
            console.log('Logged in to PlayFab! PlayFabId:', playfabPlayerId);

            if (callback) callback({ success: true, playFabId: playfabPlayerId });
        },
        function(error) {
            console.error('PlayFab login failed:', error);
            if (callback) callback({ success: false, error: error });
        }
    );
}

// ============================================
// プレイヤー名のバリデーション
// ============================================
function validatePlayerName(name) {
    // 空文字チェック
    if (!name || name.trim().length === 0) {
        return { valid: false, message: "名前を入力してください" };
    }

    // 長さチェック
    var trimmedName = name.trim();
    if (trimmedName.length < 1 || trimmedName.length > 12) {
        return { valid: false, message: "名前は1~12文字で入力してください" };
    }

    // 使用可能文字チェック（英数字、ひらがな、カタカナ、漢字、スペース）
    var pattern = /^[a-zA-Z0-9ぁ-んァ-ヶー一-龯\s]+$/;
    if (!pattern.test(trimmedName)) {
        return { valid: false, message: "使用できない文字が含まれています" };
    }

    return { valid: true, name: trimmedName };
}

// ============================================
// 表示名を更新
// ============================================
function updateDisplayName(playerName, callback) {
    var validation = validatePlayerName(playerName);
    if (!validation.valid) {
        if (callback) callback({ success: false, message: validation.message });
        return;
    }

    var request = {
        DisplayName: validation.name
    };

    PlayFab.ClientApi.UpdateUserTitleDisplayName(request,
        function(result) {
            console.log('Display name updated:', validation.name);
            // ローカルストレージに保存（次回自動入力用）
            localStorage.setItem(PLAYFAB_CONFIG.PLAYER_NAME_KEY, validation.name);
            if (callback) callback({ success: true, name: validation.name });
        },
        function(error) {
            console.error('Failed to update display name:', error);
            if (callback) callback({ success: false, error: error });
        }
    );
}

// ============================================
// スコアを送信
// ============================================
function submitScore(playerName, clearTime, difficulty, callback) {
    console.log('Submitting score:', playerName, clearTime, difficulty);

    // ログインしていない場合はログイン
    loginToPlayFab(function(loginResult) {
        if (!loginResult.success) {
            if (callback) callback({ success: false, message: 'ログインに失敗しました' });
            return;
        }

        // 表示名を更新
        updateDisplayName(playerName, function(nameResult) {
            if (!nameResult.success) {
                if (callback) callback({ success: false, message: nameResult.message || '名前の更新に失敗しました' });
                return;
            }

            // スコアを送信
            var statisticName = (difficulty === 0) ?
                PLAYFAB_CONFIG.LEADERBOARD_NORMAL :
                PLAYFAB_CONFIG.LEADERBOARD_HARD;

            var request = {
                Statistics: [{
                    StatisticName: statisticName,
                    Value: clearTime // ミリ秒単位
                }]
            };

            PlayFab.ClientApi.UpdatePlayerStatistics(request,
                function(result) {
                    console.log('Score submitted successfully!');
                    // Firebase Analyticsにも記録
                    logGameEvent('pong_score_submitted', {
                        difficulty: difficulty === 0 ? 'normal' : 'hard',
                        clear_time_ms: clearTime,
                        player_name: playerName
                    });
                    if (callback) callback({ success: true });
                },
                function(error) {
                    console.error('Failed to submit score:', error);
                    if (callback) callback({ success: false, message: 'スコアの送信に失敗しました' });
                }
            );
        });
    });
}

// ============================================
// ランキングを取得
// ============================================
function getLeaderboard(difficulty, maxResults, callback) {
    maxResults = maxResults || 100; // デフォルトTop 100

    // ログインしていない場合はログイン
    loginToPlayFab(function(loginResult) {
        if (!loginResult.success) {
            if (callback) callback({ success: false, message: 'ログインに失敗しました' });
            return;
        }

        var statisticName = (difficulty === 0) ?
            PLAYFAB_CONFIG.LEADERBOARD_NORMAL :
            PLAYFAB_CONFIG.LEADERBOARD_HARD;

        var request = {
            StatisticName: statisticName,
            StartPosition: 0,
            MaxResultsCount: maxResults
        };

        PlayFab.ClientApi.GetLeaderboard(request,
            function(result) {
                console.log('Leaderboard retrieved:', result.data.Leaderboard.length, 'entries');
                if (callback) callback({
                    success: true,
                    leaderboard: result.data.Leaderboard,
                    version: result.data.Version
                });
            },
            function(error) {
                console.error('Failed to get leaderboard:', error);
                if (callback) callback({ success: false, message: 'ランキングの取得に失敗しました' });
            }
        );
    });
}

// ============================================
// 自分の順位を取得
// ============================================
function getPlayerRank(difficulty, callback) {
    // ログインしていない場合はログイン
    loginToPlayFab(function(loginResult) {
        if (!loginResult.success) {
            if (callback) callback({ success: false, message: 'ログインに失敗しました' });
            return;
        }

        var statisticName = (difficulty === 0) ?
            PLAYFAB_CONFIG.LEADERBOARD_NORMAL :
            PLAYFAB_CONFIG.LEADERBOARD_HARD;

        var request = {
            StatisticName: statisticName,
            MaxResultsCount: 1
        };

        PlayFab.ClientApi.GetLeaderboardAroundPlayer(request,
            function(result) {
                if (result.data.Leaderboard && result.data.Leaderboard.length > 0) {
                    var entry = result.data.Leaderboard[0];
                    console.log('Player rank:', entry.Position + 1, 'Score:', entry.StatValue);
                    if (callback) callback({
                        success: true,
                        rank: entry.Position + 1,
                        score: entry.StatValue,
                        displayName: entry.DisplayName
                    });
                } else {
                    if (callback) callback({ success: false, message: 'ランキングに登録されていません' });
                }
            },
            function(error) {
                console.error('Failed to get player rank:', error);
                if (callback) callback({ success: false, message: '順位の取得に失敗しました' });
            }
        );
    });
}

// ============================================
// 保存されたプレイヤー名を取得
// ============================================
function getSavedPlayerName() {
    return localStorage.getItem(PLAYFAB_CONFIG.PLAYER_NAME_KEY) || '';
}
