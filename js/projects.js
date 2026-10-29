/* ==========================================================================
   PROJECTS SECTION SCRIPTS — Case Studies & See-More Toggles
   ========================================================================== */

function initSeeMoreLinks() {
  const seeMoreLinks = document.querySelectorAll('.see-more-link');
  
  seeMoreLinks.forEach(link => {
    const parentContainer = link.closest('.case-body') || link.closest('.project-content');
    if (!parentContainer) return;
    
    const description = parentContainer.querySelector('.project-description');
    if (!description) return;
    
    const fullText = description.textContent.trim();
    const maxLength = 135;
    
    if (fullText.length <= maxLength) {
      link.style.display = 'none';
      return;
    }
    
    const truncatedText = fullText.substring(0, maxLength).trim() + '...';
    
    description.setAttribute('data-full-text', fullText);
    description.setAttribute('data-truncated-text', truncatedText);
    description.textContent = truncatedText;
    description.classList.add('truncated');
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = description.classList.contains('expanded');
      
      if (isExpanded) {
        description.classList.remove('expanded');
        description.classList.add('truncated');
        description.textContent = truncatedText;
        link.textContent = 'See More →';
      } else {
        description.textContent = fullText;
        description.classList.remove('truncated');
        description.classList.add('expanded');
        link.textContent = 'See Less ←';
      }
    });
  });
}

function initProjectsScrollReveal() {
  const cards = document.querySelectorAll('.editorial-case-card');
  if (cards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

function initProjects() {
  initProjectsScrollReveal();
  initSeeMoreLinks();
}
