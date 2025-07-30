// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced modal functions with animations
function openModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Add focus trap
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (firstElement) firstElement.focus();

        // Handle tab key for focus trap
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

function closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Enhanced modal event handling
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Handle escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Enhanced contact button with better UX
function showAlert() {
    // Create a custom notification instead of browser alert
    showNotification('Thanks for your interest! This is a demo template.', 'success');
}

// Custom notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                border-left: 4px solid var(--success-color);
                max-width: 400px;
            }
            .notification-success { border-left-color: var(--success-color); }
            .notification-error { border-left-color: var(--error-color); }
            .notification-warning { border-left-color: var(--warning-color); }
            .notification-content {
                padding: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }
            .notification-message {
                color: var(--gray-800);
                font-weight: 500;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: var(--gray-400);
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s;
            }
            .notification-close:hover {
                background: var(--gray-100);
                color: var(--gray-600);
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced scroll effect for header
let lastScrollY = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const currentScrollY = window.scrollY;

    // Add scrolled class for styling
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
});

// Enhanced intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Page transition functionality
function createPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(transition);
    return transition;
}

function showPageTransition() {
    const transition = document.querySelector('.page-transition') || createPageTransition();
    transition.classList.add('active');
    return transition;
}

function hidePageTransition() {
    const transition = document.querySelector('.page-transition');
    if (transition) {
        transition.classList.remove('active');
        setTimeout(() => transition.remove(), 300);
    }
}

// Enhanced navigation with page transitions
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href]');
    if (link && link.href && !link.href.startsWith('#') && !link.href.startsWith('javascript:')) {
        const isExternal = link.hostname !== window.location.hostname;
        const isSamePage = link.href === window.location.href;

        if (!isExternal && !isSamePage) {
            e.preventDefault();
            const transition = showPageTransition();

            setTimeout(() => {
                window.location.href = link.href;
            }, 150);
        }
    }
});

// Mobile Navigation Functionality
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    if (!navToggle || !navLinks || !navOverlay) return;

    function toggleNav() {
        const isOpen = navToggle.classList.contains('active');

        if (isOpen) {
            closeNav();
        } else {
            openNav();
        }
    }

    function openNav() {
        navToggle.classList.add('active');
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        body.style.overflow = 'hidden';
        navToggle.setAttribute('aria-expanded', 'true');

        // Focus first nav link
        const firstLink = navLinks.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 300);
        }
    }

    function closeNav() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
    }

    // Event listeners
    navToggle.addEventListener('click', toggleNav);
    navOverlay.addEventListener('click', closeNav);

    // Close nav when clicking on nav links
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            closeNav();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeNav();
        }
    });

    // Close nav on window resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeNav();
        }
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Hide page transition if it exists
    hidePageTransition();

    // Initialize mobile navigation
    initMobileNavigation();

    // Set up scroll animations
    const animatedElements = document.querySelectorAll('.feature, .section h2, .section p');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // Enhance form elements if they exist
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Add keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Skip to main content with Alt+M
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const main = document.querySelector('main');
            if (main) {
                main.focus();
                main.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Additional scroll-based animations can go here
        }, 10);
    });
});
