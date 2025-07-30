// Enhanced smooth scrolling for navigation links with better error handling
function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#" or empty
            if (!href || href === '#') {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            const target = document.querySelector(href);
            if (target) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    closeMobileNav();
                }
            }
        });
    });
}

// Helper function to close mobile navigation
function closeMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (navToggle && navLinks && navOverlay) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

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

// Enhanced Mobile Navigation Functionality
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    if (!navToggle || !navLinks || !navOverlay) {
        console.warn('Mobile navigation elements not found');
        return;
    }

    function toggleNav(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

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

        // Focus first nav link with delay for animation
        const firstLink = navLinks.querySelector('a');
        if (firstLink) {
            setTimeout(() => {
                firstLink.focus();
            }, 350);
        }
    }

    function closeNav() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');

        // Return focus to toggle button
        setTimeout(() => {
            navToggle.focus();
        }, 100);
    }

    // Improved event listeners with better error handling
    navToggle.addEventListener('click', toggleNav);
    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleNav();
        }
    });

    navOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeNav();
    });

    // Close nav when clicking on nav links with improved handling
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href')) {
            // Small delay to allow link navigation to start
            setTimeout(() => {
                closeNav();
            }, 100);
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            e.preventDefault();
            closeNav();
        }
    });

    // Close nav on window resize if open
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeNav();
            }
        }, 100);
    });

    // Expose closeNav function globally for use by other functions
    window.closeMobileNav = closeNav;
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Hide page transition if it exists
    hidePageTransition();

    // Initialize smooth scrolling
    initSmoothScrolling();

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

    // Add comprehensive navigation debugging and validation
    function validateNavigation() {
        const issues = [];

        // Check if all navigation elements exist
        const logo = document.querySelector('.logo');
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navOverlay = document.querySelector('.nav-overlay');

        if (!logo) issues.push('Logo element not found');
        if (!navToggle) issues.push('Nav toggle button not found');
        if (!navLinks) issues.push('Nav links container not found');
        if (!navOverlay) issues.push('Nav overlay not found');

        // Check if navigation links are properly structured
        const links = document.querySelectorAll('.nav-links a');
        if (links.length === 0) {
            issues.push('No navigation links found');
        }

        // Check for proper z-index stacking
        const header = document.querySelector('header');
        if (header) {
            const headerStyle = window.getComputedStyle(header);
            if (parseInt(headerStyle.zIndex) < 1000) {
                issues.push('Header z-index may be too low');
            }
        }

        if (issues.length > 0) {
            console.warn('Navigation validation issues found:', issues);
        } else {
            console.log('Navigation validation passed');
        }

        return issues.length === 0;
    }

    // Run validation
    validateNavigation();

    // Add click debugging for navigation elements
    const navElements = document.querySelectorAll('.nav-links a, .logo, .nav-toggle');
    navElements.forEach(element => {
        element.addEventListener('click', function(e) {
            console.log('Navigation element clicked:', this.textContent || this.className);

            // Check if the element is properly positioned and visible
            const rect = this.getBoundingClientRect();
            const isVisible = rect.width > 0 && rect.height > 0;
            const isInViewport = rect.top >= 0 && rect.left >= 0 &&
                               rect.bottom <= window.innerHeight &&
                               rect.right <= window.innerWidth;

            if (!isVisible) {
                console.warn('Clicked element is not visible:', this);
            }
            if (!isInViewport) {
                console.warn('Clicked element is outside viewport:', this);
            }
        });
    });

    // Ensure all navigation links are properly clickable
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        // Add touch event support for better mobile interaction
        link.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
        });

        link.addEventListener('touchend', function(e) {
            this.classList.remove('touch-active');
        });

        // Ensure proper focus handling
        link.addEventListener('focus', function() {
            this.setAttribute('data-focused', 'true');
        });

        link.addEventListener('blur', function() {
            this.removeAttribute('data-focused');
        });
    });
});
