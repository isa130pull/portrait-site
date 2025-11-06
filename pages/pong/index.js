// ============================================
// 定数定義
// ============================================
var GAME_CONFIG = {
    // レイアウト比率
    PADDLE_WIDTH_RATIO: 0.25,        // バーの幅（画面幅の25%、PC）
    PADDLE_WIDTH_RATIO_MOBILE: 0.35, // バーの幅（画面幅の35%、モバイル）
    PADDLE_HEIGHT_RATIO: 0.04,       // バーの高さ（画面高さの4%）
    PLAYER_Y_POSITION_RATIO: 0.85,   // プレイヤーバーのY位置（画面高さの85%）
    ENEMY_Y_POSITION_RATIO: 0.10,    // 敵バーのY位置（画面高さの10%）
    CENTER_LINE_Y_RATIO: 0.475,      // 中央線のY位置（画面高さの47.5%）

    // ボール設定
    BALL_SIZE_DIVISOR: 120,          // ボールサイズ計算用（screenW/120 + screenH/120）

    // 当たり判定
    HIT_PADDING_RATIO: 0.05,         // 当たり判定の余裕・幅方向（バー幅の5%）
    HIT_PADDING_HEIGHT_RATIO: 0.02,  // 当たり判定の余裕・高さ方向（バー高さの2%）
    HIT_WAIT_TIME: 100,              // 連続ヒット防止の待機時間（ミリ秒）

    // ゲームルール
    WIN_SCORE: 5,                    // 勝利条件（先取点数）
    WINNING_SCORE_COLOR_THRESHOLD: 4, // 得点表示が黄色になる閾値（リーチ）

    // UI位置
    SCORE_X_RATIO: 1/30,             // スコア表示のX位置
    PLAYER_SCORE_Y_RATIO: 11/20,     // プレイヤースコアのY位置
    ENEMY_SCORE_Y_RATIO: 9/20,       // 敵スコアのY位置

    // 難易度選択UI
    NORMAL_SELECT_Y_START: 7/20,     // NORMAL選択エリアの開始Y（画面高さの35%）
    NORMAL_SELECT_Y_END: 10/20,      // NORMAL選択エリアの終了Y（画面高さの50%）
    HARD_SELECT_Y_START: 11/20,      // HARD選択エリアの開始Y（画面高さの55%）
    HARD_SELECT_Y_END: 15/20,        // HARD選択エリアの終了Y（画面高さの75%）

    // タイミング
    RENDER_INTERVAL: 16.6,           // 描画間隔（ミリ秒、約60fps）
    FONT_LOAD_WAIT: 100,             // フォント読み込み待機時間（ミリ秒）
    GAME_START_DELAY: 3000,          // ゲーム開始遅延（ミリ秒）
    POINT_DELAY: 1500,               // 得点後の遅延（ミリ秒）
    GAME_OVER_DELAY: 5000,           // ゲームオーバー後の遅延（ミリ秒）
    GAME_CLEAR_DELAY: 7500,          // ゲームクリア後の遅延（ミリ秒）
    STAGE_SELECT_DELAY: 1000,        // ステージ選択遷移の遅延（ミリ秒）

    // 難易度
    DIFFICULTY_NORMAL: 0,
    DIFFICULTY_HARD: 1
};

// ============================================
// グローバル変数
// ============================================
var ctx;
var screenW, screenH;
var touchX = 0, touchY = 0;
var isGame = false;
var isTitle = true;
var isLoading = false;
var isInitLoad = false;
var hitAudio = new Audio("hit.mp3");
var startAudio = new Audio("start.mp3");
var scoreUpAudio = new Audio("score_up.mp3");
var clearAudio = new Audio("clear.mp3");
var isMute = false;
var hasPlayerScoredLast = false; // 一つ前にプレイヤーがポイントを取ったかどうか
var isGameOver = false;
var isGameClear = false;
var isStageSelect = false;
var currentDifficulty = 0; // 0: NORMAL, 1: HARD
var isNormalCleared = false;
var isHardCleared = false;
var flashTimes = 0;

// ============================================
// ローカルストレージ（クリア情報の永続化）
// ============================================
var PONG_LS_KEY = 'pong.progress.v1';
var PONG_MUTE_LS_KEY = 'pong.mute.v1';

function savePongProgress() {
    try {
        var data = JSON.stringify({
            isNormalCleared: isNormalCleared,
            isHardCleared: isHardCleared,
            version: 1
        });
        localStorage.setItem(PONG_LS_KEY, data);
    } catch(e) {
        console.warn('Failed to save progress', e);
    }
}

function loadPongProgress() {
    try {
        var data = localStorage.getItem(PONG_LS_KEY);
        if (data) {
            var obj = JSON.parse(data);
            isNormalCleared = obj.isNormalCleared || false;
            isHardCleared = obj.isHardCleared || false;
        }
    } catch(e) {
        console.warn('Failed to load progress', e);
    }
}

