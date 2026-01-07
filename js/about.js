/* ==========================================
   ABOUT SECTION SCRIPTS
   ========================================== */

// ==================== SCROLL REVEAL FOR ABOUT ====================
function initAboutScrollReveal() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    const revealElements = aboutSection.querySelectorAll('.reveal');
    const statCards = aboutSection.querySelectorAll('.stat-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    revealElements.forEach(el => observer.observe(el));
    
    // Observe stat cards
    statCards.forEach(card => {
        card.classList.add('reveal');
        observer.observe(card);
    });
}

// ==================== ABOUT PHOTO PARALLAX ====================
function initAboutPhotoEffect() {
    const aboutSection = document.querySelector('#about');
    const photoWrapper = document.querySelector('.about-photo-wrapper');
    
    if (!aboutSection || !photoWrapper) return;
    
    aboutSection.addEventListener('mousemove', (e) => {
        const rect = aboutSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 50;
        const moveY = (y - centerY) / 50;
        
        photoWrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    aboutSection.addEventListener('mouseleave', () => {
        photoWrapper.style.transform = 'translate(0, 0)';
        photoWrapper.style.transition = 'transform 0.5s ease';
    });
    
    aboutSection.addEventListener('mouseenter', () => {
        photoWrapper.style.transition = 'transform 0.1s ease';
    });
}

// ==================== ABOUT TEXT HIGHLIGHT ANIMATION ====================
function initAboutTextEffects() {
    const emphasisElements = document.querySelectorAll('.about-description .emphasis');
    
    emphasisElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.color = 'var(--secondary)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.color = 'var(--accent)';
        });
    });
}

// ==================== INITIALIZE ABOUT ====================
function initAbout() {
    initAboutScrollReveal();
    initAboutPhotoEffect();
    initAboutTextEffects();
}
