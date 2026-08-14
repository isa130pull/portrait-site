(function () {
  'use strict';

  var root = document.querySelector('[data-mini-experience]');
  if (!root) return;

  var locale = document.documentElement.lang === 'en' ? 'en' : 'ja';
  var appName = root.dataset.appName || document.body.dataset.app || 'unknown';

  function track(name, parameters) {
    if (typeof window.gtag !== 'function') return;
    var payload = parameters || {};
    payload.app_name = appName;
    window.gtag('event', name, payload);
  }

  function setupInstallIntent() {
    var installLink = root.querySelector('[data-experience-install]');
    if (!installLink) return;
    installLink.addEventListener('click', function () {
      track('app_experience_install_intent', {
        placement: root.dataset.miniExperience
      });
    });
  }

  function setupQuiz() {
    var content = locale === 'en' ? {
      progress: function (current, total) { return 'Question ' + current + ' of ' + total; },
      questions: [
        { text: 'Where would you rather spend a free afternoon?', choices: [
          { label: 'Somewhere quiet', bold: 0, cool: 0 },
          { label: 'Somewhere lively', bold: 1, cool: 0 }
        ] },
        { text: 'Which style catches your eye first?', choices: [
          { label: 'Soft and cute', bold: 0, cool: 0 },
          { label: 'Sharp and cool', bold: 0, cool: 1 }
        ] },
        { text: 'What kind of partner sounds more fun?', choices: [
          { label: 'Someone reassuring', bold: 0, cool: 0 },
          { label: 'Someone adventurous', bold: 1, cool: 0 }
        ] },
        { text: 'Pick the better weekend plan.', choices: [
          { label: 'Relax at home', bold: 0, cool: 0 },
          { label: 'Try something new', bold: 1, cool: 0 }
        ] },
        { text: 'Which personality are you drawn to?', choices: [
          { label: 'Open and honest', bold: 0, cool: 0 },
          { label: 'Mysterious', bold: 0, cool: 1 }
        ] }
      ],
      results: [
        { title: 'The gentle listener', description: 'You may be drawn to a calm character who makes everyday moments feel comfortable.' },
        { title: 'The quiet mystery', description: 'A composed character with an unexpected side may keep catching your attention.' },
        { title: 'The bright mood-maker', description: 'You may click with someone energetic who turns every day into a small adventure.' },
        { title: 'The fearless challenger', description: 'A confident, cool character who pulls you into something new may be your type.' }
      ]
    } : {
      progress: function (current, total) { return total + '問中 ' + current + '問目'; },
      questions: [
        { text: '休日の午後、どちらで過ごしたい？', choices: [
          { label: '静かな場所', bold: 0, cool: 0 },
          { label: 'にぎやかな場所', bold: 1, cool: 0 }
        ] },
        { text: '最初に目を引かれるのは？', choices: [
          { label: 'やわらかく可愛い雰囲気', bold: 0, cool: 0 },
          { label: 'シャープで格好いい雰囲気', bold: 0, cool: 1 }
        ] },
        { text: '一緒にいるなら、どちらが楽しそう？', choices: [
          { label: '安心させてくれる人', bold: 0, cool: 0 },
          { label: '冒険へ連れ出してくれる人', bold: 1, cool: 0 }
        ] },
        { text: '週末の予定を選ぶなら？', choices: [
          { label: '家でゆったり過ごす', bold: 0, cool: 0 },
          { label: '新しいことに挑戦する', bold: 1, cool: 0 }
        ] },
        { text: '惹かれる性格はどちら？', choices: [
          { label: '素直で分かりやすい', bold: 0, cool: 0 },
          { label: '少しミステリアス', bold: 0, cool: 1 }
        ] }
      ],
      results: [
        { title: 'やさしい聞き上手タイプ', description: '穏やかで、一緒にいる日常を心地よくしてくれるキャラクターに惹かれそうです。' },
        { title: '静かなミステリアスタイプ', description: '落ち着いた雰囲気の中に意外な一面を持つキャラクターが気になりそうです。' },
        { title: '元気なムードメーカータイプ', description: '毎日を小さな冒険に変えてくれる、明るく行動的なキャラクターと好相性です。' },
        { title: 'クールな挑戦者タイプ', description: '自信があり、新しい世界へ引っ張ってくれる格好いいキャラクターが好みかもしれません。' }
      ]
    };

    var progress = root.querySelector('[data-quiz-progress]');
    var question = root.querySelector('[data-quiz-question]');
    var choiceButtons = Array.prototype.slice.call(root.querySelectorAll('[data-quiz-choice]'));
    var questionPanel = root.querySelector('[data-quiz-panel]');
    var resultPanel = root.querySelector('[data-quiz-result]');
    var resultTitle = root.querySelector('[data-quiz-result-title]');
    var resultDescription = root.querySelector('[data-quiz-result-description]');
    var restartButton = root.querySelector('[data-quiz-restart]');
    var current = 0;
    var boldScore = 0;
    var coolScore = 0;
    var started = false;

    function renderQuestion() {
      var item = content.questions[current];
      progress.textContent = content.progress(current + 1, content.questions.length);
      question.textContent = item.text;
      choiceButtons.forEach(function (button, index) {
        button.textContent = item.choices[index].label;
      });
    }

    function showResult() {
      var resultIndex = (boldScore >= 3 ? 2 : 0) + (coolScore >= 2 ? 1 : 0);
      var result = content.results[resultIndex];
      questionPanel.hidden = true;
      resultPanel.hidden = false;
      resultTitle.textContent = result.title;
      resultDescription.textContent = result.description;
      track('app_mini_quiz_completed', { result_type: resultIndex });
      resultTitle.focus();
    }

    choiceButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        if (!started) {
          started = true;
          track('app_mini_quiz_started');
        }
        var selected = content.questions[current].choices[index];
        boldScore += selected.bold;
        coolScore += selected.cool;
        current += 1;
        if (current >= content.questions.length) showResult();
        else renderQuestion();
      });
    });

    restartButton.addEventListener('click', function () {
      current = 0;
      boldScore = 0;
      coolScore = 0;
      started = false;
      resultPanel.hidden = true;
      questionPanel.hidden = false;
      renderQuestion();
      question.focus();
    });

    renderQuestion();
  }

  function setupTapChallenge() {
    var duration = Number(root.dataset.duration) || 30;
    var scoreElement = root.querySelector('[data-tap-score]');
    var timeElement = root.querySelector('[data-tap-time]');
    var arena = root.querySelector('[data-tap-arena]');
    var target = root.querySelector('[data-tap-target]');
    var startButton = root.querySelector('[data-tap-start]');
    var result = root.querySelector('[data-tap-result]');
    var resultText = root.querySelector('[data-tap-result-text]');
    var shareButton = root.querySelector('[data-tap-share]');
    var score = 0;
    var timer = null;
    var endTime = 0;
    var running = false;

    var copy = locale === 'en' ? {
      startAgain: 'Play again',
      copied: 'Score copied',
      result: function (value) {
        return appName === 'sushibaku'
          ? value + ' sushi launches in 30 seconds! The full game has 36 kinds of sushi and nine stages.'
          : value + ' hits in 30 seconds! The full game turns every hit into bigger destruction across 11 stages.';
      },
      share: function (value) {
        return 'I scored ' + value + ' in the ' + (appName === 'sushibaku' ? 'SushiBomb' : 'House Breaker') + ' 30-second web challenge!';
      }
    } : {
      startAgain: 'もう一度遊ぶ',
      copied: 'スコアをコピーしました',
      result: function (value) {
        return appName === 'sushibaku'
          ? '30秒で寿司を' + value + '回飛ばしました！本編では36種類の寿司と全9ステージを楽しめます。'
          : '30秒で' + value + '回ヒット！本編では一撃がさらに大きな破壊へつながり、全11ステージへ挑戦できます。';
      },
      share: function (value) {
        return (appName === 'sushibaku' ? 'すしばく!' : 'いえばく!') + 'の30秒Webチャレンジで' + value + '点！';
      }
    };

    function moveTarget() {
      target.style.left = (12 + Math.random() * 66) + '%';
      target.style.top = (12 + Math.random() * 60) + '%';
    }

    function finish() {
      running = false;
      window.clearInterval(timer);
      timer = null;
      target.hidden = true;
      startButton.hidden = false;
      startButton.textContent = copy.startAgain;
      result.hidden = false;
      resultText.textContent = copy.result(score);
      shareButton.hidden = false;
      track('app_tap_challenge_completed', { score: score, duration_seconds: duration });
      resultText.focus();
    }

    function updateTimer() {
      var remaining = Math.max(0, endTime - Date.now());
      timeElement.textContent = String(Math.ceil(remaining / 1000));
      if (remaining <= 0) finish();
    }

    function start() {
      window.clearInterval(timer);
      score = 0;
      running = true;
      endTime = Date.now() + duration * 1000;
      scoreElement.textContent = '0';
      timeElement.textContent = String(duration);
      result.hidden = true;
      shareButton.hidden = true;
      startButton.hidden = true;
      target.hidden = false;
      moveTarget();
      timer = window.setInterval(updateTimer, 100);
      track('app_tap_challenge_started', { duration_seconds: duration });
      target.focus();
    }

    target.addEventListener('click', function () {
      if (!running) return;
      score += 1;
      scoreElement.textContent = String(score);
      moveTarget();
    });

    startButton.addEventListener('click', start);
    shareButton.addEventListener('click', async function () {
      var text = copy.share(score);
      if (navigator.share) {
        try {
          await navigator.share({ text: text, url: window.location.href });
          track('app_tap_challenge_shared', { method: 'web_share', score: score });
          return;
        } catch (error) {
          if (error && error.name === 'AbortError') return;
        }
      }
      try {
        await navigator.clipboard.writeText(text + ' ' + window.location.href);
        resultText.textContent = copy.copied;
        track('app_tap_challenge_shared', { method: 'clipboard', score: score });
      } catch (error) {
        window.prompt('', text + ' ' + window.location.href);
      }
    });

    scoreElement.textContent = '0';
    timeElement.textContent = String(duration);
    arena.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && running) finish();
    });
  }

  setupInstallIntent();
  if (root.dataset.miniExperience === 'quiz') setupQuiz();
  if (root.dataset.miniExperience === 'tap') setupTapChallenge();
})();
