/* ==========================================================================
   SKILLS SECTION SCRIPTS — Editorial Technical Matrix
   ========================================================================== */

function initSkills() {
  const matrixRows = document.querySelectorAll('.matrix-row');
  if (matrixRows.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  matrixRows.forEach(row => {
    observer.observe(row);
  });
}
