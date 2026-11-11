(function () {
  'use strict';

  // 無音ループのプレイ動画を、画面に見えている間だけ再生する。
  // 視覚効果を減らす設定の端末では自動再生せず、操作ボタンを表示する。
  var videos = document.querySelectorAll('video[data-play-video]');
  if (!videos.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function play(video) {
    var result = video.play();
    if (result && typeof result.catch === 'function') result.catch(function () {});
  }

  videos.forEach(function (video) {
    video.muted = true;

    if (reduceMotion) {
      video.removeAttribute('autoplay');
      video.pause();
      video.controls = true;
      return;
    }

    video.controls = false;

    if (!('IntersectionObserver' in window)) {
      play(video);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) play(video);
        else video.pause();
      });
    }, { threshold: 0.25 });
    observer.observe(video);
  });
})();
