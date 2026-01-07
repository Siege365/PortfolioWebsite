/* ==========================================
   CONTACT SECTION SCRIPTS
   ========================================== */

// ==================== EMAILJS CONFIGURATION ====================
// IMPORTANT: Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'lUuZQ4Dgc_GsQ0X8V'; // Get from EmailJS dashboard
const EMAILJS_SERVICE_ID = 'service_5kwapde'; // e.g., 'service_gmail'
const EMAILJS_TEMPLATE_ID = 'template_y84no49'; // e.g., 'template_contact'

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
}

// ==================== TOAST NOTIFICATION SYSTEM ====================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Icon based on type
    let iconSvg = '';
    switch(type) {
        case 'success':
            iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
            break;
        case 'error':
            iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
            break;
        default:
            iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }
    
    toast.innerHTML = `
        <span class="toast-icon">${iconSvg}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close notification">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        dismissToast(toast);
    });
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        dismissToast(toast);
    }, 5000);
}

function dismissToast(toast) {
    if (!toast || toast.classList.contains('hide')) return;
    
    toast.classList.add('hide');
    setTimeout(() => {
        toast.remove();
    }, 300);
}

// ==================== EMAIL VALIDATION ====================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== RATE LIMITING ====================
const RATE_LIMIT_KEY = 'portfolio_last_submit';
const COOLDOWN_MINUTES = 1; // 1 minute cooldown
const COOLDOWN_MS = COOLDOWN_MINUTES * 60 * 1000;

function checkRateLimit() {
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    
    if (!lastSubmit) return { allowed: true };
    
    const lastSubmitTime = parseInt(lastSubmit);
    const now = Date.now();
    const timePassed = now - lastSubmitTime;
    
    if (timePassed < COOLDOWN_MS) {
        const remainingSeconds = Math.ceil((COOLDOWN_MS - timePassed) / 1000);
        return {
            allowed: false,
            remainingSeconds,
            message: `Please wait ${remainingSeconds} seconds before submitting again.`
        };
    }
    
    return { allowed: true };
}

function setRateLimit() {
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
}

// ==================== FORM VALIDATION ====================
function validateField(input) {
    const inputGroup = input.closest('.input-group');
    const value = input.value.trim();
    
    inputGroup.classList.remove('error', 'success');
    
    if (!value) {
        inputGroup.classList.add('error');
        return false;
    }
    
    if (input.type === 'email' && !isValidEmail(value)) {
        inputGroup.classList.add('error');
        return false;
    }
    
    inputGroup.classList.add('success');
    return true;
}

// ==================== FORM SUBMISSION HANDLER ====================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const submitBtn = form.querySelector('.submit-button');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation on blur
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                validateField(input);
            }
        });
        
        // Remove error state on input
        input.addEventListener('input', () => {
            const inputGroup = input.closest('.input-group');
            if (inputGroup.classList.contains('error')) {
                inputGroup.classList.remove('error');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check rate limit first
        const rateLimitCheck = checkRateLimit();
        if (!rateLimitCheck.allowed) {
            showToast(`⏱️ ${rateLimitCheck.message}`, 'error');
            return;
        }
        
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Validate all fields
        let isValid = true;
        
        if (!name) {
            validateField(nameInput);
            isValid = false;
        }
        
        if (!email) {
            validateField(emailInput);
            isValid = false;
        } else if (!isValidEmail(email)) {
            validateField(emailInput);
            showToast('Please enter a valid email address', 'error');
            isValid = false;
        }
        
        if (!message) {
            validateField(messageInput);
            isValid = false;
        }
        
        if (!isValid) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Send email using EmailJS
            const result = await sendEmailWithEmailJS(name, email, message);
            
            // Set rate limit after successful send
            setRateLimit();
            
            // Success message based on method used
            if (result.method === 'mailto') {
                showToast('Opening your email client...', 'success');
            } else {
                showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            }
            
            // Reset form
            form.reset();
            inputs.forEach(input => {
                input.closest('.input-group').classList.remove('success', 'error');
            });
            
            // Re-focus on page to restore cursor
            document.body.focus();
            
        } catch (error) {
            showToast('Failed to send message. Please email me directly at nkmerka.work@gmail.com', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Send email using EmailJS
function sendEmailWithEmailJS(name, email, message) {
    return new Promise((resolve, reject) => {
        // Check if EmailJS is loaded and configured
        if (typeof emailjs === 'undefined') {
            reject(new Error('EmailJS not loaded'));
            return;
        }
        
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            // Fallback to mailto if not configured
            console.warn('EmailJS not configured. Using mailto fallback.');
            const recipientEmail = 'nkmerka.work@gmail.com';
            const subject = encodeURIComponent(`Portfolio Contact: Message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
            resolve({ success: true, method: 'mailto' });
            return;
        }
        
        // Send via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            name: name,
            message: message,
            title: 'Portfolio Contact Form',
            reply_to: email
        })
        .then((response) => {
            console.log('Email sent successfully:', response);
            resolve({ success: true, method: 'emailjs' });
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            reject(error);
        });
    });
}

// ==================== SCROLL REVEAL ====================
function initContactReveal() {
    const revealElements = document.querySelectorAll('.contact .reveal');
    
    if (revealElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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
    
    // Fallback: If elements are already in viewport, reveal them immediately
    setTimeout(() => {
        revealElements.forEach(element => {
            if (!element.classList.contains('revealed')) {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    element.classList.add('revealed');
                }
            }
        });
    }, 100);
}

// ==================== INPUT ANIMATION ENHANCEMENT ====================
function initInputAnimations() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    inputs.forEach(input => {
        // Add active class to parent on focus
        input.addEventListener('focus', () => {
            input.closest('.input-group').classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.closest('.input-group').classList.remove('focused');
        });
    });
}

// ==================== SOCIAL LINK RIPPLE EFFECT ====================
function initSocialRipple() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out;
            `;
            
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple keyframes if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: translate(-50%, -50%) scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== INITIALIZE CONTACT ====================
function initContact() {
    initEmailJS();
    initContactReveal();
    initContactForm();
}