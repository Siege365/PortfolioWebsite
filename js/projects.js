/* ==========================================
   PROJECTS SECTION SCRIPTS
   ========================================== */

// ==================== SCROLL REVEAL ====================
function initProjectsScrollReveal() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) return;
    
    // Add reveal class to all cards
    projectCards.forEach(card => {
        card.classList.add('reveal');
    });
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// ==================== 3D TILT EFFECT ====================

// ==================== TECH TAG TOOLTIPS ====================
function initTechTagEffects() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        // Add ripple effect on hover
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
        });
    });
}


// ==================== HEADER REVEAL ====================
function initProjectsHeaderReveal() {
    const header = document.querySelector('.projects-header');
    
    if (!header) return;
    
    header.classList.add('reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(header);
}

// ==================== SEE MORE FUNCTIONALITY ====================
function initSeeMoreLinks() {
    const seeMoreLinks = document.querySelectorAll('.see-more-link');
    
    seeMoreLinks.forEach(link => {
        const projectContent = link.closest('.project-content');
        const description = projectContent.querySelector('.project-description');
        
        if (!description) return;
        
        // Store original text and create truncated version
        const fullText = description.textContent;
        const maxLength = 120;
        
        // Only apply if text is longer than max
        if (fullText.length <= maxLength) {
            link.style.display = 'none';
            return;
        }
        
        const truncatedText = fullText.substring(0, maxLength).trim() + '...';
        
        // Set initial state
        description.setAttribute('data-full-text', fullText);
        description.setAttribute('data-truncated-text', truncatedText);
        description.textContent = truncatedText;
        description.classList.add('truncated');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const isExpanded = description.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse - trigger animation first, then change text
                description.classList.remove('expanded');
                description.classList.add('truncated');
                link.textContent = 'See More →';
                
                // Wait for animation to complete before truncating text
                setTimeout(() => {
                    description.textContent = truncatedText;
                }, 600);
            } else {
                // Expand - change text first, then trigger animation
                description.textContent = fullText;
                description.classList.remove('truncated');
                description.classList.add('expanded');
                link.textContent = 'See Less ←';
            }
        });
    });
}

// ==================== INITIALIZE PROJECTS ====================
function initProjects() {
    initProjectsHeaderReveal();
    initProjectsScrollReveal();
    // Disabled 3D tilt - using simple hover effects instead
    // initProjectTilt();
    initTechTagEffects();
    initSeeMoreLinks();
    // Parallax disabled by default - can be enabled if desired
    // initProjectsParallax();
}
