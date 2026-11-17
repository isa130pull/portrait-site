(function () {
  'use strict';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', 'G-CF20TVK6DP');

  function loadAnalytics() {
    if (window.location.hostname !== 'isa130pull.github.io' ||
        (window.location.pathname !== '/portrait-site' &&
         window.location.pathname.indexOf('/portrait-site/') !== 0)) return;
    if (document.querySelector('script[data-analytics-script]')) return;

    var script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-CF20TVK6DP';
    script.async = true;
    script.dataset.analyticsScript = 'true';
    document.head.appendChild(script);
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadAnalytics);
  } else {
    window.setTimeout(loadAnalytics, 2000);
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('[data-store-cta]');
    if (!link) return;

    window.gtag('event', 'app_store_click', {
      app_name: document.body.dataset.app || '',
      store: link.dataset.store || '',
      placement: link.dataset.storeCta || ''
    });
  });
})();
