/* ================================================
   WEBDEVROB1N — Home JS (home.js)
   ================================================ */

'use strict';

// ── Typing animation for hero role ──
(function initTypingEffect() {
  const el = document.querySelector('.hero-typed');
  if (!el) return;

  const phrases = [
    'Full-Stack Web Developer',
    'Discord Bot Developer',
    'Freelance Developer',
    'Student & Builder',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let pauseTimer = null;

  const TYPING_SPEED   = 75;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER    = 2000;
  const PAUSE_BEFORE   = 500;

  function type() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIdx === current.length) {
      delay = PAUSE_AFTER;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = PAUSE_BEFORE;
    }

    pauseTimer = setTimeout(type, delay);
  }

  // Start after a short delay
  setTimeout(type, 800);
})();

// ── Smooth scroll for hero CTA "View Work" button ──
document.querySelectorAll('[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = document.querySelector(btn.dataset.scrollTo);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Parallax on code window ──
(function initParallax() {
  const codeWindow = document.querySelector('.hero-right');
  if (!codeWindow) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const shift = scrollY * 0.08;
        codeWindow.style.transform = `translateY(${shift}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── Entrance animations ──
(function initHeroAnimations() {
  const items = document.querySelectorAll('.animate-up');
  items.forEach(item => {
    // Animation is already handled via CSS, just ensure they run
    item.style.animationPlayState = 'running';
  });
})();

// ── Count-up for stats ──
(function initCountUp() {
  const stats = document.querySelectorAll('.stat-value[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
})();
