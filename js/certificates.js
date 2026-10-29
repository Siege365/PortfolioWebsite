/* ==========================================================================
   CERTIFICATES SECTION SCRIPTS — Modal Inspector
   ========================================================================== */

function initCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  const certificateTriggers = document.querySelectorAll('.certificate-icon');
  const closeButton = document.querySelector('.certificate-modal-close');
  const overlay = document.querySelector('.certificate-modal-overlay');

  if (!modal) return;

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  certificateTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const image = trigger.dataset.image;
      const name = trigger.dataset.name;
      const issuer = trigger.dataset.issuer;
      const date = trigger.dataset.date;

      const certImg = document.getElementById('certificate-image');
      const certName = document.getElementById('certificate-modal-name');
      const certIssuer = document.getElementById('certificate-modal-issuer');
      const certDate = document.getElementById('certificate-modal-date');

      if (certImg) certImg.src = image;
      if (certName) certName.textContent = name;
      if (certIssuer) certIssuer.textContent = issuer;
      if (certDate) certDate.textContent = date;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeButton?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function initCertificates() {
  initCertificateModal();
}