/* ==========================================================================
   ABOUT SECTION SCRIPTS
   ========================================================================== */

function initAbout() {
  const narrativeCard = document.querySelector('.about-narrative-card');
  const pillarsCard = document.querySelector('.about-pillars-card');
  
  if (!narrativeCard || !pillarsCard) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(narrativeCard);
  observer.observe(pillarsCard);
}
