(function () {
  'use strict';

  var nav = document.querySelector('[data-page-nav]');
  if (!nav) return;

  var header = document.querySelector('.site-header');
  var destinations = Array.from(nav.querySelectorAll('a[href^="#"]')).map(function (link) {
    return { link: link, section: document.querySelector(link.getAttribute('href')) };
  }).filter(function (destination) {
    return destination.section;
  });
  if (!destinations.length) return;

  var queued = false;
  function updateCurrent() {
    queued = false;
    var headerHeight = header ? header.getBoundingClientRect().height : 64;
    var offset = Math.max(headerHeight + 28, window.innerHeight * 0.2);
    var current = destinations[0];
    destinations.forEach(function (destination) {
      if (destination.section.getBoundingClientRect().top <= offset) current = destination;
    });
    destinations.forEach(function (destination) {
      if (destination === current) destination.link.setAttribute('aria-current', 'location');
      else destination.link.removeAttribute('aria-current');
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
  window.addEventListener('load', scheduleUpdate);
  if (document.fonts) document.fonts.ready.then(scheduleUpdate);
  updateCurrent();
})();
