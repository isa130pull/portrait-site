// スマホで開いたとき、その端末の OS のストアのボタンを先頭に並べ替える。
// 自動の転送はしない。ヘッダーの CTA もその OS のストアへ向ける。
(function () {
  'use strict';

  var ua = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var preferred = isIOS ? 'app-store' : isAndroid ? 'google-play' : '';
  if (!preferred) return;

  document.documentElement.dataset.preferredStore = preferred;

  function apply() {
    var groups = document.querySelectorAll('.store-actions');
    Array.prototype.forEach.call(groups, function (group) {
      var link = group.querySelector('[data-store="' + preferred + '"]');
      if (!link) return;
      link.classList.add('is-preferred-store');
      if (group.firstElementChild !== link) group.insertBefore(link, group.firstElementChild);
    });

    var header = document.querySelector('.header-cta');
    var source = document.querySelector('.store-actions [data-store="' + preferred + '"]');
    if (header && source) {
      header.href = source.href;
      header.dataset.store = preferred;
      header.target = '_blank';
      header.rel = 'noopener';
      var label = header.dataset['label' + (preferred === 'app-store' ? 'AppStore' : 'GooglePlay')];
      if (label) header.setAttribute('aria-label', label);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
