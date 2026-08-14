(function () {
  'use strict';

  var storageKey = 'portrait-site-language';
  var pageLanguage = document.documentElement.lang === 'en' ? 'en' : 'ja';

  function readPreference() {
    try {
      var value = window.localStorage.getItem(storageKey);
      return value === 'en' || value === 'ja' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function savePreference(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      // Language selection still works through normal links when storage is unavailable.
    }
  }

  document.querySelectorAll('[data-language-choice]').forEach(function (link) {
    link.addEventListener('click', function () {
      savePreference(this.dataset.languageChoice);

      var target = new URL(this.href);
      target.search = window.location.search;
      target.hash = window.location.hash;
      this.href = target.href;
    });
  });

  if (document.body.dataset.languageSource === 'top') {
    savePreference(pageLanguage);
    return;
  }

  if (document.body.dataset.inheritLanguage !== 'true') return;

  var preferredLanguage = readPreference();
  if (!preferredLanguage || preferredLanguage === pageLanguage) return;

  var languageChoice = document.querySelector(
    '[data-language-choice="' + preferredLanguage + '"]'
  );
  if (!languageChoice) return;

  var target = new URL(languageChoice.href);
  target.search = window.location.search;
  target.hash = window.location.hash;
  window.location.replace(target.pathname + target.search + target.hash);
})();
