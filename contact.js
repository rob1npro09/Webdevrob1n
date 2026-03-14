/* ================================================
   WEBDEVROB1N — Contact JS (contact.js)
   ================================================ */

'use strict';

(function initContactForm() {
  const form      = document.querySelector('.contact-form');
  const statusEl  = document.querySelector('.form-status');
  const submitBtn = document.querySelector('.form-submit');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    /* Validation */
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) { field.classList.add('error'); valid = false; }
    });
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add('error'); valid = false;
      }
    }
    if (!valid) { showStatus('error', '⚠ Please fill in all required fields correctly.'); return; }

    /* Send using emailjs.send() with explicit values — more reliable than sendForm() */
    const origText = submitBtn.textContent;
    submitBtn.textContent = '⟳ Sending…';
    submitBtn.disabled = true;

    try {
      await emailjs.send(
        "service_4t8ryix",
        "template_132q691",
        {
          name:    form.querySelector('[name="name"]').value.trim(),
          email:   form.querySelector('[name="email"]').value.trim(),
          title:   form.querySelector('[name="title"]').value.trim(),
          message: form.querySelector('[name="message"]').value.trim(),
        }
      );
      submitBtn.textContent = origText;
      submitBtn.disabled = false;
      showStatus('success', "✓ Message sent! I'll get back to you soon.");
      form.reset();
    } catch (err) {
      submitBtn.textContent = origText;
      submitBtn.disabled = false;
      showStatus('error', '⚠ Failed to send. Please try again or email directly.');
      console.error('EmailJS error:', err);
    }
  });

  function showStatus(type, msg) {
    if (!statusEl) return;
    statusEl.className = 'form-status ' + type;
    statusEl.textContent = msg;
    statusEl.style.display = 'block';
    setTimeout(() => { statusEl.style.display = 'none'; }, 6000);
  }
})();