function saveMuteState() {
    try {
        localStorage.setItem(PONG_MUTE_LS_KEY, isMute.toString());
    } catch(e) {
        console.warn('Failed to save mute state', e);
    }
}

function loadMuteState() {
    try {
        var saved = localStorage.getItem(PONG_MUTE_LS_KEY);
        if (saved !== null) {
            isMute = saved === 'true';
        }
    } catch(e) {
        console.warn('Failed to load mute state', e);
    }
}

// Firebase Analytics ヘルパー関数
function logGameEvent(eventName, params) {
    try {
        if (window.firebaseLogEvent && window.firebaseAnalytics) {
            window.firebaseLogEvent(window.firebaseAnalytics, eventName, params);
        }
    } catch(e) {
        console.warn('Failed to log event', e);
    }
}

var player = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    point: 0,
    isHitWait: false,
};

var enemy = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    point: 0,
    speed: 0,
    isHitWait: false,
};

var ball = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    dx: 0,
    dy: 0,
    baseSpeed: 0,
    speed: 0,
    rad: 0,
}

// 画面サイズを更新する関数
function updateScreenSize(){
    var canvas = document.getElementById("canvas");
    var gameContainer = document.querySelector(".game-container");

    // game-containerの実際のサイズを取得（headerとfooterを除いた領域）
    var containerRect = gameContainer.getBoundingClientRect();
    screenW = containerRect.width;
    screenH = containerRect.height;

    canvas.width = screenW;
    canvas.height = screenH;
}

// リサイズハンドラ（デバウンス処理付き）
var resizeTimer;
function handleResize(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
        updateScreenSize();
        initParam();
    }, 100);
}

function init(){
    // クリア情報とミュート状態を読み込み
    loadPongProgress();
    loadMuteState();

    window.scrollTo(0,0);

    var canvas = document.getElementById("canvas");

    //画面サイズを取得、反映
    updateScreenSize();

    initParam();

    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    //描画タイマー
    var requestAnimationFrame = window.requestAnimationFrame ||
    　　　　　　　　　　　　　　　　　　　window.mozRequestAnimationFrame ||
                                  　window.webkitRequestAnimationFrame ||
    　　　　　　　　　　　　　　　　　　　window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    // 描画ループを開始（約60fps）
    setInterval(render, GAME_CONFIG.RENDER_INTERVAL);
    
    //タッチ可能か検出
    var touchStart = ('ontouchstart' in window) ? "touchstart" : "mousedown";
    var touchMove = ('ontouchstart' in window) ? "touchmove" : "mousemove";
    var touchEnd = ('ontouchstart' in window) ? "touchend" : "mouseup";

    // タッチイベントリスナーをcanvasに登録（passive: falseでスクロール防止を有効化）
    // canvas要素に限定することで、ヘッダー・フッターのリンクが正常に機能する
    canvas.addEventListener(touchStart, TouchEventStart, {passive: false});
    canvas.addEventListener(touchMove, TouchEventMove, {passive: false});
    canvas.addEventListener(touchEnd, TouchEventEnd, {passive: false});

    // リサイズイベント
    window.addEventListener('resize', handleResize);
    // visualViewportのリサイズ（モバイルのアドレスバー対応）
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
    }

    // ミュートボタンのイベントリスナー登録
    var muteBtn = document.getElementById("muteBtn");
    if (muteBtn) {
        muteBtn.addEventListener("click", toggleMute);
        // 初期状態のUI更新
        updateMuteButton();
    }

    // フォントの初期読み込み待機
    setTimeout(function() {
        isInitLoad = true;
        ctx.fillStyle = "white";
    }, GAME_CONFIG.FONT_LOAD_WAIT);

}

