/* ==========================================
   NAVBAR & GLOBAL UI SCRIPTS
   ========================================== */

// ==================== PAGE LOADER ====================
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => loader.remove(), 500);
        }, 500); // Small delay to show loader
    });
    
    // Fallback: hide loader after 3 seconds max
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
        }
    }, 3000);
}

// ==================== NAVBAR SCROLL EFFECT ====================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Add scrolled class when scrolled past 100px
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Initial check
    updateNavbar();
}

// ==================== MOBILE MENU TOGGLE ====================
function initMobileMenu() {
    const toggle = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && 
            !menu.contains(e.target) && 
            !toggle.contains(e.target)) {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==================== SCROLL SPY (Active Link) ====================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function updateActiveLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial check
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ==================== THEME TOGGLE (Light/Dark Mode) ====================
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    
    // Check for saved preference, default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default is dark mode (no class), light mode adds 'light-mode' class
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else if (savedTheme === null && !prefersDark) {
        // Only switch to light if system prefers light AND no saved preference
        document.body.classList.add('light-mode');
    }
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Add a subtle transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;
    
    // Show/hide button based on scroll position
    function toggleButton() {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleButton);
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial check
    toggleButton();
}

// ==================== KEYBOARD NAVIGATION ====================
function initKeyboardNav() {
    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const menu = document.getElementById('navbar-menu');
            const toggle = document.getElementById('navbar-toggle');
            
            if (menu && menu.classList.contains('active')) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// ==================== EASTER EGG: KONAMI CODE ====================
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function triggerEasterEgg() {
    // Create confetti effect
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
    
    // Add confetti animation if not exists
    if (!document.querySelector('#confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show message
    if (typeof showToast === 'function') {
        showToast('🎉 You found the secret! Thanks for exploring!', 'success');
    } else {
        console.log('🎉 Konami Code activated! You found the Easter Egg!');
    }
}

// ==================== LOGO CLICK ANIMATION ====================
function initLogoAnimation() {
    const logos = document.querySelectorAll('.navbar-logo, .footer-logo');
    
    logos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            // Only animate if it's the same page
            if (this.getAttribute('href') === '#hero') {
                const dot = this.querySelector('.logo-dot');
                if (dot) {
                    dot.style.animation = 'none';
                    dot.offsetHeight; // Trigger reflow
                    dot.style.animation = 'logoClickPop 0.5s ease';
                }
            }
        });
    });
    
    // Add logo click animation if not exists
    if (!document.querySelector('#logo-click-style')) {
        const style = document.createElement('style');
        style.id = 'logo-click-style';
        style.textContent = `
            @keyframes logoClickPop {
                0% { transform: scale(1); }
                50% { transform: scale(2); background: var(--secondary); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== INITIALIZE NAVBAR ====================
function initNavbar() {
    initLoader();
    initNavbarScroll();
    initMobileMenu();
    initScrollSpy();
    initSmoothScroll();
    initThemeToggle();
    initBackToTop();
    initKeyboardNav();
    initLogoAnimation();
    initKonamiCode();
}

// Auto-init loader immediately (before DOMContentLoaded)
initLoader();
