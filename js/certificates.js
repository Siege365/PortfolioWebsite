/* ==========================================
   CERTIFICATES SECTION SCRIPTS
   ========================================== */

// ==================== SCROLL REVEAL ====================
function initCertificatesReveal() {
    const revealElements = document.querySelectorAll('.certificates .reveal');
    
    if (revealElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.2,
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
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ==================== CERTIFICATE CARD HOVER EFFECTS ====================
function initCertificateHoverEffects() {
    const cards = document.querySelectorAll('.certificate-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle pulse to icon
            const icon = card.querySelector('.certificate-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.certificate-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// ==================== CERTIFICATE MODAL HANDLER ====================
function initCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    const certificateIcons = document.querySelectorAll('.certificate-icon');
    const closeButton = document.querySelector('.certificate-modal-close');
    
    if (!modal) return;
    
    // Open modal when clicking certificate icon
    certificateIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const image = icon.dataset.image;
            const name = icon.dataset.name;
            const issuer = icon.dataset.issuer;
            const date = icon.dataset.date;
            
            // Populate modal content
            document.getElementById('certificate-image').src = image;
            document.getElementById('certificate-modal-name').textContent = name;
            document.getElementById('certificate-modal-issuer').textContent = issuer;
            document.getElementById('certificate-modal-date').textContent = date;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking close button
    closeButton?.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside (backdrop)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ==================== INITIALIZE CERTIFICATES SECTION ====================
function initCertificates() {
    initCertificatesReveal();
    initCertificateHoverEffects();
    initCertificateModal();
}