function TouchEventStart(e) {
    e.preventDefault(); // タッチによる画面スクロールを止める

    var canvas = document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();

    // タッチイベントかマウスイベントかを判定
    if (e.changedTouches) {
        // タッチイベントの場合 - Canvas内の相対座標に変換
        touchX = e.changedTouches[0].clientX - rect.left;
        touchY = e.changedTouches[0].clientY - rect.top;
    } else {
        // マウスイベントの場合 - Canvas内の相対座標に変換
        touchX = e.clientX - rect.left;
        touchY = e.clientY - rect.top;
    }

    if (isLoading) return;
    if(isTitle) {
        isLoading = true;
        // タイトル画面でのタップ時に音声再生
        if (!isMute) {
            hitAudio.load();
            startAudio.load();
            // 再生中の音声をキャンセルして新しく再生
            startAudio.pause();
            startAudio.currentTime = 0;
            startAudio.play();
        }
        setTimeout(function(){
            isTitle = false;
            isLoading = false;
            isStageSelect = true;
        },1000);
    }
    else if(isStageSelect) {
        // 難易度NORMAL選択
        if (touchY >= screenH * GAME_CONFIG.NORMAL_SELECT_Y_START &&
            touchY <= screenH * GAME_CONFIG.NORMAL_SELECT_Y_END) {
            isLoading = true;
            currentDifficulty = GAME_CONFIG.DIFFICULTY_NORMAL;
            // Firebase Analytics: ゲーム開始イベント
            logGameEvent('pong_game_start', {
                difficulty: 'normal'
            });
            // 難易度選択時に音声再生
            if (!isMute) {
                // 再生中の音声をキャンセルして新しく再生
                startAudio.pause();
                startAudio.currentTime = 0;
                startAudio.play();
            }
            setTimeout(function(){
                isLoading = false;
                isStageSelect = false;
                initParam();
                setTimeout(fireBall, GAME_CONFIG.GAME_START_DELAY);
            }, GAME_CONFIG.STAGE_SELECT_DELAY);
        }
        // 難易度HARD選択
        else if (touchY >= screenH * GAME_CONFIG.HARD_SELECT_Y_START &&
                 touchY <= screenH * GAME_CONFIG.HARD_SELECT_Y_END) {
            isLoading = true;
            currentDifficulty = GAME_CONFIG.DIFFICULTY_HARD;
            // Firebase Analytics: ゲーム開始イベント
            logGameEvent('pong_game_start', {
                difficulty: 'hard'
            });
            // 難易度選択時に音声再生
            if (!isMute) {
                // 再生中の音声をキャンセルして新しく再生
                startAudio.pause();
                startAudio.currentTime = 0;
                startAudio.play();
            }
            setTimeout(function(){
                isLoading = false;
                isStageSelect = false;
                initParam();
                setTimeout(fireBall, GAME_CONFIG.GAME_START_DELAY);
            }, GAME_CONFIG.STAGE_SELECT_DELAY);
        }

    }

}

function TouchEventMove(e) {
    e.preventDefault(); // タッチによる画面スクロールを止める

    var canvas = document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();

    // タッチイベントかマウスイベントかを判定
    if (e.changedTouches) {
        // タッチイベントの場合 - Canvas内の相対座標に変換
        touchX = e.changedTouches[0].clientX - rect.left;
        touchY = e.changedTouches[0].clientY - rect.top;
    } else {
        // マウスイベントの場合 - Canvas内の相対座標に変換
        touchX = e.clientX - rect.left;
        touchY = e.clientY - rect.top;
    }
}

function TouchEventEnd(e) {
}

