(function () {
  'use strict';
  var root = document.querySelector('[data-mini-experience="quiz"]');
  if (!root) return;
  var english = document.documentElement.lang === 'en';
  var assetBase = root.dataset.assetBase;
  var characters = [{"id": "2", "name": "かすみ", "style": "natural"}, {"id": "3", "name": "かなえ", "style": "natural"}, {"id": "4", "name": "みゆ", "style": "natural"}, {"id": "5", "name": "かんな", "style": "natural"}, {"id": "7", "name": "ひなの", "style": "sweet"}, {"id": "8", "name": "まりあ", "style": "sweet"}, {"id": "9", "name": "あんな", "style": "sweet"}, {"id": "15", "name": "なつみ", "style": "sweet"}, {"id": "0", "name": "まどか", "style": "flashy"}, {"id": "1", "name": "ひより", "style": "flashy"}, {"id": "11", "name": "りか", "style": "flashy"}, {"id": "12", "name": "ちさ", "style": "flashy"}, {"id": "31", "name": "あやの", "style": "cool"}, {"id": "38", "name": "なな", "style": "cool"}, {"id": "44", "name": "ゆか", "style": "cool"}, {"id": "61", "name": "まりん", "style": "cool"}];
  // These are sample rounds, independent of the app's diagnostic algorithm.
  // Every round includes at least two styles; the full roster stays in the app.
  var rounds = [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 14], [3, 10, 15], [7, 11]];
  var types = english ? {
    natural: ['Natural charm', 'Your choices leaned toward a natural, approachable look.'],
    sweet: ['Sweet charm', 'Your choices leaned toward a soft, sweet look.'],
    flashy: ['A bold impression', 'Your choices leaned toward expressive, eye-catching styling.'],
    cool: ['Cool elegance', 'Your choices leaned toward a calm, cool look.']
  } : {
    natural: ['ナチュラルな雰囲気', '今回の選択では、自然体で親しみやすい雰囲気に惹かれる傾向がありました。'],
    sweet: ['甘く、かわいい雰囲気', '今回の選択では、やわらかく甘い雰囲気に惹かれる傾向がありました。'],
    flashy: ['華やかで、印象的な雰囲気', '今回の選択では、メイクや装いが華やかな雰囲気に惹かれる傾向がありました。'],
    cool: ['すっきり、クールな雰囲気', '今回の選択では、落ち着いたクールな雰囲気に惹かれる傾向がありました。']
  };
  var panel = root.querySelector('[data-quiz-panel]');
  var progress = root.querySelector('[data-quiz-progress]');
  var question = root.querySelector('[data-quiz-question]');
  var options = root.querySelector('[data-quiz-options]');
  var result = root.querySelector('[data-quiz-result]');
  var resultTitle = root.querySelector('[data-quiz-result-title]');
  var resultDescription = root.querySelector('[data-quiz-result-description]');
  var resultImage = root.querySelector('[data-quiz-result-image]');
  var answers = [];

  function track(name, parameters) {
    if (typeof window.gtag !== 'function') return;
    var payload = parameters || {};
    payload.app_name = root.dataset.appName || 'ai-girl';
    window.gtag('event', name, payload);
  }

  function renderQuestion(focus) {
    var round = rounds[answers.length];
    progress.textContent = english ? 'Question ' + (answers.length + 1) + ' / 5' : '5問中 ' + (answers.length + 1) + '問目';
    question.textContent = english ? 'Who catches your eye?' : '気になる子を選んでね';
    options.replaceChildren();
    round.forEach(function (index) {
      var character = characters[index];
      var button = document.createElement('button');
      button.type = 'button';
      button.dataset.quizChoice = character.id;
      var image = document.createElement('img');
      image.src = assetBase + 'character-' + character.id + '.webp';
      image.alt = '';
      image.width = 320;
      image.height = 320;
      var label = document.createElement('span');
      label.textContent = character.name;
      button.append(image, label);
      button.addEventListener('click', function () {
        if (!answers.length) track('app_mini_quiz_started');
        answers.push(character);
        if (answers.length === rounds.length) showResult();
        else renderQuestion(true);
      });
      options.append(button);
    });
    if (focus) question.focus();
  }

  function showResult() {
    var scores = { natural: 0, sweet: 0, flashy: 0, cool: 0 };
    answers.forEach(function (character) { scores[character.style] += 1; });
    var highest = Math.max.apply(null, Object.keys(scores).map(function (key) { return scores[key]; }));
    // Most recent choice breaks a tie; no random result or saved preference.
    var chosen = answers.slice().reverse().find(function (character) { return scores[character.style] === highest; });
    var type = types[chosen.style];
    resultImage.src = assetBase + 'character-' + chosen.id + '.webp';
    resultImage.alt = english ? 'Your chosen character: ' + chosen.name : '選んだキャラクター：' + chosen.name;
    resultTitle.textContent = type[0];
    resultDescription.textContent = type[1];
    panel.hidden = true;
    result.hidden = false;
    track('app_mini_quiz_completed', { result_type: chosen.style });
    resultTitle.focus();
  }

  root.querySelector('[data-quiz-restart]').addEventListener('click', function () {
    answers = [];
    result.hidden = true;
    panel.hidden = false;
    renderQuestion(true);
  });
  root.querySelectorAll('[data-experience-install]').forEach(function (link) {
    link.addEventListener('click', function () {
      track('app_experience_install_intent', { placement: 'quiz' });
    });
  });
  root.querySelector('[data-quiz-loading]').hidden = true;
  panel.hidden = false;
  renderQuestion(false);
})();
