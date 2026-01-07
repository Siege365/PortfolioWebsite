/* ==========================================
   HERO SECTION SCRIPTS
   ========================================== */

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    // Check if touch device
    if ('ontouchstart' in window) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }
    
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    // Animate cursor with smooth lag
    function animateCursor() {
        // Dot follows faster
        dotX += (cursorX - dotX) * 0.3;
        dotY += (cursorY - dotY) * 0.3;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        // Outline follows slower for trail effect
        outlineX += (cursorX - outlineX) * 0.15;
        outlineY += (cursorY - outlineY) * 0.15;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .social-link, .social-icon-btn, .cta-button, .stat-card, .see-more-link, .project-button, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '0.5';
    });
}

// ==================== PARTICLE SYSTEM ====================
function initParticleSystem() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            const colors = [
                'rgba(99, 102, 241, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(255, 255, 255, 0.5)'
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        
        update() {
            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;
                
                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 20;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 20;
                    }
                }
            }
            
            this.baseX += this.speedX;
            this.baseY += this.speedY;
            
            if (this.baseX > canvas.width) this.baseX = 0;
            if (this.baseX < 0) this.baseX = canvas.width;
            if (this.baseY > canvas.height) this.baseY = 0;
            if (this.baseY < 0) this.baseY = canvas.height;
        }
    }
    
    function init() {
        particles = [];
        const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 100);
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }
    init();
    window.addEventListener('resize', init);
    
    function connect() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    let opacity = 1 - (distance / 120);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.draw();
            particle.update();
        });
        connect();
        requestAnimationFrame(animate);
    }
    animate();
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    const ctaButton = document.querySelector('.cta-button');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#projects') || document.querySelector('#about');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const target = document.querySelector('#about') || document.querySelector('#projects');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        scrollIndicator.style.cursor = 'pointer';
    }
}

// ==================== PARALLAX EFFECT ====================
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const decorCircles = document.querySelectorAll('.decor-circle');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero) return;
    
    window.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
        
        decorCircles.forEach((circle, index) => {
            const speed = (index + 1) * 20;
            const x = xPos * speed;
            const y = yPos * speed;
            circle.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        if (heroContent) {
            const contentX = xPos * 5;
            const contentY = yPos * 5;
            heroContent.style.transform = `translate(${contentX}px, ${contentY}px)`;
        }
    });
}

// ==================== 3D TEXT TILT ====================
function init3DTextTilt() {
    const heroName = document.querySelector('.hero-name');
    const heroContainer = document.querySelector('.hero-container');
    
    if (!heroName || !heroContainer) return;
    
    heroContainer.addEventListener('mousemove', (e) => {
        const rect = heroContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        heroName.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    heroContainer.addEventListener('mouseleave', () => {
        heroName.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        heroName.style.transition = 'transform 0.5s ease';
    });
    
    heroContainer.addEventListener('mouseenter', () => {
        heroName.style.transition = 'transform 0.1s ease';
    });
}

// ==================== INITIALIZE HERO ====================
function initHero() {
    initCustomCursor();
    initParticleSystem();
    initSmoothScroll();
    initParallaxEffect();
    init3DTextTilt();
}