function drawPlayer(){
//    ctx.beginPath();

    //プレイヤーの位置を計算
    var adjustTouchX = touchX - player.w / 10 * 6;
    var dx = adjustTouchX - player.x;
    var absDx = Math.abs(dx);
    if (absDx > screenW / 2) {
        player.x += (dx / 3);
    } else if(absDx > screenW / 4) {
        player.x += (dx / 5);        
    } else if(absDx > screenW / 50) {
        player.x += (dx / 8);
    } else if(absDx > screenW / 100) {
        player.x += (dx / 10);
    } 
    //プレイヤー描画
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

//画面中央の点線描画
function drawCenterLine(){
    var num = 15;

    var centerLineW = screenW / (num * 2);
    var centerLineH = screenH / 100;
    var centerLineY = screenH / 40 * 19 - centerLineH / 2;
    
    for(var i=0; i<num; i++) {
        //点線描画
        ctx.fillRect(centerLineW / 2 + (i * 2) * centerLineW,centerLineY,centerLineW,centerLineH);
    }    
}

// 敵プレイヤー描画
function drawEnemy() {
    if(isGame) {
        //味方陣地エリアにボールがあり、角度が大きくついている場合は中央付近に移動させる
        if ( (ball.rad <= 0.3 || ball.rad >= 0.7) && ball.y > screenH / 10 * 7){
            moveEnemyCenter();
        }
        else {
            var adjustEnemySpeed = enemy.speed; 

            //ボールの反射角が一定以上ならば加速させる
            if (ball.rad < 0.30 || ball.rad > 0.70) adjustEnemySpeed *= 1.2;
            else if (ball.rad < 0.35 || ball.rad > 0.65) adjustEnemySpeed *= 1.1;
            
            //ボールの速度が一定以上なら加速させる
            //if (ball.speed > 2.5) adjustEnemySpeed *= 1.05;

            //ボールの速度より遅い移動速度であれば若干加速させる
            if (adjustEnemySpeed < Math.abs(ball.dx)) adjustEnemySpeed *= 1.05;
            
            //敵移動速度分移動させる
            enemy.x = (enemy.x + enemy.w / 2 < ball.x) ? enemy.x + adjustEnemySpeed / 2 : enemy.x - adjustEnemySpeed / 2; 
            if (Math.abs( (enemy.x + enemy.w / 2) - ball.x) < adjustEnemySpeed) {            
                enemy.x = ball.x + ball.w / 2 - enemy.w / 2; 
            }
            else {
                enemy.x = (enemy.x + enemy.w / 2 < ball.x) ? enemy.x + adjustEnemySpeed / 2 : enemy.x - adjustEnemySpeed / 2;            
            }
            //画面外に出ないように
            if(enemy.x < 0) enemy.x = 0;
            else if(enemy.x + enemy.w > screenW) enemy.x = screenW - enemy.w;
        }
    }
    else {
    // ボールが発射されるまでは画面中央に布陣させる
    moveEnemyCenter();
    }
    // HARDモードでプレイヤーがリーチの時、敵バーが赤くなる（本気モード）
    if (currentDifficulty === GAME_CONFIG.DIFFICULTY_HARD &&
        player.point >= GAME_CONFIG.WINNING_SCORE_COLOR_THRESHOLD) {
        ctx.fillStyle = "#FF0000";
    }
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    ctx.fillStyle = "#FFFFFF";
}

//敵バーを中央付近に移動させる
function moveEnemyCenter() {
    enemy.x = (enemy.x + enemy.w / 2 < screenW / 2) ? enemy.x + enemy.speed / 2 : enemy.x - enemy.speed / 2;
    if (Math.abs( (enemy.x + enemy.w / 2) - screenW) < enemy.speed) {
        enemy.x = screenW - enemy.w / 2; 
    }
    else {
        enemy.x = (enemy.x + enemy.w / 2 < screenW / 2) ? enemy.x + enemy.speed / 2 : enemy.x - enemy.speed / 2;            
    }
}


// 得点を描画
function drawPoint() {
    var scoreFontSize;
    if (screenW <= 480) {
        scoreFontSize = Math.floor(screenW * 0.13); // 小画面: 49-62px
    } else if (screenW <= 768) {
        scoreFontSize = Math.floor(screenW * 0.11); // 中画面: 84px程度
    } else {
        scoreFontSize = 100; // 大画面: 元のサイズ
    }
    ctx.font = scoreFontSize + "px Orbitron";

    // プレイヤースコア（得点時は点滅）
    if (hasPlayerScoredLast && !isGame && flashTimes % 20 < 10){}
    else {
        if (player.point >= GAME_CONFIG.WINNING_SCORE_COLOR_THRESHOLD) {
            ctx.fillStyle = "#FFFF00"; // リーチ時は黄色
        }
        ctx.fillText(player.point, screenW * GAME_CONFIG.SCORE_X_RATIO, screenH * GAME_CONFIG.PLAYER_SCORE_Y_RATIO);
        ctx.fillStyle = "#FFFFFF";
    }

    // 敵スコア（敵得点時は点滅）
    if (!hasPlayerScoredLast && !isGame && flashTimes % 20 < 10 && enemy.point != 0){}
    else {
        if (enemy.point >= GAME_CONFIG.WINNING_SCORE_COLOR_THRESHOLD) {
            ctx.fillStyle = "#FFFF00"; // リーチ時は黄色
        }
        ctx.fillText(enemy.point, screenW * GAME_CONFIG.SCORE_X_RATIO, screenH * GAME_CONFIG.ENEMY_SCORE_Y_RATIO);
        ctx.fillStyle = "#FFFFFF";
    }

    // 最初のみ勝利条件を表示
    if (!isGame && player.point + enemy.point == 0) {
        var winTextFontSize;
        if (screenW <= 480) {
            winTextFontSize = Math.floor(screenW * 0.06); // 小画面: 22-28px
        } else if (screenW <= 768) {
            winTextFontSize = Math.floor(screenW * 0.07); // 中画面: 53px程度
        } else {
            winTextFontSize = 60; // 大画面: 60px
        }
        ctx.font = winTextFontSize + "px Orbitron";
        var text = GAME_CONFIG.WIN_SCORE + " POINTS WIN";
        var textWidth = ctx.measureText(text);
        ctx.fillText(text, screenW/2 - textWidth.width / 2, screenH * GAME_CONFIG.NORMAL_SELECT_Y_START);
    }
}

// タイトルを描画
function drawTitle() {
    if(!isInitLoad) ctx.fillStyle = "black";

    //Tap Startの文字を点滅させる
    var flashTime = isLoading ? 10 : 100;
    var tapStartFontSize;
    if (screenW <= 480) {
        tapStartFontSize = Math.floor(screenW * 0.08); // 小画面: 30-38px
    } else if (screenW <= 768) {
        tapStartFontSize = Math.floor(screenW * 0.10); // 中画面: 77px程度
    } else {
        tapStartFontSize = 80; // 大画面: 元のサイズ
    }
    ctx.font = tapStartFontSize + "px Orbitron";
    var text = "Tap Start";
    var textWidth = ctx.measureText(text);

    if(flashTimes % flashTime < flashTime/2 ) {
        ctx.fillText(text,screenW/2 - textWidth.width / 2 ,screenH / 1.5);
    }

    var titleFontSize;
    if (screenW <= 480) {
        titleFontSize = Math.floor(screenW * 0.16); // 小画面: 60-76px
    } else if (screenW <= 768) {
        titleFontSize = Math.floor(screenW * 0.13); // 中画面: 100px程度
    } else {
        titleFontSize = 160; // 大画面: 元のサイズ
    }
    ctx.font = titleFontSize + "px Orbitron";
    text = (isNormalCleared && isHardCleared) ? "POPOPONG" : "POPONG";
    textWidth = ctx.measureText(text);
    ctx.fillText(text,screenW/2 - textWidth.width / 2 ,screenH / 3);
}

// ステージセレクト画面
function drawStageSelect() {
    if(!isStageSelect) return;

    var selectFontSize;
    if (screenW <= 480) {
        selectFontSize = Math.floor(screenW * 0.07); // 小画面: 26-33px
    } else if (screenW <= 768) {
        selectFontSize = Math.floor(screenW * 0.08); // 中画面: 61px程度
    } else {
        selectFontSize = 60; // 大画面: 元のサイズ
    }
    ctx.font = selectFontSize + "px Orbitron";
    var text = "SELECT DIFFICULTY";
    var textWidth = ctx.measureText(text);
    ctx.fillText(text,screenW/2 - textWidth.width / 2 ,screenH / 10 * 2);

    var difficultyFontSize;
    if (screenW <= 480) {
        difficultyFontSize = Math.floor(screenW * 0.12); // 小画面: 45-57px
    } else if (screenW <= 768) {
        difficultyFontSize = Math.floor(screenW * 0.10); // 中画面: 77px程度
    } else {
        difficultyFontSize = 120; // 大画面: 元のサイズ
    }
    ctx.font = difficultyFontSize + "px Orbitron";

    text = "NORMAL";
    textWidth = ctx.measureText(text);

    if(!isLoading || currentDifficulty == 1 || flashTimes % 10 < 5 ) {
        if(isNormalCleared) ctx.fillStyle = "#FFFF00";
        ctx.fillText(text,screenW/2 - textWidth.width / 2 ,screenH / 20 * 9);
    }
    ctx.fillStyle = "#FFFFFF";
    text = "HARD";
    textWidth = ctx.measureText(text);

    if(!isLoading || currentDifficulty == 0 || flashTimes % 10 < 5 ) {
        if(isHardCleared) ctx.fillStyle = "#FFFF00";
        ctx.fillText(text,screenW/2 - textWidth.width / 2 ,screenH / 20 * 13);
    }

    ctx.fillStyle = "#FFFFFF";
}


// ボールを描画
function drawBall() {
    if (!isGame) return;

    ball.x += ball.dx;
    ball.y += ball.dy;

    //壁の跳ね返り
    if(ball.x + ball.w >= screenW) {
        ball.x = screenW - ball.w;
        ball.dx = -ball.dx;
    }
    // 敵ポイント（ボールが画面下に落ちた）
    else if(ball.y + ball.h >= screenH) {
        isGame = false;
        hasPlayerScoredLast = false;

        if(++enemy.point >= GAME_CONFIG.WIN_SCORE) {
            isGameOver = true;
            playClearSE();
            // Firebase Analytics: ゲームオーバーイベント
            logGameEvent('pong_game_over', {
                difficulty: currentDifficulty === GAME_CONFIG.DIFFICULTY_NORMAL ? 'normal' : 'hard',
                player_score: player.point,
                enemy_score: enemy.point
            });
            setTimeout(function(){
                isTitle = true;
            }, GAME_CONFIG.GAME_OVER_DELAY);
        }
        else {
            // 得点時の音声再生
            playScoreUpSE();
            setTimeout(fireBall, GAME_CONFIG.POINT_DELAY);
        }

    }
    else if(ball.x <= 0) {
        ball.x = 0;
        ball.dx = -ball.dx;
    }
    // プレイヤーポイント（ボールが画面上に抜けた）
    else if(ball.y <= 0) {
        isGame = false;
        hasPlayerScoredLast = true;

        if(++player.point >= GAME_CONFIG.WIN_SCORE) {
            isGameClear = true;
            if (currentDifficulty === GAME_CONFIG.DIFFICULTY_NORMAL) isNormalCleared = true;
            else if(currentDifficulty === GAME_CONFIG.DIFFICULTY_HARD) isHardCleared = true;

            // クリア情報を保存
            savePongProgress();

            playClearSE();
            // Firebase Analytics: ゲームクリアイベント
            logGameEvent('pong_game_clear', {
                difficulty: currentDifficulty === GAME_CONFIG.DIFFICULTY_NORMAL ? 'normal' : 'hard',
                player_score: player.point,
                enemy_score: enemy.point
            });
            setTimeout(function(){
                isTitle = true;
            }, GAME_CONFIG.GAME_CLEAR_DELAY);
        }
        else {
            playScoreUpSE();
            setTimeout(fireBall, GAME_CONFIG.POINT_DELAY);
        }

    }

    // プレイヤーバーの跳ね返りチェック
    // 当たり判定（バーの描画より指定%大きい範囲で判定）
    var hitPaddingWidth = player.w * GAME_CONFIG.HIT_PADDING_RATIO;
    var hitPaddingHeight = player.h * GAME_CONFIG.HIT_PADDING_HEIGHT_RATIO;
    var playerHitLeft = player.x - hitPaddingWidth;
    var playerHitRight = player.x + player.w + hitPaddingWidth;
    var playerHitTop = player.y - hitPaddingHeight;
    var playerHitBottom = player.y + player.h + hitPaddingHeight;

    // ボールの範囲（ball.x, ball.y は中心座標、ball.w は半径）
    var ballLeft = ball.x - ball.w;
    var ballRight = ball.x + ball.w;
    var ballTop = ball.y - ball.w;
    var ballBottom = ball.y + ball.w;

    if( playerHitLeft < ballRight && playerHitRight > ballLeft &&
        playerHitTop < ballBottom && playerHitBottom > ballTop &&
        (!player.isHitWait)
    ){
        playHitSE();
        accelBall();

        //当たった場所によって角度を変える (範囲 0 〜 0.5)
        var hitXRate = ((ball.x - player.x) / player.w) / 2;

        //rad 1.25〜1.75の範囲
        var rad = Math.PI * 1.25 + (Math.PI * hitXRate);
//        alert("rad..." + rad + " ball.rad..." + ball.rad + " hitXRate..." + hitXRate);
//        alert("radacos..." + Math.acos(rad) + " radasin" + Math.asinh(rad));
        
        if (ball.rad >= 0.1 && ball.rad <= 0.5) rad -= 0.1 * Math.PI;
        else if (ball.rad >= 0.6 && ball.rad <= 0.9) rad += 0.1 * Math.PI;
        
        ball.dx = ball.baseSpeed * Math.cos(rad) * ball.speed;
        ball.dy = ball.baseSpeed * Math.sin(rad) * ball.speed;

        ball.rad = (rad - Math.PI) / Math.PI;

        player.isHitWait = true;
        setTimeout(function(){
            player.isHitWait = false;
        }, GAME_CONFIG.HIT_WAIT_TIME);
    }

    // 敵バーの跳ね返りチェック
    // 当たり判定（バーの描画より指定%大きい範囲で判定）
    var enemyHitLeft = enemy.x - hitPaddingWidth;
    var enemyHitRight = enemy.x + enemy.w + hitPaddingWidth;
    var enemyHitTop = enemy.y - hitPaddingHeight;
    var enemyHitBottom = enemy.y + enemy.h + hitPaddingHeight;

    if( enemyHitLeft < ballRight && enemyHitRight > ballLeft &&
        enemyHitTop < ballBottom && enemyHitBottom > ballTop &&
        (!enemy.isHitWait)
    ){
        playHitSE();
        accelBall();

        ball.dy = -ball.dy;
        enemy.isHitWait = true;
        setTimeout(function(){
            enemy.isHitWait = false;
        }, GAME_CONFIG.HIT_WAIT_TIME);
    }


    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.w, 0, Math.PI*2, false);
    ctx.fill();
}

