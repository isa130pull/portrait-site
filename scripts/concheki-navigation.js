(function () {
  'use strict';

  var nav = document.querySelector('.concheki-mobile-nav');
  if (!nav) return;

  var header = document.querySelector('.site-header');
  var destinations = Array.from(nav.querySelectorAll('a[href^="#"]')).map(function (link) {
    return { link: link, section: document.querySelector(link.getAttribute('href')) };
  }).filter(function (destination) {
    return destination.section;
  });
  if (!destinations.length) return;

  // FAQと入手のタブ順に依存せず、本文の並びで現在地を判定する。
  destinations.sort(function (a, b) {
    return a.section.compareDocumentPosition(b.section) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  var queued = false;
  function updateCurrent() {
    queued = false;
    var offset = (header ? header.getBoundingClientRect().height : 64) + 28;
    var current = destinations[0];
    destinations.forEach(function (destination) {
      if (destination.section.getBoundingClientRect().top <= offset) current = destination;
    });
    destinations.forEach(function (destination) {
      if (destination === current) {
        destination.link.setAttribute('aria-current', 'location');
      } else {
        destination.link.removeAttribute('aria-current');
      }
    });
  }

  function scheduleUpdate() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(updateCurrent);
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  updateCurrent();
})();
