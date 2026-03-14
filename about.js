/* ================================================
   WEBDEVROB1N — About JS (about.js)
   ================================================ */

'use strict';

// ── Skill bars animate on scroll ──
(function initSkillBars() {
  const skillBlocks = document.querySelectorAll('.skills-block');
  if (!skillBlocks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach((fill, i) => {
        setTimeout(() => {
          fill.classList.add('animated');
        }, i * 120);
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  skillBlocks.forEach(block => observer.observe(block));
})();

// ── Reveal .reveal items in About section ──
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

// ── Hover glow on info rows ──
(function initInfoRowGlow() {
  document.querySelectorAll('.info-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.boxShadow = '0 0 16px rgba(0, 245, 196, 0.06)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.boxShadow = '';
    });
  });
})();