//ボールを発射
function fireBall() {
    isGame = true;

    // ボールの初期位置（前回得点した側から発射）
    // 当たり判定を拡大した影響で、初期位置を調整
    var hitPaddingHeight = player.h * GAME_CONFIG.HIT_PADDING_HEIGHT_RATIO;

    if (hasPlayerScoredLast) {
        // 敵プレイヤーから発射（当たり判定範囲外に配置）
        ball.x = enemy.x + enemy.w / 2;
        ball.y = enemy.y + enemy.h + ball.w + hitPaddingHeight * 2;
    }
    else {
        // 味方プレイヤーから発射（当たり判定範囲外に配置）
        ball.x = player.x + player.w / 2;
        ball.y = player.y - ball.w - hitPaddingHeight * 2;
    }

    // 難易度別パラメータ設定
    var initSpeedArray, initRangeArray, enemySpeedArray, hdpArray;

    // 初速補正（ポイントが増えるごとに初速が増す）
    if(currentDifficulty === GAME_CONFIG.DIFFICULTY_NORMAL) {
        // NORMAL（ボール初速は元に戻す、敵AI速度は序盤を緩和）
        initSpeedArray = [1.3, 1.5, 1.6, 1.7, 1.8, 2.0, 2.2];
        initRangeArray = [130, 115, 100, 90, 80, 70, 60];
        enemySpeedArray = [250, 225, 200, 137.5, 125, 112.5, 93.75];
        hdpArray = [0, -10, -20, 20, 30];
    }
    else if(currentDifficulty === GAME_CONFIG.DIFFICULTY_HARD) {
        // HARD（ボール初速20%減、敵AI速度20%減）
        initSpeedArray = [2.08, 2.24, 2.4, 2.56, 2.64, 2.72, 2.8];
        initRangeArray = [80, 70, 60, 50, 40, 30, 25];
        enemySpeedArray = [112.5, 100, 87.5, 81.25, 62.5, 56.25, 50];
        hdpArray = [0, -10, -20, 10, 20];
    }


    var initSpeed,initRange,enemySpeed,hdp;
    var initRange = 80;

    var totalPoint = player.point * 1.3 + enemy.point;

    //// 敵との得失点差
    //こっちが大きく勝っている
    if (player.point - enemy.point >= 2) hdp = hdpArray[1];
    else if (player.point - enemy.point >= 4) hdp = hdpArray[2];
    //こっちが負けている
    else if(enemy.point - player.point >= 2) hdp = hdpArray[3];
    else if(enemy.point - player.point >= 4) hdp = hdpArray[4];
    //得失点差が小さい場合
    else hdp = hdpArray[0];

    //敵味方の総得点でパラメータを設定
    if(totalPoint <= 3) {
        initSpeed = initSpeedArray[0];
        initRange = initRangeArray[0];
        enemy.speed = screenW / (enemySpeedArray[0] + hdp);
    }
    else if(totalPoint < 6) {
        initSpeed = initSpeedArray[1];
        initRange = initRangeArray[1];
        enemy.speed = screenW / (enemySpeedArray[1] + hdp);
    }
    else if(totalPoint < 8) {
        initSpeed = initSpeedArray[2];
        initRange = initRangeArray[2];
        enemy.speed = screenW / (enemySpeedArray[2] + hdp);
    }
    else if(totalPoint < 10) {
        initSpeed = initSpeedArray[3];
        initRange = initRangeArray[3];
        enemy.speed = screenW / (enemySpeedArray[3] + hdp);
    }
    else if(totalPoint < 12) {
        initSpeed = initSpeedArray[4];
        initRange = initRangeArray[4];
        enemy.speed = screenW / (enemySpeedArray[4] + hdp);
    }
    else if(totalPoint < 15) {
        initSpeed = initSpeedArray[5];
        initRange = initRangeArray[5];
        enemy.speed = screenW / (enemySpeedArray[5] + hdp);
    }
    else if(totalPoint >= 15) {
        initSpeed = initSpeedArray[6];
        initRange = initRangeArray[6];
        enemy.speed = screenW / (enemySpeedArray[6] + hdp);
    }

    // ボールの初速を計算
    ball.dx = screenW / (initRange + Math.floor(Math.random() * (initRange * 1.5)));
    ball.dy = screenH / 150.0 * initSpeed;

    // X方向はランダム
    ball.dx = Math.random() * 2 >= 1 ? ball.dx : -ball.dx;

    // Y方向は前回得点した側へ（初回は必ず敵側へ）
    ball.dy = hasPlayerScoredLast ? ball.dy : -ball.dy;

    ball.baseSpeed = Math.sqrt(Math.pow(Math.abs(ball.dx),2) + Math.pow(Math.abs(ball.dy),2));
    ball.speed = 1.0;
}

