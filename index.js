/* ================================================
   WEBDEVROB1N — Global JS (index.js)
   ================================================ */

'use strict';

// ── Nav scroll behavior ──
const nav = document.querySelector('.nav');

function handleNavScroll() {
  if (window.scrollY > 20) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ── Mobile nav toggle ──
const navToggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMobile?.classList.toggle('open');
  document.body.style.overflow = navMobile?.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navMobile?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (navMobile?.classList.contains('open') &&
      !navMobile.contains(e.target) &&
      !navToggle?.contains(e.target)) {
    navToggle?.classList.remove('open');
    navMobile.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── Active nav link highlight ──
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link, .nav-mobile .nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.remove('active');
    if (href.includes(path) ||
        (path === '' || path === 'index.html') && href.includes('home.html')) {
      link.classList.add('active');
    }
  });
}

setActiveNavLink();

// ── Intersection Observer for scroll animations ──
const observerOpts = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.reveal').forEach(el => {
  scrollObserver.observe(el);
});

// ── Skill bar animation observer ──
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((fill, i) => {
        setTimeout(() => fill.classList.add('animated'), i * 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-block');
if (skillsSection) skillObserver.observe(skillsSection);

// ── UPI copy button ──
const copyBtn = document.querySelector('.upi-copy-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const upiText = document.querySelector('.upi-id')?.textContent?.trim();
    if (!upiText) return;

    try {
      await navigator.clipboard.writeText(upiText);
      copyBtn.classList.add('copied');
      const origText = copyBtn.innerHTML;
      copyBtn.innerHTML = '✓ Copied!';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = origText;
      }, 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = upiText;
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      copyBtn.classList.add('copied');
      const origText = copyBtn.innerHTML;
      copyBtn.innerHTML = '✓ Copied!';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = origText;
      }, 2000);
    }
  });
}

// ── CSS: add reveal styles if not present ──
if (!document.querySelector('#reveal-styles')) {
  const s = document.createElement('style');
  s.id = 'reveal-styles';
  s.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.in-view {
      opacity: 1;
      transform: none;
    }
    .reveal.delay-1 { transition-delay: 0.1s; }
    .reveal.delay-2 { transition-delay: 0.2s; }
    .reveal.delay-3 { transition-delay: 0.3s; }
    .reveal.delay-4 { transition-delay: 0.4s; }
  `;
  document.head.appendChild(s);
}
