// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("zekTxWf_CyWqFx80g"); // Replace with your EmailJS Public Key
})();

// Smooth Scrolling with Animation Trigger
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 600);

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        
        const targetHeader = targetSection.querySelector('h2');
        if (targetHeader) {
            targetHeader.classList.add('glow-bounce');
            setTimeout(() => targetHeader.classList.remove('glow-bounce'), 800);
        }

        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        if (window.innerWidth <= 767) {
            document.querySelector('.hamburger').setAttribute('aria-expanded', 'false');
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Pop-In Animation on Scroll
const sections = document.querySelectorAll('.animate-pop');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    if (section.classList.contains('animate-pop')) {
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    }
});

// Hamburger Menu with Accessibility
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Back to Top
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Form Validation and EmailJS Integration
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error states
        document.querySelectorAll('.form-error').forEach(el => {
            el.style.display = 'none';
        });
        
        let valid = true;
        
        // Name validation
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            document.getElementById('name-error').style.display = 'block';
            valid = false;
        }
        
        // Email validation
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            document.getElementById('email-error').style.display = 'block';
            valid = false;
        }
        
        // Subject validation
        const subjectInput = document.getElementById('subject');
        if (!subjectInput.value.trim()) {
            document.getElementById('subject-error').style.display = 'block';
            valid = false;
        }
        
        // Message validation
        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) {
            document.getElementById('message-error').style.display = 'block';
            valid = false;
        }
        
        if (valid) {
            // Show loading indicator
            document.getElementById('form-loading').style.display = 'inline-block';
            
            // Send form data using EmailJS
            emailjs.sendForm('service_hsvjwbp', 'template_sfs6apc', this)
                .then(function() {
                    // Success handling
                    document.getElementById('form-loading').style.display = 'none';
                    document.getElementById('form-success').style.display = 'block';
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        document.getElementById('form-success').style.display = 'none';
                    }, 5000);
                }, function(error) {
                    // Error handling
                    document.getElementById('form-loading').style.display = 'none';
                    alert('Failed to send message. Error: ' + JSON.stringify(error));
                });
        }
    });
}

// Image error handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.onerror = null;
        this.parentElement.classList.add('img-fallback');
        this.style.display = 'none';
    });
});

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.querySelectorAll('.animate-pop').forEach(el => {
        el.style.animation = 'none';
    });
    document.querySelectorAll('.particle').forEach(el => {
        el.style.animation = 'none';
    });
}
// Email Copy Functionality with Popup
function setupEmailCopy() {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'copy-popup';
    popup.innerHTML = '<div class="copy-popup-content"><i class="fas fa-check"></i> Email copied!</div>';
    document.body.appendChild(popup);
    
    // Setup click handlers for all email copy elements
    document.querySelectorAll('.copy-email, .copy-email-link').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('data-email');
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show popup
                popup.classList.add('show-popup');
                
                // Hide popup after 2 seconds
                setTimeout(() => {
                    popup.classList.remove('show-popup');
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy email. Please try again.');
            });
        });
    });
}

// Initialize email copy functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', setupEmailCopy);