function playHitSE(){
    if (!isMute){
        // 再生中の音声をキャンセルして新しく再生
        hitAudio.pause();
        hitAudio.currentTime = 0;
        hitAudio.play();
    }
}

function playScoreUpSE(){
    if (!isMute){
        // 再生中の音声をキャンセルして新しく再生
        scoreUpAudio.pause();
        scoreUpAudio.currentTime = 0;
        scoreUpAudio.play();
    }
}

function playClearSE(){
    if (!isMute){
        // 再生中の音声をキャンセルして新しく再生
        clearAudio.pause();
        clearAudio.currentTime = 0;
        clearAudio.play();
    }
}

// ミュート切り替え
function toggleMute() {
    isMute = !isMute;
    updateMuteButton();
    saveMuteState();
    // Firebase Analytics: ミュートトグルイベント
    logGameEvent('pong_mute_toggle', {
        muted: isMute
    });
}

// ミュートボタンのUI更新
function updateMuteButton() {
    var muteBtn = document.getElementById("muteBtn");
    if (!muteBtn) return;

    if (isMute) {
        muteBtn.textContent = "🔇";
        muteBtn.classList.add("muted");
        muteBtn.setAttribute("aria-label", "音声ミュート解除");
    } else {
        muteBtn.textContent = "🔊";
        muteBtn.classList.remove("muted");
        muteBtn.setAttribute("aria-label", "音声ミュート");
    }
}

