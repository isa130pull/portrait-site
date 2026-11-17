(function () {
  'use strict';

  var locale = document.documentElement.lang === 'en' ? 'en' : 'ja';
  var copy = locale === 'en' ? {
    defaultTitle: 'Bingo',
    sampleTitle: 'Setlist Bingo',
    free: 'FREE',
    cellLabel: function (row, column) { return 'Bingo row ' + row + ', column ' + column; },
    freeCellLabel: 'Free center space',
    resetTitle: 'Reset bingo card',
    resetMessage: 'This will remove every entry and mark. Continue?',
    sampleTitleDialog: 'Fill with a sample',
    sampleMessage: 'This will replace the current entries with a sample card. Continue?',
    templateTitleDialog: 'Apply a template',
    templateMessage: function (name) {
      return 'This will replace the current entries with the “' + name + '” template. Continue?';
    },
    cancel: 'Cancel',
    confirm: 'OK',
    resetDone: 'Card reset',
    sampleDone: 'Sample card added',
    templateDone: function (name) { return '“' + name + '” template applied'; },
    nothingToShuffle: 'There are no entries to shuffle',
    shuffled: 'Entries shuffled',
    inputComplete: 'All spaces are filled',
    editStatus: function (filled, total) { return filled + '/' + total + ' filled · Edit mode'; },
    previewStatus: function (filled, total) { return 'Preview · ' + filled + '/' + total + ' filled'; },
    playStatus: function (lines, marked, total) {
      var label = lines === 1 ? 'line' : 'lines';
      return lines + ' bingo ' + label + ' · ' + marked + '/' + total + ' marked';
    },
    bingo: function (lines) {
      return lines === 1 ? 'Bingo! 1 completed line' : 'Bingo! ' + lines + ' completed lines';
    },
    linkCopied: 'Share link copied',
    copyPrompt: 'Copy this URL',
    sharedLoaded: 'Shared card loaded',
    invalidShare: 'The shared card could not be loaded',
    imageShared: 'Image shared',
    imageSaved: 'Image saved',
    exportFailed: 'The image could not be created',
    printReady: function (count) {
      return count === 1 ? 'Print preview opened' : count + ' shuffled cards prepared for printing';
    },
    printCardNumber: function (number, total) { return total > 1 ? 'Card ' + number + ' of ' + total : ''; },
    previewRegion: 'Finished bingo card preview',
    creditDefault: 'Bingo Card Maker',
    imageCredit: function (name) { return 'Made with ' + name + ' (free, no sign-up)'; },
    imageBingoBadge: function (lines) { return lines === 1 ? 'BINGO × 1 line' : 'BINGO × ' + lines + ' lines'; },
    defaultHashtags: 'bingo',
    postText: function (title, lines) {
      if (lines > 0) return 'Got ' + lines + (lines === 1 ? ' line' : ' lines') + ' on my “' + title + '” card!';
      return 'I made a “' + title + '” card.';
    },
    xIntentOpened: 'Image saved. Attach it to your post on X.',
    sample3: [
      'Opening song', 'New song', 'Solo',
      'Unit song', 'MC', 'Ballad',
      'Fan favorite', 'Cover song', 'Encore'
    ],
    sample5: [
      'Opening song', 'New song', 'Solo', 'Unit song', 'MC',
      'Ballad', 'Fan favorite', 'Cover song', 'Dance song', 'Acoustic',
      'Surprise guest', 'Costume change', 'Surprise song', 'Call and response', 'Medley',
      'Rare song', 'Debut song', 'Latest single', 'Theme song', 'Long MC',
      'Final song', 'Encore', 'Double encore', 'Photo time', 'Announcement'
    ]
  } : {
    defaultTitle: 'ビンゴ',
    sampleTitle: 'セトリビンゴ',
    free: 'FREE',
    cellLabel: function (row, column) { return 'ビンゴ' + row + '行' + column + '列の項目'; },
    freeCellLabel: '中央のFREEマス',
    resetTitle: 'ビンゴカードのリセット',
    resetMessage: '入力内容とマークがすべて削除されます。よろしいですか？',
    sampleTitleDialog: 'サンプルを入力',
    sampleMessage: '現在の入力内容をサンプルカードに置き換えます。よろしいですか？',
    templateTitleDialog: 'テンプレートを反映',
    templateMessage: function (name) {
      return '現在の入力内容を「' + name + '」テンプレートに置き換えます。よろしいですか？';
    },
    cancel: 'キャンセル',
    confirm: 'OK',
    resetDone: 'リセットしました',
    sampleDone: 'サンプルを入力しました',
    templateDone: function (name) { return '「' + name + '」テンプレートを反映しました'; },
    nothingToShuffle: 'シャッフルする内容がありません',
    shuffled: 'シャッフルしました',
    inputComplete: 'すべて入力できました',
    editStatus: function (filled, total) { return filled + '/' + total + ' 入力済み · 編集モード'; },
    previewStatus: function (filled, total) { return '完成イメージ · ' + filled + '/' + total + ' 入力済み'; },
    playStatus: function (lines, marked, total) {
      return 'ビンゴ ' + lines + '列 · ' + marked + '/' + total + ' マーク済み';
    },
    bingo: function (lines) { return 'ビンゴ！ ' + lines + '列完成'; },
    linkCopied: '共有リンクをコピーしました',
    copyPrompt: 'このURLをコピーしてください',
    sharedLoaded: '共有カードを読み込みました',
    invalidShare: '共有カードを読み込めませんでした',
    imageShared: '画像を共有しました',
    imageSaved: '画像を保存しました',
    exportFailed: '画像を作成できませんでした',
    printReady: function (count) {
      return count === 1 ? '印刷プレビューを開きました' : count + '種類のカードを印刷用に作成しました';
    },
    printCardNumber: function (number, total) { return total > 1 ? total + '枚中 ' + number + '枚目' : ''; },
    previewRegion: '完成したビンゴカードのプレビュー',
    creditDefault: 'セトリビンゴ',
    imageCredit: function (name) { return '作成：' + name + '（無料・登録不要）'; },
    imageBingoBadge: function (lines) { return 'ビンゴ ' + lines + '列達成'; },
    defaultHashtags: 'ビンゴ',
    postText: function (title, lines) {
      if (lines > 0) return '「' + title + '」で' + lines + '列ビンゴ！';
      return '「' + title + '」を作りました';
    },
    xIntentOpened: '画像を保存しました。Xの投稿画面で画像を添付してください',
    sample3: [
      'オープニング曲', '新曲', 'ソロ曲',
      'ユニット曲', 'MC', 'バラード',
      '定番曲', 'カバー曲', 'アンコール'
    ],
    sample5: [
      'オープニング曲', '新曲', 'ソロ曲', 'ユニット曲', 'MC',
      'バラード', '定番曲', 'カバー曲', 'ダンス曲', 'アコースティック',
      'ゲスト登場', '衣装チェンジ', 'サプライズ曲', 'コール＆レスポンス', 'メドレー',
      'レア曲', 'デビュー曲', '最新シングル', 'テーマ曲', '長めのMC',
      '本編ラスト', 'アンコール', 'ダブルアンコール', '撮影タイム', '告知'
    ]
  };

  var bingoTemplates = locale === 'en' ? {
    setlist: {
      name: 'Setlist predictions',
      title: 'Setlist Bingo',
      entries: copy.sample5
    },
    watch_party: {
      name: 'Watch party',
      title: 'Watch Party Bingo',
      entries: [
        'Opening countdown', 'Favorite appears', 'Big announcement', 'Costume change', 'Audience reaction',
        'Unexpected guest', 'Behind-the-scenes clip', 'Technical trouble', 'Live performance', 'Funny comment',
        'Fan question', 'New visual', 'Everyone cheers', 'Throwback moment', 'Emotional speech',
        'Merchandise reveal', 'Camera close-up', 'Running joke', 'Surprise challenge', 'Special effect',
        'Encore request', 'Group photo', 'Next event tease', 'Closing message', 'Bonus scene'
      ]
    },
    party: {
      name: 'Party icebreaker',
      title: 'Party Bingo',
      entries: [
        'Has a pet', 'Loves spicy food', 'Has traveled abroad', 'Can play an instrument', 'Is an early bird',
        'Likes cooking', 'Has the same hobby', 'Wears glasses', 'Prefers tea to coffee', 'Has seen a musical',
        'Speaks two languages', 'Has met a celebrity', 'Likes camping', 'Can whistle loudly', 'Has a hidden talent',
        'Enjoys board games', 'Has run a marathon', 'Likes karaoke', 'Was born in summer', 'Has read 20 books this year',
        'Can bake bread', 'Likes roller coasters', 'Has the same favorite color', 'Collects something', 'Knows a magic trick'
      ]
    },
    learning: {
      name: 'Learning review',
      title: 'Review Bingo',
      entries: [
        'Explain a key term', 'Give one example', 'Solve without notes', 'Ask a question', 'Summarize the lesson',
        'Correct a mistake', 'Teach a partner', 'Draw a diagram', 'Use a new word', 'Compare two ideas',
        'Find supporting evidence', 'Make a prediction', 'Check your answer', 'Share a shortcut', 'Recall yesterday’s topic',
        'Write a definition', 'Name three facts', 'Connect to real life', 'Create a quiz question', 'Spot a pattern',
        'Use the formula', 'Read aloud', 'Complete a challenge', 'Reflect for one minute', 'Set the next goal'
      ]
    },
    christmas: {
      name: 'Christmas',
      title: 'Christmas Bingo',
      entries: [
        'Santa Claus', 'Reindeer', 'Christmas tree', 'Wrapped present', 'Snowman',
        'Stocking', 'Jingle bell', 'Wreath', 'Star topper', 'Candle',
        'Gingerbread cookie', 'Candy cane', 'Hot cocoa', 'Twinkling lights', 'Christmas song',
        'Sleigh', 'Chimney', 'Mittens', 'Scarf', 'Snowflake',
        'Ornament', 'Poinsettia', 'Party cracker', 'Santa hat', 'Holiday card'
      ]
    }
  } : {
    setlist: {
      name: 'セトリ予想',
      title: 'セトリビンゴ',
      entries: copy.sample5
    },
    watch_party: {
      name: '配信・ライブ視聴',
      title: '配信視聴ビンゴ',
      entries: [
        'オープニング映像', '推しが登場', '重大発表', '衣装チェンジ', '客席の歓声',
        'サプライズゲスト', '舞台裏映像', '機材トラブル', '生パフォーマンス', '面白いひと言',
        '視聴者からの質問', '新ビジュアル', '全員で乾杯', '懐かしい話', '感動のスピーチ',
        '新グッズ発表', 'カメラ目線', 'おなじみのネタ', '突然のチャレンジ', '特殊演出',
        'アンコール', '集合写真', '次回予告', '締めのあいさつ', 'おまけ映像'
      ]
    },
    party: {
      name: 'パーティー交流',
      title: '交流ビンゴ',
      entries: [
        'ペットを飼っている', '辛いものが好き', '海外旅行の経験あり', '楽器を演奏できる', '朝型である',
        '料理が好き', '同じ趣味がある', 'メガネをかけている', 'コーヒーより紅茶派', 'ミュージカルを見たことがある',
        '2か国語を話せる', '有名人に会ったことがある', 'キャンプが好き', '大きな口笛ができる', '意外な特技がある',
        'ボードゲームが好き', 'マラソン経験あり', 'カラオケが好き', '夏生まれ', '今年20冊以上読んだ',
        'パンを焼ける', '絶叫マシンが好き', '好きな色が同じ', '何かを集めている', '手品ができる'
      ]
    },
    learning: {
      name: '学習・復習',
      title: '復習ビンゴ',
      entries: [
        '重要語句を説明', '具体例を1つ挙げる', 'ノートなしで解く', '質問を1つする', '授業を要約する',
        '間違いを直す', '相手に教える', '図にまとめる', '新しい言葉を使う', '2つの考えを比べる',
        '根拠を見つける', '結果を予想する', '答えを見直す', '解き方のコツを共有', '前回の内容を思い出す',
        '定義を書く', '事実を3つ挙げる', '生活と結びつける', 'クイズを1問作る', '規則性を見つける',
        '公式を使う', '声に出して読む', '応用問題に挑戦', '1分で振り返る', '次の目標を決める'
      ]
    },
    bonenkai: {
      name: '忘年会',
      title: '忘年会ビンゴ',
      entries: [
        '今年うれしかったこと', '今年始めたこと', '今年行った旅行先', '今年ハマった食べ物', '今年よく聴いた曲',
        '買ってよかった物', '今年のちょっとした失敗', 'お世話になった人に感謝', '他部署の人と話す', '同じ誕生月の人',
        '同じ出身地の人', '最近見た映画・ドラマ', '今年の目標を達成した人', '来年挑戦したいこと', 'おすすめのお店',
        '休日の過ごし方', '年末年始の予定', '今年を漢字1文字で', '意外な特技', '初対面の人と自己紹介',
        '同じ趣味の人', '幹事にひと言お礼', '全員で集合写真', '来年の抱負を宣言', '今年のベストショット'
      ]
    },
    christmas: {
      name: 'クリスマス',
      title: 'クリスマスビンゴ',
      entries: [
        'サンタクロース', 'トナカイ', 'クリスマスツリー', 'プレゼント', '雪だるま',
        'くつした', 'ベル', 'リース', 'ツリーの星', 'キャンドル',
        'ジンジャークッキー', 'キャンディケイン', 'クリスマスケーキ', 'イルミネーション', 'クリスマスソング',
        'そり', 'えんとつ', 'てぶくろ', 'マフラー', '雪の結晶',
        'オーナメント', 'ポインセチア', 'クラッカー', 'サンタの帽子', 'メッセージカード'
      ]
    },
    goals: {
      name: '目標・やりたいこと',
      title: '2027年やりたいことビンゴ',
      entries: [
        '新しい趣味を始める', '本を12冊読む', '行ったことのない県へ', '朝活を1か月続ける', '資格の勉強を始める',
        'ライブ・フェスに行く', '部屋を大掃除する', '新しい料理に挑戦', '家族に手紙を書く', '映画を20本見る',
        '貯金の目標を達成', 'スマホ時間を減らす', '運動習慣をつける', '友達と旅行する', '美術館・博物館へ行く',
        '新しいお店を開拓', '温泉でのんびり', '推しに会いに行く', '日記を続ける', '写真を整理する',
        '早寝早起きを続ける', '1日デジタルデトックス', '誰かに感謝を伝える', '新しい場所で初日の出', '大きな夢を1つ叶える'
      ]
    },
    live_tv: {
      name: '年末年始の実況',
      title: '年末特番ビンゴ',
      entries: [
        'オープニングで全員集合', '司会がかむ', 'サプライズ登場', '涙のパフォーマンス', '会場が総立ち',
        '懐かしの名曲', '久しぶりの共演', '衣装チェンジ', '中継がつながる', 'トレンド入り',
        '特別メドレー', '初登場で緊張', 'ダンスがそろう', '結果発表', '思わぬハプニング',
        '時間が押す', '名場面の振り返り', '推しが映る', '家族でツッコむ', 'もう一回見たい瞬間',
        'カウントダウン', '新年のあいさつ', '来年の抱負', 'エンディングで全員', 'また来年！'
      ]
    }
  };

  var BOARD_SIZES = [3, 5];
  var MAX_CELL_LENGTH = 40;
  var MAX_TITLE_LENGTH = 60;
  // Seasonal landing pages keep their own board so a saved card from another page does not replace their template.
  var pageTemplateId = bingoTemplates[document.body.dataset.bingoTemplate] ? document.body.dataset.bingoTemplate : '';
  var STORAGE_KEY = 'bingo.saved.v1' + (pageTemplateId ? '.' + pageTemplateId : '');
  var VALID_FONTS = ['system', 'gothic', 'marker', 'impact'];
  var MAX_AUTHOR_LENGTH = 30;
  var IMAGE_RATIOS = {
    square: { width: 2048, height: 2048 },
    portrait: { width: 1640, height: 2050 },
    story: { width: 1440, height: 2560 }
  };
  var IMAGE_THEMES = {
    simple: {
      background: ['#ffffff', '#f3f4f6'],
      panel: '#ffffff',
      grid: '#222222',
      cellText: '#111111',
      title: '#111111',
      meta: '#4b5563',
      mark: '#ff3b3b',
      shadow: 'rgba(0, 0, 0, 0.08)',
      decoration: null
    },
    pop: {
      background: ['#ffe36e', '#ff8fb1'],
      panel: '#fffdf7',
      grid: '#2b2118',
      cellText: '#1f1a17',
      title: '#2b2118',
      meta: '#5b3a2c',
      mark: '#ff2f6d',
      shadow: 'rgba(91, 30, 50, 0.22)',
      decoration: ['#ffffff', '#ff5c8a', '#4dd2ff']
    },
    night: {
      background: ['#101735', '#3b2a78'],
      panel: '#f8f9ff',
      grid: '#1d2347',
      cellText: '#141831',
      title: '#ffffff',
      meta: '#c9cdf5',
      mark: '#ff4f7b',
      shadow: 'rgba(0, 0, 0, 0.45)',
      decoration: ['#ffffff', '#ffe58a', '#9fb3ff']
    },
    newyear: {
      background: ['#c8102e', '#7a0b1d'],
      panel: '#fffaf0',
      grid: '#6b0f1a',
      cellText: '#2a1410',
      title: '#ffe7a3',
      meta: '#ffd9a0',
      mark: '#d4141f',
      shadow: 'rgba(40, 0, 0, 0.4)',
      decoration: ['#ffd76a', '#fff3c4']
    },
    christmas: {
      background: ['#0f5132', '#073b26'],
      panel: '#fffdf7',
      grid: '#0f3d2a',
      cellText: '#132a1f',
      title: '#ffffff',
      meta: '#d6f5e3',
      mark: '#e11d2e',
      shadow: 'rgba(0, 0, 0, 0.4)',
      decoration: ['#ffffff', '#ffd76a', '#ff6b6b']
    }
  };
  var defaultImageTheme = IMAGE_THEMES[document.body.dataset.bingoTheme] ? document.body.dataset.bingoTheme : 'pop';
  var LEGACY_FONT_MAP = {
    pop: 'marker',
    maru: 'gothic',
    zen: 'marker',
    hachi: 'marker'
  };

  var fontMap = {
    system: {
      primary: 'system-ui',
      fallback: 'system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans JP", sans-serif',
      weight: 600,
      cssFamily: null
    },
    gothic: {
      primary: 'IBM Plex Sans JP',
      fallback: '"IBM Plex Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
      weight: 500,
      cssFamily: 'IBM+Plex+Sans+JP:wght@500'
    },
    marker: {
      primary: 'Yusei Magic',
      fallback: '"Yusei Magic", "Hiragino Sans", "Yu Gothic", sans-serif',
      weight: 400,
      cssFamily: 'Yusei+Magic'
    },
    impact: {
      primary: 'Dela Gothic One',
      fallback: '"Dela Gothic One", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif',
      weight: 400,
      cssFamily: 'Dela+Gothic+One'
    }
  };

  var promotionPools = locale === 'en' ? {
    mobile: [
      {
        id: 'sanin_event_map',
        category: 'Event guide',
        title: "Find live events in San'in",
        description: 'Explore concerts and events across Tottori and Shimane on a map.',
        cta: "Open San'in Event Map ↗",
        href: 'https://sanin-map.com/',
        external: true
      },
      {
        id: 'hitokoma',
        category: 'iPhone & iPad app',
        title: 'Enjoy photos by choosing the people in them',
        description: 'Hitokoma creates private, face-aware photo slideshows on your device.',
        cta: 'See Hitokoma →',
        href: '../apps/hitokoma/'
      },
      {
        id: 'iebaku',
        category: 'Mobile game',
        title: 'Smash a whole house in 30 seconds',
        description: 'Tap, upgrade your shots, and chase the rankings in House Breaker!!',
        cta: 'See House Breaker!! →',
        href: '../apps/iebaku/'
      },
      {
        id: 'sushibaku',
        category: 'Mobile game',
        title: 'Launch sushi and wreck the town',
        description: 'Unlock 36 kinds of sushi in the free action game SushiBomb.',
        cta: 'See SushiBomb →',
        href: '../apps/sushibaku/'
      },
      {
        id: 'ai_girl',
        category: 'Mobile game',
        title: 'Find your favorite character in 10 choices',
        description: 'AI Girl 1/149 matches you with one character from a cast of 149.',
        cta: 'See AI Girl 1/149 →',
        href: '../apps/ai-girl/'
      },
      {
        id: 'loridama',
        category: 'Mobile game',
        title: 'Roll through the city with one-tap controls',
        description: 'Dodge obstacles and collect items in the casual action game RollingGirlz.',
        cta: 'See RollingGirlz →',
        href: '../apps/loridama/'
      }
    ],
    desktop: [
      {
        id: 'sanin_event_map',
        category: 'Event guide',
        title: "Find live events in San'in",
        description: 'Explore concerts and events across Tottori and Shimane on a map.',
        cta: "Open San'in Event Map ↗",
        href: 'https://sanin-map.com/',
        external: true
      },
      {
        id: 'x_search',
        category: 'Browser tool',
        title: 'Build advanced searches for X',
        description: 'Combine filters and create an X search query without memorizing commands.',
        cta: 'Open X Search Builder →',
        href: 'x-search.html'
      },
      {
        id: 'popong',
        category: 'Browser game',
        title: 'Play the free PONG game POPONG',
        description: 'Choose a difficulty and race the computer to five points—no sign-up needed.',
        cta: 'Play now →',
        href: 'pong/'
      }
    ]
  } : {
    mobile: [
      {
        id: 'sanin_event_map',
        category: 'イベント情報',
        title: '山陰のライブ・イベントを探す',
        description: '鳥取・島根のライブやイベントを地図から探せます。',
        cta: '山陰イベントマップを見る ↗',
        href: 'https://sanin-map.com/',
        external: true
      },
      {
        id: 'hitokoma',
        category: 'iPhone・iPadアプリ',
        title: '写真を「人」で選んで楽しむヒトコマ',
        description: '顔認識を端末内で行い、大切な人の写真だけをスライドショーにできます。',
        cta: 'ヒトコマを見る →',
        href: '../apps/hitokoma/'
      },
      {
        id: 'iebaku',
        category: 'スマホゲーム',
        title: '30秒で家ごと壊す「いえばく!」',
        description: '家具や家電をタップで壊し、ショットを強化してランキングに挑戦できます。',
        cta: 'いえばく!を見る →',
        href: '../apps/iebaku/'
      },
      {
        id: 'sushibaku',
        category: 'スマホゲーム',
        title: '寿司で街を壊す「すしばく!」',
        description: '36種類の寿司を飛ばして建物を壊す、無料の爽快アクションゲームです。',
        cta: 'すしばく!を見る →',
        href: '../apps/sushibaku/'
      },
      {
        id: 'ai_girl',
        category: 'スマホゲーム',
        title: '10回の選択で好みを診断「AI美少女1/149」',
        description: '149人のキャラクターから好みのひとりを見つけ、図鑑に集められます。',
        cta: 'AI美少女1/149を見る →',
        href: '../apps/ai-girl/'
      },
      {
        id: 'loridama',
        category: 'スマホゲーム',
        title: '女の子を転がす「ろりだま」',
        description: '左右タップで障害物をよけ、アイテムを集めてゴールを目指します。',
        cta: 'ろりだまを見る →',
        href: '../apps/loridama/'
      }
    ],
    desktop: [
      {
        id: 'sanin_event_map',
        category: 'イベント情報',
        title: '山陰のライブ・イベントを探す',
        description: '鳥取・島根のライブやイベントを地図から探せます。',
        cta: '山陰イベントマップを見る ↗',
        href: 'https://sanin-map.com/',
        external: true
      },
      {
        id: 'x_search',
        category: 'ブラウザツール',
        title: 'Xの高度な検索をかんたんに作る',
        description: '検索コマンドを覚えなくても、条件を組み合わせて検索URLを作成できます。',
        cta: 'X検索ビルダーを開く →',
        href: 'x-search.html'
      },
      {
        id: 'popong',
        category: 'ブラウザゲーム',
        title: '無料PONGゲーム「POPONG」',
        description: '難易度を選び、登録なしですぐにCPUとの7点先取ゲームを遊べます。',
        cta: '今すぐ遊ぶ →',
        href: 'pong/'
      }
    ]
  };

  function $(selector) {
    return document.querySelector(selector);
  }

  var boardEl = $('#board');
  var boardFrame = $('#boardFrame');
  var previewTitle = $('#previewTitle');
  var statusEl = $('#status');
  var titleInput = $('#title');
  var sizeSelect = $('#sizeSelect');
  var fontSelect = $('#fontSelect');
  var templateSelect = $('#templateSelect');
  var freeCenterInput = $('#freeCenter');
  var printCountSelect = $('#printCount');
  var imageRatioSelect = $('#imageRatio');
  var imageThemeSelect = $('#imageTheme');
  var imageAuthorInput = $('#imageAuthor');
  var imageDateInput = $('#imageDate');
  var printSheets = $('#printSheets');
  var toast = $('#toast');
  var offscreenCanvas = $('#off');
  var firstInputTracked = false;
  var saveTimer = null;
  var alignmentFrame = null;
  var fontLoadTimer = null;
  var fontStylesheetPromises = {};

  function createMatrix(size, value) {
    return Array.from({ length: size }, function () {
      return Array(size).fill(value);
    });
  }

  function createInitialState() {
    return {
      id: null,
      size: 3,
      cells: createMatrix(3, ''),
      marked: createMatrix(3, false),
      title: copy.defaultTitle,
      font: 'marker',
      freeCenter: false,
      imageRatio: 'square',
      imageTheme: defaultImageTheme,
      imageAuthor: '',
      imageDate: false,
      version: 2,
      mode: 'edit'
    };
  }

  var state = createInitialState();

  function normalizeFont(value) {
    var migrated = LEGACY_FONT_MAP[value] || value;
    return VALID_FONTS.includes(migrated) ? migrated : 'marker';
  }

  function getFontLoadText() {
    var values = [state.title || copy.defaultTitle];
    state.cells.forEach(function (row) {
      row.forEach(function (cell) {
        if (cell.trim()) values.push(cell);
      });
    });
    if (state.freeCenter) values.push(copy.free);
    return values.join(' ');
  }

  function ensureFontStylesheet(fontConfig) {
    if (!fontConfig.cssFamily) return Promise.resolve();
    if (fontStylesheetPromises[fontConfig.primary]) {
      return fontStylesheetPromises[fontConfig.primary];
    }

    fontStylesheetPromises[fontConfig.primary] = new Promise(function (resolve, reject) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=' + fontConfig.cssFamily + '&display=swap';
      link.dataset.bingoFont = fontConfig.primary;
      link.addEventListener('load', resolve, { once: true });
      link.addEventListener('error', function () {
        link.remove();
        delete fontStylesheetPromises[fontConfig.primary];
        reject(new Error('Font stylesheet failed to load'));
      }, { once: true });
      document.head.appendChild(link);
    });

    return fontStylesheetPromises[fontConfig.primary];
  }

  function loadSelectedFont(fontConfig) {
    if (!fontConfig.cssFamily) return Promise.resolve();

    var loading = ensureFontStylesheet(fontConfig).then(function () {
      return document.fonts.load(
        fontConfig.weight + ' 80px "' + fontConfig.primary + '"',
        getFontLoadText()
      );
    });
    var timeout = new Promise(function (resolve) {
      window.setTimeout(resolve, 4000);
    });
    return Promise.race([loading, timeout]);
  }

  function scheduleSelectedFontLoad() {
    window.clearTimeout(fontLoadTimer);
    fontLoadTimer = window.setTimeout(function () {
      loadSelectedFont(fontMap[state.font] || fontMap.marker).catch(function () {
        // Keep the preview usable with its fallback font when the network is unavailable.
      });
    }, 180);
  }

  function trackEvent(name, parameters) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, parameters || {});
  }

  function randomInteger(maximum) {
    if (maximum <= 1) return 0;
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      var randomValues = new Uint32Array(1);
      window.crypto.getRandomValues(randomValues);
      return Math.floor((randomValues[0] / 4294967296) * maximum);
    }
    return Math.floor(Math.random() * maximum);
  }

  function shuffledCopy(values) {
    var shuffled = values.slice();
    for (var index = shuffled.length - 1; index > 0; index -= 1) {
      var randomIndex = randomInteger(index + 1);
      var temporary = shuffled[index];
      shuffled[index] = shuffled[randomIndex];
      shuffled[randomIndex] = temporary;
    }
    return shuffled;
  }

  function getPromotionAudience() {
    if (navigator.userAgentData && navigator.userAgentData.mobile === true) return 'mobile';
    if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)) return 'mobile';
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'mobile';
    return 'desktop';
  }

  function getRandomPromotion(pool, audience) {
    var storageKey = 'bingo.promotion.last.v1.' + locale + '.' + audience;
    var previousId = null;
    try {
      previousId = window.sessionStorage.getItem(storageKey);
    } catch (error) {
      // Random selection remains available when browser storage is unavailable.
    }

    var candidates = pool.filter(function (promotion) {
      return promotion.id !== previousId;
    });
    if (!candidates.length) candidates = pool;

    var randomValue = Math.random();
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      var randomValues = new Uint32Array(1);
      window.crypto.getRandomValues(randomValues);
      randomValue = randomValues[0] / 4294967296;
    }
    var selected = candidates[Math.floor(randomValue * candidates.length)];

    try {
      window.sessionStorage.setItem(storageKey, selected.id);
    } catch (error) {
      // Do not block the recommendation when browser storage is unavailable.
    }
    return selected;
  }

  function renderRelatedPromotion() {
    var relatedService = $('#relatedService');
    var relatedExternal = $('#relatedExternal');
    if (!relatedService || !relatedExternal) return;

    var audience = getPromotionAudience();
    if (relatedService.dataset.audience === audience) return;

    var promotion = getRandomPromotion(promotionPools[audience], audience);
    $('#relatedServiceCategory').textContent = promotion.category;
    $('#related-service-title').textContent = promotion.title;
    $('#relatedServiceDescription').textContent = promotion.description;
    relatedExternal.textContent = promotion.cta;
    relatedExternal.setAttribute('href', promotion.href);
    relatedExternal.dataset.destination = promotion.id;
    relatedService.dataset.audience = audience;
    relatedService.dataset.promotion = promotion.id;

    if (promotion.external) {
      relatedExternal.setAttribute('target', '_blank');
      relatedExternal.setAttribute('rel', 'noopener');
    } else {
      relatedExternal.removeAttribute('target');
      relatedExternal.removeAttribute('rel');
    }
  }

  function setupRelatedAppTracking() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-related-app]'));
    if (!cards.length) return;

    var recordedImpressions = {};

    function eventParameters(card) {
      return {
        app_name: card.dataset.relatedApp || 'unknown',
        placement: card.dataset.relatedAppPlacement || 'bingo_related_apps',
        audience: getPromotionAudience()
      };
    }

    function recordImpression(card) {
      var appName = card.dataset.relatedApp || 'unknown';
      if (recordedImpressions[appName]) return;
      recordedImpressions[appName] = true;
      trackEvent('bingo_related_app_impression', eventParameters(card));
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        trackEvent('bingo_related_app_clicked', eventParameters(card));
      });
    });

    if (!('IntersectionObserver' in window)) {
      cards.forEach(recordImpression);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.45) return;
        recordImpression(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: [0.45] });

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(function () {
      toast.classList.remove('show');
    }, 2000);
  }

  function showConfirm(title, message) {
    return new Promise(function (resolve) {
      var modal = $('#confirmModal');
      var modalTitle = $('#modalTitle');
      var modalMessage = $('#modalMessage');
      var confirmButton = $('#modalConfirm');
      var cancelButton = $('#modalCancel');
      var previousFocus = document.activeElement;

      modalTitle.textContent = title;
      modalMessage.textContent = message;
      cancelButton.textContent = copy.cancel;
      confirmButton.textContent = copy.confirm;
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('show');
      cancelButton.focus();

      function cleanup(result) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        confirmButton.removeEventListener('click', onConfirm);
        cancelButton.removeEventListener('click', onCancel);
        modal.removeEventListener('click', onOverlayClick);
        document.removeEventListener('keydown', onKeyDown);
        if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
        resolve(result);
      }

      function onConfirm() { cleanup(true); }
      function onCancel() { cleanup(false); }
      function onOverlayClick(event) {
        if (event.target === modal) cleanup(false);
      }
      function onKeyDown(event) {
        if (event.key === 'Escape') {
          event.preventDefault();
          cleanup(false);
          return;
        }
        if (event.key !== 'Tab') return;
        if (event.shiftKey && document.activeElement === cancelButton) {
          event.preventDefault();
          confirmButton.focus();
        } else if (!event.shiftKey && document.activeElement === confirmButton) {
          event.preventDefault();
          cancelButton.focus();
        }
      }

      confirmButton.addEventListener('click', onConfirm);
      cancelButton.addEventListener('click', onCancel);
      modal.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onKeyDown);
    });
  }

  var base64Url = {
    encode: function (value) {
      var bytes = new TextEncoder().encode(value);
      var binary = '';
      bytes.forEach(function (byte) { binary += String.fromCharCode(byte); });
      return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
    },
    decode: function (value) {
      var normalized = value.replaceAll('-', '+').replaceAll('_', '/');
      var padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
      var binary = atob(normalized + padding);
      var bytes = new Uint8Array(binary.length);
      for (var index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
      }
      return new TextDecoder().decode(bytes);
    }
  };

  function normalizeState(value) {
    if (!value || typeof value !== 'object') return null;

    var inferredSize = Array.isArray(value.cells) ? value.cells.length : 3;
    var size = BOARD_SIZES.includes(Number(value.size)) ? Number(value.size) : inferredSize;
    if (!BOARD_SIZES.includes(size)) size = 3;

    var cells = createMatrix(size, '');
    var marked = createMatrix(size, false);

    for (var row = 0; row < size; row += 1) {
      for (var column = 0; column < size; column += 1) {
        if (Array.isArray(value.cells) && Array.isArray(value.cells[row])) {
          var cellValue = value.cells[row][column];
          if (typeof cellValue === 'string') cells[row][column] = cellValue.slice(0, MAX_CELL_LENGTH);
        }
        if (Array.isArray(value.marked) && Array.isArray(value.marked[row])) {
          marked[row][column] = value.marked[row][column] === true;
        }
      }
    }

    return {
      id: typeof value.id === 'string' ? value.id.slice(0, 100) : null,
      size: size,
      cells: cells,
      marked: marked,
      title: typeof value.title === 'string' && value.title.trim()
        ? value.title.slice(0, MAX_TITLE_LENGTH)
        : copy.defaultTitle,
      font: normalizeFont(value.font),
      freeCenter: value.freeCenter === true,
      imageRatio: IMAGE_RATIOS[value.imageRatio] ? value.imageRatio : 'square',
      imageTheme: IMAGE_THEMES[value.imageTheme] ? value.imageTheme : defaultImageTheme,
      imageAuthor: typeof value.imageAuthor === 'string' ? value.imageAuthor.slice(0, MAX_AUTHOR_LENGTH) : '',
      imageDate: value.imageDate === true,
      version: 2,
      mode: 'edit'
    };
  }

  function loadFrom(value) {
    var normalized = normalizeState(value);
    if (!normalized) return false;
    state = normalized;
    titleInput.value = state.title;
    sizeSelect.value = String(state.size);
    fontSelect.value = state.font;
    freeCenterInput.checked = state.freeCenter;
    syncImageInputs();
    $('#edit').checked = true;
    $('#preview').checked = false;
    $('#play').checked = false;
    render();
    return true;
  }

  function serialize() {
    if (!state.id) {
      state.id = typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : String(Date.now()) + '-' + Math.random().toString(16).slice(2);
    }
    return JSON.stringify({
      id: state.id,
      size: state.size,
      cells: state.cells,
      marked: state.marked,
      title: state.title,
      font: state.font,
      freeCenter: state.freeCenter,
      imageRatio: state.imageRatio,
      imageTheme: state.imageTheme,
      imageAuthor: state.imageAuthor,
      imageDate: state.imageDate,
      version: state.version
    });
  }

  function saveLocal() {
    scheduleImagePreview();
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(function () {
      try {
        window.localStorage.setItem(STORAGE_KEY, serialize());
      } catch (error) {
        // The tool remains usable when browser storage is unavailable.
      }
    }, 250);
  }

  function loadLocal() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? loadFrom(JSON.parse(saved)) : false;
    } catch (error) {
      // Ignore invalid or unavailable local storage.
      return false;
    }
  }

  function centerIndex() {
    return Math.floor(state.size / 2);
  }

  function isFreeCell(row, column) {
    var center = centerIndex();
    return state.freeCenter && row === center && column === center;
  }

  function isEffectivelyMarked(row, column) {
    return isFreeCell(row, column) || state.marked[row][column];
  }

  function countCompletedLines() {
    var size = state.size;
    var completed = 0;

    for (var row = 0; row < size; row += 1) {
      var rowComplete = true;
      var columnComplete = true;
      for (var column = 0; column < size; column += 1) {
        rowComplete = rowComplete && isEffectivelyMarked(row, column);
        columnComplete = columnComplete && isEffectivelyMarked(column, row);
      }
      if (rowComplete) completed += 1;
      if (columnComplete) completed += 1;
    }

    var diagonalDown = true;
    var diagonalUp = true;
    for (var index = 0; index < size; index += 1) {
      diagonalDown = diagonalDown && isEffectivelyMarked(index, index);
      diagonalUp = diagonalUp && isEffectivelyMarked(index, size - index - 1);
    }
    if (diagonalDown) completed += 1;
    if (diagonalUp) completed += 1;

    return completed;
  }

  function updateStatus() {
    var filled = 0;
    var marked = 0;
    var total = state.size * state.size;

    for (var row = 0; row < state.size; row += 1) {
      for (var column = 0; column < state.size; column += 1) {
        if (isFreeCell(row, column) || state.cells[row][column].trim()) filled += 1;
        if (isEffectivelyMarked(row, column)) marked += 1;
      }
    }

    if (state.mode === 'edit') {
      statusEl.textContent = copy.editStatus(filled, total);
      statusEl.classList.remove('has-bingo');
      return;
    }

    if (state.mode === 'preview') {
      statusEl.textContent = copy.previewStatus(filled, total);
      statusEl.classList.remove('has-bingo');
      return;
    }

    var lines = countCompletedLines();
    statusEl.textContent = copy.playStatus(lines, marked, total);
    statusEl.classList.toggle('has-bingo', lines > 0);
  }

  function focusNextCell(currentIndex) {
    var inputs = Array.from(boardEl.querySelectorAll('textarea:not(:disabled)'));
    var current = inputs.indexOf(currentIndex);
    if (current >= 0 && current < inputs.length - 1) {
      inputs[current + 1].focus();
    } else {
      currentIndex.blur();
      showToast(copy.inputComplete);
    }
  }

  function focusFirstEmptyCell() {
    if (state.mode !== 'edit') return;
    var inputs = boardEl.querySelectorAll('textarea');
    for (var index = 0; index < inputs.length; index += 1) {
      if (!inputs[index].disabled && !inputs[index].value.trim()) {
        inputs[index].focus();
        return;
      }
    }
    var firstEnabled = boardEl.querySelector('textarea:not(:disabled)');
    if (firstEnabled) firstEnabled.focus();
  }

  function alignTextarea(input) {
    var mirror = input.parentElement.querySelector('.cell-input-mirror');
    if (!mirror || !input.clientHeight) return;

    mirror.textContent = input.value || '\u200b';
    var contentHeight = mirror.getBoundingClientRect().height;
    var minimumPadding = state.size === 5 ? 4 : 7;
    var centeredPadding = Math.max(minimumPadding, (input.clientHeight - contentHeight) / 2);
    input.style.paddingTop = centeredPadding + 'px';
    input.style.paddingBottom = centeredPadding + 'px';
    input.scrollTop = 0;
  }

  function alignAllTextareas() {
    boardEl.querySelectorAll('textarea').forEach(alignTextarea);
  }

  function scheduleTextareaAlignment() {
    if (alignmentFrame !== null) window.cancelAnimationFrame(alignmentFrame);
    alignmentFrame = window.requestAnimationFrame(function () {
      alignmentFrame = null;
      alignAllTextareas();
    });
  }

  function toggleMark(row, column) {
    if (isFreeCell(row, column)) return;
    var before = countCompletedLines();
    state.marked[row][column] = !state.marked[row][column];
    var after = countCompletedLines();
    saveLocal();
    render();
    var refreshedCell = boardEl.querySelector(
      '.cell[data-row="' + row + '"][data-column="' + column + '"]'
    );
    if (refreshedCell) refreshedCell.focus();
    if (after > before) {
      showToast(copy.bingo(after));
      trackEvent('bingo_line_completed', { board_size: state.size, completed_lines: after });
    }
  }

  function render() {
    var size = state.size;
    var previewing = state.mode === 'preview';
    var fontConfig = fontMap[state.font] || fontMap.marker;
    boardFrame.classList.toggle('is-preview', previewing);
    boardFrame.style.fontFamily = previewing ? fontConfig.fallback : '';
    boardFrame.style.setProperty('--preview-font-weight', fontConfig.weight);
    previewTitle.textContent = state.title || copy.defaultTitle;
    previewTitle.setAttribute('aria-hidden', previewing ? 'false' : 'true');
    if (previewing) {
      boardFrame.setAttribute('role', 'img');
      boardFrame.setAttribute('aria-label', copy.previewRegion + ': ' + previewTitle.textContent);
    } else {
      boardFrame.removeAttribute('role');
      boardFrame.removeAttribute('aria-label');
    }
    boardFrame.dataset.size = String(size);
    boardEl.style.setProperty('--board-size', size);
    boardEl.dataset.size = String(size);
    boardEl.innerHTML = '';

    for (var row = 0; row < size; row += 1) {
      for (var column = 0; column < size; column += 1) {
        (function (cellRow, cellColumn) {
          var free = isFreeCell(cellRow, cellColumn);
          var cellValue = state.cells[cellRow][cellColumn] || '';
          var filled = free || cellValue.trim() !== '';
          var marked = isEffectivelyMarked(cellRow, cellColumn);
          var cell = document.createElement('div');
          cell.className = 'cell' + (filled ? ' filled' : '') + (marked ? ' marked' : '') + (free ? ' free-cell' : '');
          cell.dataset.row = String(cellRow);
          cell.dataset.column = String(cellColumn);

          if (state.mode === 'play' && !free) {
            cell.setAttribute('role', 'button');
            cell.setAttribute('tabindex', '0');
            cell.setAttribute('aria-pressed', state.marked[cellRow][cellColumn] ? 'true' : 'false');
            cell.setAttribute('aria-label', copy.cellLabel(cellRow + 1, cellColumn + 1));
          }

          var input = null;
          if (previewing) {
            var previewLabel = document.createElement('span');
            previewLabel.className = 'preview-cell-label';
            previewLabel.textContent = free ? copy.free : cellValue;
            cell.appendChild(previewLabel);
          } else {
            input = document.createElement('textarea');
            input.value = free ? copy.free : cellValue;
            input.maxLength = MAX_CELL_LENGTH;
            input.rows = 1;
            input.disabled = state.mode === 'play' || free;
            input.setAttribute('aria-label', free ? copy.freeCellLabel : copy.cellLabel(cellRow + 1, cellColumn + 1));
            if (state.mode === 'play') {
              input.setAttribute('aria-hidden', 'true');
              input.tabIndex = -1;
            }

            var composing = false;
            input.addEventListener('compositionstart', function () { composing = true; });
            input.addEventListener('compositionend', function () { composing = false; });
            input.addEventListener('input', function (event) {
              state.cells[cellRow][cellColumn] = event.target.value;
              cell.classList.toggle('filled', event.target.value.trim() !== '');
              if (!firstInputTracked && event.target.value.trim()) {
                firstInputTracked = true;
                trackEvent('bingo_first_input', { board_size: state.size });
              }
              saveLocal();
              updateStatus();
              scheduleTextareaAlignment();
            });
            input.addEventListener('keydown', function (event) {
              if (event.key === 'Enter' && !composing) {
                event.preventDefault();
                focusNextCell(input);
              }
            });
            input.addEventListener('focus', function () { cell.classList.add('focused'); });
            input.addEventListener('blur', function () { cell.classList.remove('focused'); });
            cell.appendChild(input);

            var inputMirror = document.createElement('span');
            inputMirror.className = 'cell-input-mirror';
            inputMirror.setAttribute('aria-hidden', 'true');
            cell.appendChild(inputMirror);
          }

          var mark = document.createElement('span');
          mark.className = 'mark';
          mark.setAttribute('aria-hidden', 'true');
          cell.appendChild(mark);

          cell.addEventListener('click', function () {
            if (state.mode === 'edit') {
              if (!free) input.focus();
            } else if (state.mode === 'play') {
              toggleMark(cellRow, cellColumn);
            }
          });
          cell.addEventListener('keydown', function (event) {
            if (state.mode === 'play' && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              toggleMark(cellRow, cellColumn);
            }
          });

          boardEl.appendChild(cell);
        })(row, column);
      }
    }

    updateStatus();
    scheduleTextareaAlignment();
  }

  function setMode(mode) {
    state.mode = mode;
    render();
    saveLocal();
    if (mode === 'edit') {
      window.setTimeout(focusFirstEmptyCell, 80);
    } else if (mode === 'preview') {
      loadSelectedFont(fontMap[state.font] || fontMap.marker).catch(function () {
        // Keep the preview usable with its fallback font when the network is unavailable.
      });
      trackEvent('bingo_preview_opened', { board_size: state.size, font: state.font });
    } else {
      trackEvent('bingo_play_mode', { board_size: state.size, free_center: state.freeCenter });
      var firstPlayableCell = boardEl.querySelector('.cell[role="button"]');
      if (firstPlayableCell) firstPlayableCell.focus();
    }
  }

  function resizeMatrix(matrix, newSize, fallback) {
    var resized = createMatrix(newSize, fallback);
    var copySize = Math.min(matrix.length, newSize);
    for (var row = 0; row < copySize; row += 1) {
      for (var column = 0; column < copySize; column += 1) {
        resized[row][column] = matrix[row][column];
      }
    }
    return resized;
  }

  function setBoardSize(newSize) {
    if (!BOARD_SIZES.includes(newSize) || newSize === state.size) return;
    state.cells = resizeMatrix(state.cells, newSize, '');
    state.marked = resizeMatrix(state.marked, newSize, false);
    state.size = newSize;
    state.id = null;
    render();
    saveLocal();
    trackEvent('bingo_board_size_changed', { board_size: state.size });
  }

  async function resetBoard() {
    var confirmed = await showConfirm(copy.resetTitle, copy.resetMessage);
    if (!confirmed) return;
    state.cells = createMatrix(state.size, '');
    state.marked = createMatrix(state.size, false);
    state.title = copy.defaultTitle;
    state.id = null;
    titleInput.value = state.title;
    render();
    saveLocal();
    showToast(copy.resetDone);
    trackEvent('bingo_reset', { board_size: state.size });
  }

  function fillTemplate(template) {
    state.cells = createMatrix(state.size, '');
    template.entries.slice(0, state.size * state.size).forEach(function (value, index) {
      var row = Math.floor(index / state.size);
      var column = index % state.size;
      state.cells[row][column] = value;
    });
    state.marked = createMatrix(state.size, false);
    state.title = template.title;
    state.id = null;
    titleInput.value = state.title;
  }

  function applyPageTemplate() {
    var size = Number(document.body.dataset.bingoSize);
    if (BOARD_SIZES.includes(size)) {
      state.size = size;
      sizeSelect.value = String(size);
    }
    if (document.body.dataset.bingoFree === 'true') {
      state.freeCenter = true;
      freeCenterInput.checked = true;
    }
    fillTemplate(bingoTemplates[pageTemplateId]);
  }

  async function applyTemplate(templateId) {
    var template = bingoTemplates[templateId] || bingoTemplates.setlist;
    var hasContent = state.cells.some(function (row) {
      return row.some(function (cell) { return cell.trim() !== ''; });
    });
    if (hasContent) {
      var confirmed = await showConfirm(
        copy.templateTitleDialog,
        copy.templateMessage(template.name)
      );
      if (!confirmed) return;
    }

    fillTemplate(template);
    render();
    saveLocal();
    showToast(copy.templateDone(template.name));
    trackEvent('bingo_template_applied', {
      template_id: templateId,
      board_size: state.size
    });
  }

  function shuffleCells() {
    var positions = [];
    var values = [];

    for (var row = 0; row < state.size; row += 1) {
      for (var column = 0; column < state.size; column += 1) {
        if (!isFreeCell(row, column) && state.cells[row][column].trim()) {
          positions.push([row, column]);
          values.push(state.cells[row][column]);
        }
      }
    }

    if (!values.length) {
      showToast(copy.nothingToShuffle);
      return;
    }

    values = shuffledCopy(values);

    positions.forEach(function (position, index) {
      state.cells[position[0]][position[1]] = values[index];
    });
    state.marked = createMatrix(state.size, false);
    state.id = null;
    render();
    saveLocal();
    showToast(copy.shuffled);
    trackEvent('bingo_shuffled', { board_size: state.size });
  }

  function getCellLabel(row, column) {
    return isFreeCell(row, column) ? copy.free : (state.cells[row][column] || '').trim();
  }

  function getCreditName() {
    return document.body.dataset.bingoCredit || copy.creditDefault;
  }

  function getCanonicalUrl() {
    var canonical = document.querySelector('link[rel="canonical"]');
    return canonical ? canonical.href : window.location.origin + window.location.pathname;
  }

  function formatImageDate(date) {
    if (locale === 'en') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
  }

  function getImageMetaText() {
    var parts = [];
    var author = state.imageAuthor.trim();
    if (author) parts.push(author);
    if (state.imageDate) parts.push(formatImageDate(new Date()));
    var lines = countCompletedLines();
    if (lines > 0) parts.push(copy.imageBingoBadge(lines));
    return parts.join('  ·  ');
  }

  function createSeededRandom(seed) {
    var value = seed;
    return function () {
      value = (value * 16807) % 2147483647;
      return (value - 1) / 2147483646;
    };
  }

  function traceRoundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + width, y, x + width, y + height, radius);
    context.arcTo(x + width, y + height, x, y + height, radius);
    context.arcTo(x, y + height, x, y, radius);
    context.arcTo(x, y, x + width, y, radius);
    context.closePath();
  }

  function drawImageBackground(context, theme, width, height) {
    var gradient = context.createLinearGradient(0, 0, width * 0.35, height);
    gradient.addColorStop(0, theme.background[0]);
    gradient.addColorStop(1, theme.background[1]);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    if (!theme.decoration) return;

    var random = createSeededRandom(20261117);
    var count = Math.round((width * height) / 52000);
    context.save();
    for (var index = 0; index < count; index += 1) {
      var x = random() * width;
      var y = random() * height;
      var radius = width * (0.002 + random() * 0.006);
      context.globalAlpha = 0.18 + random() * 0.32;
      context.fillStyle = theme.decoration[index % theme.decoration.length];
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.restore();
  }

  function fitFontSize(context, text, maxWidth, baseSize, minimumSize, fontFamily, fontWeight) {
    var fontSize = baseSize;
    context.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
    while (fontSize > minimumSize && context.measureText(text).width > maxWidth) {
      fontSize -= 2;
      context.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
    }
    return fontSize;
  }

  async function renderShareImage(canvas) {
    var fontConfig = fontMap[state.font] || fontMap.marker;
    try {
      await loadSelectedFont(fontConfig);
      await new Promise(function (resolve) { window.setTimeout(resolve, 100); });
    } catch (error) {
      // Canvas falls back to the local font stack.
    }

    var ratio = IMAGE_RATIOS[state.imageRatio] || IMAGE_RATIOS.square;
    var theme = IMAGE_THEMES[state.imageTheme] || IMAGE_THEMES[defaultImageTheme];
    var width = ratio.width;
    var height = ratio.height;
    var padding = Math.round(width * 0.06);
    var contentWidth = width - padding * 2;
    var size = state.size;
    var context = canvas.getContext('2d');
    var title = state.title || copy.defaultTitle;
    var metaText = getImageMetaText();
    var creditText = copy.imageCredit(getCreditName());
    var urlText = getCanonicalUrl().replace(/^https?:\/\//, '');

    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    drawImageBackground(context, theme, width, height);
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    var titleSize = fitFontSize(context, title, contentWidth, Math.round(width * 0.068), Math.round(width * 0.032), fontConfig.fallback, fontConfig.weight);
    var titleY = padding + titleSize * 0.6;
    context.fillStyle = theme.title;
    context.fillText(title, width / 2, titleY);
    var headerBottom = titleY + titleSize * 0.7;

    if (metaText) {
      var metaSize = fitFontSize(context, metaText, contentWidth, Math.round(width * 0.032), Math.round(width * 0.018), fontConfig.fallback, fontConfig.weight);
      var metaY = headerBottom + metaSize * 0.9;
      context.fillStyle = theme.meta;
      context.fillText(metaText, width / 2, metaY);
      headerBottom = metaY + metaSize * 0.6;
    }
    headerBottom += width * 0.03;

    var creditSize = fitFontSize(context, creditText, contentWidth, Math.round(width * 0.03), Math.round(width * 0.018), fontConfig.fallback, fontConfig.weight);
    var urlFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
    var urlSize = fitFontSize(context, urlText, contentWidth, Math.round(width * 0.022), Math.round(width * 0.012), urlFamily, 500);
    var footerHeight = creditSize * 1.45 + urlSize * 1.45 + padding * 0.75;
    var available = height - headerBottom - footerHeight - padding * 0.3;
    var panelSize = Math.min(contentWidth, available);
    var panelX = (width - panelSize) / 2;
    var panelY = headerBottom + Math.max(0, (available - panelSize) / 2);
    var panelRadius = panelSize * 0.03;

    context.save();
    context.shadowColor = theme.shadow;
    context.shadowBlur = panelSize * 0.04;
    context.shadowOffsetY = panelSize * 0.012;
    context.fillStyle = theme.panel;
    traceRoundedRect(context, panelX, panelY, panelSize, panelSize, panelRadius);
    context.fill();
    context.restore();

    var inset = panelSize * 0.045;
    var gridSize = panelSize - inset * 2;
    var gridLeft = panelX + inset;
    var gridTop = panelY + inset;
    var cellSize = gridSize / size;

    context.strokeStyle = theme.grid;
    context.lineWidth = Math.max(4, panelSize * 0.0045);
    context.lineCap = 'square';
    for (var line = 0; line <= size; line += 1) {
      var offset = line * cellSize;
      context.beginPath();
      context.moveTo(gridLeft, gridTop + offset);
      context.lineTo(gridLeft + gridSize, gridTop + offset);
      context.stroke();
      context.beginPath();
      context.moveTo(gridLeft + offset, gridTop);
      context.lineTo(gridLeft + offset, gridTop + gridSize);
      context.stroke();
    }

    for (var row = 0; row < size; row += 1) {
      for (var column = 0; column < size; column += 1) {
        var x = gridLeft + column * cellSize;
        var y = gridTop + row * cellSize;
        var label = getCellLabel(row, column);
        if (label) {
          drawWrappedText(
            context,
            label,
            x,
            y,
            cellSize,
            cellSize,
            Math.round(cellSize * (size === 5 ? 0.186 : 0.16)),
            Math.round(cellSize * (size === 5 ? 0.08 : 0.073)),
            fontConfig.fallback,
            fontConfig.weight,
            theme.cellText
          );
        }
        if (isEffectivelyMarked(row, column)) drawMark(context, x, y, cellSize, theme.mark);
      }
    }

    var creditY = height - padding * 0.55 - urlSize * 1.45 - creditSize * 0.7;
    context.font = fontConfig.weight + ' ' + creditSize + 'px ' + fontConfig.fallback;
    context.fillStyle = theme.title;
    context.fillText(creditText, width / 2, creditY);
    context.font = '500 ' + urlSize + 'px ' + urlFamily;
    context.fillStyle = theme.meta;
    context.fillText(urlText, width / 2, creditY + creditSize * 0.7 + urlSize * 0.85);
    return canvas;
  }

  function canvasToBlob(canvas) {
    // JPEG encodes the gradient backgrounds about ten times faster than PNG and keeps files small for SNS uploads.
    return new Promise(function (resolve) {
      canvas.toBlob(resolve, 'image/jpeg', 0.92);
    });
  }

  async function createShareImageFile() {
    await renderShareImage(offscreenCanvas);
    var blob = await canvasToBlob(offscreenCanvas);
    if (!blob) return null;
    var safeTitle = (state.title || 'bingo').replace(/[\/\\?%*:|"<>]/g, '-');
    var fileName = safeTitle + '_' + state.size + 'x' + state.size + '.jpg';
    return { blob: blob, file: new File([blob], fileName, { type: 'image/jpeg' }), fileName: fileName };
  }

  function getImageTrackingParameters() {
    return {
      board_size: state.size,
      completed_lines: countCompletedLines(),
      image_ratio: state.imageRatio,
      image_theme: state.imageTheme,
      template_page: pageTemplateId || 'default'
    };
  }

  async function exportPng() {
    trackEvent('bingo_image_exported', getImageTrackingParameters());
    var image = await createShareImageFile();
    if (!image) {
      showToast(copy.exportFailed);
      return;
    }

    if (isMobileDevice() && navigator.canShare && navigator.canShare({ files: [image.file] })) {
      try {
        await navigator.share({ files: [image.file], title: state.title });
        showToast(copy.imageShared);
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
      }
    }
    downloadBlob(image.blob, image.fileName);
  }

  function getPostHashtags() {
    return (document.body.dataset.bingoHashtags || copy.defaultHashtags)
      .split(',')
      .map(function (tag) { return tag.trim(); })
      .filter(Boolean);
  }

  function getPostUrl() {
    return getCanonicalUrl() + '?utm_source=x&utm_medium=social&utm_campaign=bingo_share';
  }

  function getPostText() {
    return copy.postText(state.title || copy.defaultTitle, countCompletedLines());
  }

  function getXIntentUrl() {
    var parameters = new URLSearchParams({
      text: getPostText(),
      url: getPostUrl(),
      hashtags: getPostHashtags().join(',')
    });
    return 'https://x.com/intent/post?' + parameters.toString();
  }

  function openXIntent(targetWindow) {
    var intentUrl = getXIntentUrl();
    if (targetWindow && !targetWindow.closed) {
      targetWindow.location.href = intentUrl;
      return;
    }
    window.open(intentUrl, '_blank', 'noopener');
  }

  async function postToX() {
    var useShareSheet = isMobileDevice() && typeof navigator.canShare === 'function';
    // Open the tab during the click so popup blockers allow it, then point it at X after the image is ready.
    var intentWindow = useShareSheet ? null : window.open('', '_blank');
    if (intentWindow) intentWindow.opener = null;

    var image = await createShareImageFile();
    var parameters = getImageTrackingParameters();

    if (useShareSheet && image && navigator.canShare({ files: [image.file] })) {
      parameters.method = 'share_sheet';
      trackEvent('bingo_x_post_clicked', parameters);
      try {
        await navigator.share({
          files: [image.file],
          text: getPostText() + ' ' + getPostHashtags().map(function (tag) { return '#' + tag; }).join(' ') + '\n' + getPostUrl()
        });
        showToast(copy.imageShared);
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
      }
    }

    parameters.method = 'intent';
    trackEvent('bingo_x_post_clicked', parameters);
    if (image) downloadBlob(image.blob, image.fileName);
    openXIntent(intentWindow);
    showToast(image ? copy.xIntentOpened : copy.exportFailed);
  }

  var imagePreviewCanvas = $('#imagePreview');
  var imagePreviewTimer = null;
  var imagePreviewVisible = false;
  var imagePreviewWorkCanvas = document.createElement('canvas');

  function scheduleImagePreview() {
    if (!imagePreviewCanvas || !imagePreviewVisible) return;
    window.clearTimeout(imagePreviewTimer);
    imagePreviewTimer = window.setTimeout(async function () {
      await renderShareImage(imagePreviewWorkCanvas);
      var previewWidth = 360;
      var previewHeight = Math.round(previewWidth * imagePreviewWorkCanvas.height / imagePreviewWorkCanvas.width);
      imagePreviewCanvas.width = previewWidth * 2;
      imagePreviewCanvas.height = previewHeight * 2;
      imagePreviewCanvas.getContext('2d').drawImage(imagePreviewWorkCanvas, 0, 0, imagePreviewCanvas.width, imagePreviewCanvas.height);
      imagePreviewCanvas.dataset.ratio = state.imageRatio;
    }, 350);
  }

  function setupImagePreview() {
    if (!imagePreviewCanvas) return;
    if (!('IntersectionObserver' in window)) {
      imagePreviewVisible = true;
      scheduleImagePreview();
      return;
    }
    new IntersectionObserver(function (entries) {
      imagePreviewVisible = entries.some(function (entry) { return entry.isIntersecting; });
      if (imagePreviewVisible) scheduleImagePreview();
    }, { rootMargin: '200px 0px' }).observe(imagePreviewCanvas);
  }

  function isMobileDevice() {
    var hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return hasTouch && window.innerWidth <= 900;
  }

  function drawMark(context, x, y, cellSize, color) {
    context.save();
    context.translate(x + cellSize / 2, y + cellSize / 2);
    context.rotate(-12 * Math.PI / 180);
    context.strokeStyle = color || '#ff3b3b';
    context.lineWidth = Math.max(10, cellSize * 0.03);
    context.shadowColor = 'rgba(0, 0, 0, 0.18)';
    context.shadowBlur = 12;
    context.shadowOffsetY = 4;
    context.beginPath();
    context.arc(0, 0, cellSize * 0.35, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }

  function wrapLines(context, text, maxWidth) {
    var tokens = locale === 'en' && text.includes(' ') ? text.split(/\s+/) : Array.from(text);
    var separator = locale === 'en' && text.includes(' ') ? ' ' : '';
    var lines = [];
    var current = '';

    tokens.forEach(function (token) {
      var candidate = current ? current + separator + token : token;
      if (current && context.measureText(candidate).width > maxWidth) {
        lines.push(current);
        current = token;
      } else {
        current = candidate;
      }
    });
    if (current) lines.push(current);
    return lines;
  }

  function drawWrappedText(context, text, x, y, width, height, baseSize, minimumSize, fontFamily, fontWeight, color) {
    var fontSize = baseSize;
    var lines = [];
    do {
      context.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
      lines = wrapLines(context, text, width * 0.88);
      if (lines.length * fontSize * 1.18 <= height * 0.88) break;
      fontSize -= 2;
    } while (fontSize > minimumSize);

    context.fillStyle = color || '#111111';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    var lineHeight = fontSize * 1.18;
    var startY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach(function (line, index) {
      context.fillText(line, x + width / 2, startY + index * lineHeight);
    });
  }

  function downloadBlob(blob, fileName) {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.setTimeout(function () { URL.revokeObjectURL(link.href); }, 2000);
    showToast(copy.imageSaved);
  }

  function getPrintableValues() {
    var values = [];
    for (var row = 0; row < state.size; row += 1) {
      for (var column = 0; column < state.size; column += 1) {
        if (!isFreeCell(row, column)) values.push((state.cells[row][column] || '').trim());
      }
    }
    return values;
  }

  function createPrintableMatrix(values) {
    var matrix = createMatrix(state.size, '');
    var valueIndex = 0;
    for (var row = 0; row < state.size; row += 1) {
      for (var column = 0; column < state.size; column += 1) {
        if (isFreeCell(row, column)) continue;
        matrix[row][column] = values[valueIndex] || '';
        valueIndex += 1;
      }
    }
    return matrix;
  }

  function createUniqueShuffle(values, signatures) {
    var candidate = values.slice();
    var signature = candidate.join('\u001f');
    for (var attempt = 0; attempt < 12; attempt += 1) {
      candidate = shuffledCopy(values);
      signature = candidate.join('\u001f');
      if (!signatures[signature]) break;
    }
    signatures[signature] = true;
    return candidate;
  }

  function renderPrintCards(count) {
    if (!printSheets) return;
    printSheets.innerHTML = '';
    var values = getPrintableValues();
    var signatures = {};
    var fontConfig = fontMap[state.font] || fontMap.marker;

    for (var cardIndex = 0; cardIndex < count; cardIndex += 1) {
      var cardValues = count === 1
        ? values.slice()
        : createUniqueShuffle(values, signatures);
      var matrix = createPrintableMatrix(cardValues);
      var article = document.createElement('article');
      article.className = 'print-card';
      article.dataset.cardSignature = cardValues.join('|');
      article.style.fontFamily = fontConfig.fallback;

      var heading = document.createElement('h1');
      heading.textContent = state.title || copy.defaultTitle;
      article.appendChild(heading);

      var numberLabel = copy.printCardNumber(cardIndex + 1, count);
      if (numberLabel) {
        var cardNumber = document.createElement('p');
        cardNumber.className = 'print-card__number';
        cardNumber.textContent = numberLabel;
        article.appendChild(cardNumber);
      }

      var grid = document.createElement('div');
      grid.className = 'print-grid';
      grid.style.setProperty('--print-board-size', state.size);
      grid.dataset.size = String(state.size);

      for (var row = 0; row < state.size; row += 1) {
        for (var column = 0; column < state.size; column += 1) {
          var cell = document.createElement('div');
          var free = isFreeCell(row, column);
          cell.className = 'print-cell' + (free ? ' free-cell' : '');
          cell.textContent = free ? copy.free : matrix[row][column];
          grid.appendChild(cell);
        }
      }

      article.appendChild(grid);
      printSheets.appendChild(article);
    }
  }

  async function printCards() {
    var count = printCountSelect ? Number(printCountSelect.value) : 1;
    if (![1, 2, 4].includes(count)) count = 1;
    renderPrintCards(count);
    trackEvent('bingo_print_opened', {
      board_size: state.size,
      card_count: count,
      shuffled_variants: count > 1
    });

    try {
      await loadSelectedFont(fontMap[state.font] || fontMap.marker);
    } catch (error) {
      // Printing remains available with the configured fallback font.
    }
    showToast(copy.printReady(count));
    window.setTimeout(function () { window.print(); }, 80);
  }

  async function shareLink() {
    var encoded = base64Url.encode(serialize());
    var url = window.location.origin + window.location.pathname + window.location.search + '#b=' + encoded;
    trackEvent('bingo_link_shared', { board_size: state.size, completed_lines: countCompletedLines() });
    try {
      await navigator.clipboard.writeText(url);
      showToast(copy.linkCopied);
    } catch (error) {
      window.prompt(copy.copyPrompt, url);
    }
  }

  function tryLoadFromUrl() {
    if (!window.location.hash.startsWith('#b=')) return;
    try {
      var encoded = window.location.hash.slice(3);
      var value = JSON.parse(base64Url.decode(encoded));
      if (!loadFrom(value)) throw new Error('Invalid card');
      showToast(copy.sharedLoaded);
    } catch (error) {
      showToast(copy.invalidShare);
    }
  }

  $('#edit').addEventListener('change', function () { setMode('edit'); });
  $('#preview').addEventListener('change', function () { setMode('preview'); });
  $('#play').addEventListener('change', function () { setMode('play'); });
  $('#sampleBtn').addEventListener('click', function () {
    applyTemplate(templateSelect ? templateSelect.value : 'setlist');
  });
  $('#shuffleBtn').addEventListener('click', shuffleCells);
  $('#resetBtn').addEventListener('click', resetBoard);
  $('#exportPng').addEventListener('click', exportPng);
  $('#printCards').addEventListener('click', printCards);
  $('#shareLink').addEventListener('click', shareLink);
  if ($('#postX')) $('#postX').addEventListener('click', postToX);

  function syncImageInputs() {
    if (imageRatioSelect) imageRatioSelect.value = state.imageRatio;
    if (imageThemeSelect) imageThemeSelect.value = state.imageTheme;
    if (imageAuthorInput) imageAuthorInput.value = state.imageAuthor;
    if (imageDateInput) imageDateInput.checked = state.imageDate;
  }

  if (imageRatioSelect) {
    imageRatioSelect.addEventListener('change', function (event) {
      state.imageRatio = IMAGE_RATIOS[event.target.value] ? event.target.value : 'square';
      saveLocal();
    });
  }
  if (imageThemeSelect) {
    imageThemeSelect.addEventListener('change', function (event) {
      state.imageTheme = IMAGE_THEMES[event.target.value] ? event.target.value : defaultImageTheme;
      saveLocal();
    });
  }
  if (imageAuthorInput) {
    imageAuthorInput.addEventListener('input', function (event) {
      state.imageAuthor = event.target.value.slice(0, MAX_AUTHOR_LENGTH);
      saveLocal();
    });
  }
  if (imageDateInput) {
    imageDateInput.addEventListener('change', function (event) {
      state.imageDate = event.target.checked;
      saveLocal();
    });
  }

  titleInput.addEventListener('input', function (event) {
    state.title = event.target.value || copy.defaultTitle;
    previewTitle.textContent = state.title;
    if (state.mode === 'preview') scheduleSelectedFontLoad();
    state.id = null;
    saveLocal();
  });
  sizeSelect.addEventListener('change', function (event) {
    setBoardSize(Number(event.target.value));
  });
  fontSelect.addEventListener('change', function (event) {
    state.font = normalizeFont(event.target.value);
    if (state.mode === 'preview') {
      render();
      loadSelectedFont(fontMap[state.font] || fontMap.marker).catch(function () {
        // Keep the preview usable with its fallback font when the network is unavailable.
      });
    }
    saveLocal();
  });
  freeCenterInput.addEventListener('change', function (event) {
    state.freeCenter = event.target.checked;
    state.id = null;
    render();
    saveLocal();
    trackEvent('bingo_free_center_changed', {
      board_size: state.size,
      free_center: state.freeCenter
    });
  });

  renderRelatedPromotion();
  setupRelatedAppTracking();
  var relatedService = $('#relatedService');
  var relatedExternal = $('#relatedExternal');
  if (relatedExternal) {
    relatedExternal.addEventListener('click', function () {
      trackEvent('bingo_related_service_clicked', {
        destination: relatedExternal.dataset.destination || 'unknown',
        audience: relatedService ? relatedService.dataset.audience : getPromotionAudience()
      });
    });
  }

  if (templateSelect && pageTemplateId) templateSelect.value = pageTemplateId;
  syncImageInputs();
  if (!loadLocal() && pageTemplateId) applyPageTemplate();
  render();
  setupImagePreview();
  tryLoadFromUrl();
  window.addEventListener('hashchange', tryLoadFromUrl);
  window.addEventListener('resize', scheduleTextareaAlignment);
  window.addEventListener('resize', renderRelatedPromotion);
  window.addEventListener('beforeprint', function () {
    if (printSheets && !printSheets.children.length) renderPrintCards(1);
  });
  window.setTimeout(focusFirstEmptyCell, 100);
  $('#y').textContent = String(new Date().getFullYear());
})();
