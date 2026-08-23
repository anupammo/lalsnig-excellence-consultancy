/* ==========================================================================
   LALSNIG Consulting - site behaviour
   Progressive enhancement only: every section is fully readable and navigable
   with JavaScript disabled. Nothing here blocks first paint (loaded deferred).
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Header shadow once the page is scrolled ------------------------ */
  // Reading window.scrollY inside a scroll listener forces a synchronous layout
  // on every frame - measured at 316 ms of forced reflow on a throttled phone.
  // A 1px sentinel at the top of the document gives the same signal for free:
  // the observer only fires when it crosses the viewport edge.
  var header = document.querySelector('.ls-header');
  if (header && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
    document.body.insertBefore(sentinel, document.body.firstChild);

    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* --- 2. Reveal-on-scroll ---------------------------------------------- */
  var revealables = document.querySelectorAll('.ls-reveal');
  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* --- 3. Scroll-spy on the in-page navigation --------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.ls-nav .nav-link[href^="#"]'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      navLinks.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
      });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* --- 4. Collapse the mobile menu after an in-page jump ----------------- */
  var collapseEl = document.getElementById('lsPrimaryNav');
  if (collapseEl && window.bootstrap) {
    collapseEl.addEventListener('click', function (event) {
      var link = event.target.closest('a.nav-link, a.ls-btn');
      if (!link || !collapseEl.classList.contains('show')) return;
      bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
    });
  }

  /* --- 5. Footer year ---------------------------------------------------- */
  var year = document.querySelector('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