function accelBall(){
    if(ball.speed <= 1.5) {
        ball.speed += 0.15;
    }
    else if(ball.speed <= 2.0) {
        ball.speed += 0.1;
    }
    else if(ball.speed <= 3.0) {
        ball.speed += 0.05;
    }
    else if(ball.speed <= 5.0) {
        ball.speed += 0.02;
    } 
    else {
        ball.speed += 0.005;
    }
}


function render() {
    ctx.clearRect(0, 0, screenW, screenH);
    flashTimes++;    

    if (isTitle) {
        drawTitle();
        return;
    }
    else if(isStageSelect) {
        drawStageSelect();
        return;
    }

    drawPlayer();
    drawEnemy();
    drawCenterLine();
    drawPoint();
    drawBall();
    drawGameOver();
    drawGameClear();
    
    //デバッグ用 タッチ座標を表示
    // ctx.font = "40px Orbitron";
    // ctx.fillText("touchpoint...x=" + touchX + "  y=" + touchY,screenW / 3, screenH / 8);    
}

var gameEndStrY = 0;
function drawGameOver() {
    if(!isGameOver) return;

    gameEndStrY += 4;
    if (gameEndStrY > screenH / 3) {
        gameEndStrY = screenH / 3;
    }
    var gameEndFontSize;
    if (screenW <= 480) {
        gameEndFontSize = Math.floor(screenW * 0.11); // 小画面: 41-52px
    } else if (screenW <= 768) {
        gameEndFontSize = Math.floor(screenW * 0.10); // 中画面: 77px程度
    } else {
        gameEndFontSize = 120; // 大画面: 元のサイズ
    }
    ctx.font = gameEndFontSize + "px Orbitron";
    var text = "GAME OVER...";
    var textWidth = ctx.measureText(text);
    ctx.fillText(text,screenW/2 - textWidth.width / 2 ,gameEndStrY);

}

