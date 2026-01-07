/* ==========================================
   SKILLS SECTION SCRIPTS
   ========================================== */

// ==================== SCROLL REVEAL FOR CATEGORIES ====================
function initSkillsCategoryReveal() {
    const categories = document.querySelectorAll('.skill-category');
    
    if (categories.length === 0) return;
    
    categories.forEach(category => {
        category.classList.add('reveal');
    });
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger stagger animation for skill items within this category
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('revealed');
                    }, index * 80); // 80ms stagger
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    categories.forEach(category => {
        observer.observe(category);
    });
}

// ==================== SKILL ITEMS REVEAL SETUP ====================
function initSkillItemsReveal() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Add reveal class to all skill items for animation
    skillItems.forEach(item => {
        item.classList.add('reveal');
    });
}

// ==================== FLOATING ANIMATION ====================
function initSkillsFloating() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Only enable floating on non-touch, non-reduced-motion devices
    if ('ontouchstart' in window) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    skillItems.forEach(item => {
        item.classList.add('float');
    });
}

// ==================== HEADER REVEAL ====================
function initSkillsHeaderReveal() {
    const header = document.querySelector('.skills-header');
    
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

// ==================== MAGNETIC HOVER EFFECT ====================
function initSkillsMagneticEffect() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Only enable on non-touch devices
    if ('ontouchstart' in window) return;
    
    skillItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const logo = item.querySelector('.skill-logo');
            if (logo) {
                logo.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.15)`;
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const logo = item.querySelector('.skill-logo');
            if (logo) {
                logo.style.transform = 'translate(0, 0) scale(1)';
                logo.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseenter', () => {
            const logo = item.querySelector('.skill-logo');
            if (logo) {
                logo.style.transition = 'transform 0.1s ease';
            }
        });
    });
}

// ==================== INITIALIZE SKILLS ====================
function initSkills() {
    initSkillsHeaderReveal();
    initSkillItemsReveal();
    initSkillsCategoryReveal();
    // Optional effects - can be enabled/disabled
    // initSkillsFloating(); // Disabled by default - can be distracting
    initSkillsMagneticEffect();
}
