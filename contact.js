/* ================================================
   WEBDEVROB1N — Contact JS (contact.js)
   ================================================ */

'use strict';

// ── Contact form handler ──
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  const submitBtn = document.querySelector('.form-submit');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
    });

    // Email validation
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        emailField.classList.add('error');
        valid = false;
      }
    }

    if (!valid) {
      showStatus('error', '⚠ Please fill in all required fields correctly.');
      return;
    }

    // Loading state
    const origText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⟳ Sending…';
    submitBtn.disabled = true;

    try {

      // FIX: Corrected template ID from 'template_132q69l' to 'template_132q691'
      await emailjs.sendForm(
        "service_4t8ryix",
        "template_132q691",
        form
      );

      submitBtn.innerHTML = origText;
      submitBtn.disabled = false;

      showStatus('success', "✓ Message sent! I'll get back to you soon.");
      form.reset();

    } catch (error) {

      submitBtn.innerHTML = origText;
      submitBtn.disabled = false;

      showStatus('error', '⚠ Failed to send message. Please try again.');
      console.error(error);

    }

  });

  function showStatus(type, msg) {
    if (!status) return;
    status.className = `form-status ${type}`;
    status.textContent = msg;
    status.style.display = 'block';

    setTimeout(() => {
      status.style.display = 'none';
    }, 5000);
  }

  // Input error styling injection
  if (!document.querySelector('#form-error-styles')) {
    const s = document.createElement('style');
    s.id = 'form-error-styles';
    s.textContent = `
      .form-input.error,
      .form-textarea.error {
        border-color: rgba(255, 95, 87, 0.6) !important;
        box-shadow: 0 0 0 3px rgba(255, 95, 87, 0.08) !important;
      }
    `;
    document.head.appendChild(s);
  }

})();