function drawGameClear() {
    if(!isGameClear) return;

    gameEndStrY += 4;
    if (gameEndStrY > screenH / 3) {
        gameEndStrY = screenH / 3;
    }
    var gameEndFontSize;
    if (screenW <= 480) {
        gameEndFontSize = Math.floor(screenW * 0.11); // 小画面: 41-52px
    } else if (screenW <= 768) {
        gameEndFontSize = Math.floor(screenW * 0.10); // 中画面: 77px程度
    } else {
        gameEndFontSize = 120; // 大画面: 元のサイズ
    }
    ctx.font = gameEndFontSize + "px Orbitron";
    var text  = "GAME CLEAR!!";
    var textWidth = ctx.measureText(text);
    ctx.fillText(text,screenW/2 - textWidth.width / 2 ,gameEndStrY);

}


function initParam(){
    // 各パラメータ初期化
    touchX = screenW / 2;

    // 縦長画面（スマホ）かどうかを判定してバーの幅を調整
    var isPortrait = screenH > screenW;
    var paddleWidthRatio = isPortrait ? GAME_CONFIG.PADDLE_WIDTH_RATIO_MOBILE : GAME_CONFIG.PADDLE_WIDTH_RATIO;

    // プレイヤーバー設定
    player.w = screenW * paddleWidthRatio;
    player.h = screenH * GAME_CONFIG.PADDLE_HEIGHT_RATIO;
    player.x = touchX - player.w / 2;
    player.y = screenH * GAME_CONFIG.PLAYER_Y_POSITION_RATIO - player.h / 2;
    player.point = 0;

    // 敵バー設定
    enemy.w = player.w;
    enemy.h = player.h;
    enemy.x = player.x;
    enemy.y = screenH * GAME_CONFIG.ENEMY_Y_POSITION_RATIO - enemy.h / 2;
    enemy.speed = screenW / 100;
    enemy.point = 0;

    // ボール設定
    ball.w = (screenW / GAME_CONFIG.BALL_SIZE_DIVISOR + screenH / GAME_CONFIG.BALL_SIZE_DIVISOR);
    ball.h = ball.w;
    ball.rad = 0.5;

    // ゲーム終了演出用
    gameEndStrY = -screenH / 10;

    // 状態リセット
    isGameOver = false;
    isGameClear = false;
    hasPlayerScoredLast = false;
    flashTimes = 0;
}
