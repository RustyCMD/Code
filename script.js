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

    // Initialize Guitar Builder
    initGuitarBuilder();
});

// Enhanced Guitar Builder Functionality
function initGuitarBuilder() {
    // Check if guitar builder exists on page
    const builderCard = document.querySelector('.guitar-builder-card');
    if (!builderCard) return;

    // Initialize state
    let currentStep = 1;
    let guitarConfig = {
        type: 'electric',
        shape: 'stratocaster',
        bodyWood: 'alder',
        neckWood: 'maple',
        strings: '6-standard',
        pickups: 'sss',
        hardware: 'chrome',
        bridge: 'tremolo',
        finish: 'gloss'
    };

    // Get DOM elements
    const progressFill = document.getElementById('progress-fill');
    const progressSteps = document.querySelectorAll('.progress-step');
    const controlSections = document.querySelectorAll('.control-section');
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    const guitarSvg = document.querySelector('.guitar-svg');
    const configSummary = document.getElementById('config-summary');

    // Enhanced guitar configurations
    const guitarConfigs = {
        electric: {
            shapes: [
                { value: 'stratocaster', name: 'Stratocaster', description: 'Versatile, contoured body' },
                { value: 'les-paul', name: 'Les Paul', description: 'Thick, sustaining tone' },
                { value: 'telecaster', name: 'Telecaster', description: 'Bright, cutting sound' },
                { value: 'sg', name: 'SG', description: 'Lightweight, aggressive' },
                { value: 'flying-v', name: 'Flying V', description: 'Iconic metal shape' }
            ],
            woods: [
                { value: 'alder', name: 'Alder', description: 'Balanced, clear tone', price: 0 },
                { value: 'mahogany', name: 'Mahogany', description: 'Warm, rich sustain', price: 200 },
                { value: 'ash', name: 'Ash', description: 'Bright, punchy attack', price: 150 },
                { value: 'maple', name: 'Maple', description: 'Bright, snappy response', price: 250 }
            ],
            basePrice: 1299,
            showPickups: true,
            showSoundHole: false,
            genres: ['Rock', 'Blues', 'Jazz', 'Metal', 'Pop']
        },
        acoustic: {
            shapes: [
                { value: 'dreadnought', name: 'Dreadnought', description: 'Powerful, booming bass' },
                { value: 'concert', name: 'Concert', description: 'Balanced, comfortable' },
                { value: 'jumbo', name: 'Jumbo', description: 'Maximum volume' },
                { value: 'parlor', name: 'Parlor', description: 'Intimate, focused tone' }
            ],
            woods: [
                { value: 'spruce', name: 'Spruce Top', description: 'Bright, clear projection', price: 0 },
                { value: 'cedar', name: 'Cedar Top', description: 'Warm, immediate response', price: 100 },
                { value: 'mahogany', name: 'Mahogany', description: 'Woody, compressed tone', price: 200 },
                { value: 'maple', name: 'Maple', description: 'Bright, articulate', price: 300 }
            ],
            basePrice: 899,
            showPickups: false,
            showSoundHole: true,
            genres: ['Folk', 'Country', 'Singer-Songwriter', 'Fingerstyle']
        },
        classical: {
            shapes: [
                { value: 'traditional', name: 'Traditional', description: 'Classic proportions' },
                { value: 'concert', name: 'Concert', description: 'Enhanced projection' },
                { value: 'flamenco', name: 'Flamenco', description: 'Percussive, bright' }
            ],
            woods: [
                { value: 'spruce', name: 'Spruce Top', description: 'Clear, powerful', price: 0 },
                { value: 'cedar', name: 'Cedar Top', description: 'Warm, responsive', price: 100 },
                { value: 'rosewood', name: 'Rosewood Back', description: 'Rich harmonics', price: 400 }
            ],
            basePrice: 699,
            showPickups: false,
            showSoundHole: true,
            genres: ['Classical', 'Flamenco', 'Bossa Nova', 'Fingerstyle']
        },
        bass: {
            shapes: [
                { value: 'precision', name: 'Precision', description: 'Punchy, defined tone' },
                { value: 'jazz', name: 'Jazz', description: 'Versatile, articulate' },
                { value: 'modern', name: 'Modern', description: 'Extended range ready' }
            ],
            woods: [
                { value: 'alder', name: 'Alder', description: 'Balanced low-end', price: 0 },
                { value: 'ash', name: 'Ash', description: 'Punchy attack', price: 150 },
                { value: 'mahogany', name: 'Mahogany', description: 'Warm, thick tone', price: 200 },
                { value: 'maple', name: 'Maple', description: 'Bright, clear', price: 250 }
            ],
            basePrice: 1599,
            showPickups: true,
            showSoundHole: false,
            genres: ['Rock', 'Jazz', 'Funk', 'Metal', 'Pop']
        }
    };

    // String configurations
    const stringConfigs = {
        '6-standard': { count: 6, name: '6-String Standard', tuning: 'E-A-D-G-B-E', price: 0 },
        '7-extended': { count: 7, name: '7-String Extended', tuning: 'B-E-A-D-G-B-E', price: 200 },
        '12-doubled': { count: 12, name: '12-String Doubled', tuning: 'Doubled Courses', price: 300 },
        'bass-4': { count: 4, name: '4-String Bass', tuning: 'E-A-D-G', price: 0 },
        'bass-5': { count: 5, name: '5-String Bass', tuning: 'B-E-A-D-G', price: 150 },
        'bass-6': { count: 6, name: '6-String Bass', tuning: 'B-E-A-D-G-C', price: 300 }
    };

    // Pickup configurations
    const pickupConfigs = {
        sss: { name: 'Single-Single-Single', description: 'Bright, clear tones with excellent note definition', price: 0, sound: ['Bright', 'Clear', 'Articulate'] },
        hss: { name: 'Humbucker-Single-Single', description: 'Versatile combination for rock and blues', price: 100, sound: ['Versatile', 'Punchy', 'Dynamic'] },
        hsh: { name: 'Humbucker-Single-Humbucker', description: 'Maximum tonal variety', price: 200, sound: ['Versatile', 'Powerful', 'Expressive'] },
        hh: { name: 'Humbucker-Humbucker', description: 'Thick, powerful tone for rock and metal', price: 150, sound: ['Thick', 'Powerful', 'Sustaining'] },
        p90: { name: 'P90 Pickups', description: 'Vintage tone with modern clarity', price: 120, sound: ['Vintage', 'Gritty', 'Characterful'] }
    };

    // Hardware options
    const hardwareOptions = {
        chrome: { name: 'Chrome', description: 'Classic, bright finish', price: 0 },
        gold: { name: 'Gold', description: 'Vintage, warm appearance', price: 200 },
        black: { name: 'Black', description: 'Modern, sleek look', price: 50 },
        vintage: { name: 'Vintage', description: 'Aged, authentic feel', price: 100 }
    };

    // Initialize the builder
    function initBuilder() {
        updateProgressBar();
        showCurrentStep();
        populateGuitarTypeSelector();
        updateGuitarVisual();
        updatePricing();
        setupEventListeners();
        setupTooltips();
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = (currentStep / 5) * 100;
        progressFill.style.width = `${progress}%`;

        progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');

            if (stepNumber < currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === currentStep) {
                step.classList.add('active');
            }
        });
    }

    // Show current step
    function showCurrentStep() {
        controlSections.forEach((section, index) => {
            const stepNumber = index + 1;
            section.style.display = stepNumber === currentStep ? 'block' : 'none';
        });

        // Update navigation buttons
        prevBtn.disabled = currentStep === 1;
        nextBtn.textContent = currentStep === 5 ? 'Complete' : 'Next →';

        // Show summary on final step
        if (currentStep === 5) {
            updateConfigSummary();
            configSummary.style.display = 'block';
        } else {
            configSummary.style.display = 'none';
        }
    }

    // Populate guitar type selector
    function populateGuitarTypeSelector() {
        const selector = document.getElementById('guitar-type-selector');
        if (!selector) return;

        selector.innerHTML = '';
        Object.keys(guitarConfigs).forEach(type => {
            const config = guitarConfigs[type];
            const option = document.createElement('div');
            option.className = `selector-option ${type === guitarConfig.type ? 'active' : ''}`;
            option.dataset.value = type;

            const typeIcons = {
                electric: '⚡',
                acoustic: '🎸',
                classical: '🎼',
                bass: '🎵'
            };

            const typeDescriptions = {
                electric: 'Amplified, versatile',
                acoustic: 'Natural, warm tone',
                classical: 'Nylon strings, gentle',
                bass: 'Deep, rhythmic foundation'
            };

            option.innerHTML = `
                <div class="option-image">${typeIcons[type]}</div>
                <div class="option-label">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="option-description">${typeDescriptions[type]}</div>
            `;

            option.addEventListener('click', () => {
                guitarConfig.type = type;
                updateGuitarTypeSelection();
                updateGenreRecommendations();
                updateGuitarVisual();
                updatePricing();
            });

            selector.appendChild(option);
        });
    }

    // Update guitar type selection
    function updateGuitarTypeSelection() {
        const options = document.querySelectorAll('#guitar-type-selector .selector-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.value === guitarConfig.type);
        });
    }

    // Update genre recommendations
    function updateGenreRecommendations() {
        const genreTags = document.getElementById('genre-tags');
        if (!genreTags) return;

        const genres = guitarConfigs[guitarConfig.type].genres;
        genreTags.innerHTML = genres.map(genre =>
            `<span class="genre-tag">${genre}</span>`
        ).join('');
    }

    // Populate body shape selector
    function populateBodyShapeSelector() {
        const selector = document.getElementById('body-shape-selector');
        if (!selector) return;

        const config = guitarConfigs[guitarConfig.type];
        selector.innerHTML = '';

        config.shapes.forEach(shape => {
            const option = document.createElement('div');
            option.className = `shape-option ${shape.value === guitarConfig.shape ? 'active' : ''}`;
            option.dataset.value = shape.value;
            option.dataset.shape = shape.name;
            option.title = shape.description;

            option.addEventListener('click', () => {
                guitarConfig.shape = shape.value;
                updateBodyShapeSelection();
                updateShapeInfo(shape);
                updateGuitarVisual();
                updatePricing();
            });

            selector.appendChild(option);
        });

        // Update shape info for current selection
        const currentShape = config.shapes.find(s => s.value === guitarConfig.shape);
        if (currentShape) updateShapeInfo(currentShape);
    }

    // Update body shape selection
    function updateBodyShapeSelection() {
        const options = document.querySelectorAll('#body-shape-selector .shape-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.value === guitarConfig.shape);
        });
    }

    // Update shape info
    function updateShapeInfo(shape) {
        const shapeFeatures = document.getElementById('shape-features');
        if (!shapeFeatures) return;

        const features = {
            stratocaster: ['Versatile tone suitable for many genres', 'Comfortable body contours', 'Classic design with modern playability'],
            'les-paul': ['Thick, sustaining tone', 'Solid mahogany construction', 'Iconic single-cutaway design'],
            telecaster: ['Bright, cutting sound', 'Simple, reliable design', 'Perfect for country and rock'],
            dreadnought: ['Powerful bass response', 'Excellent for strumming', 'Most popular acoustic shape'],
            concert: ['Balanced tone across frequencies', 'Comfortable size', 'Great for fingerpicking'],
            precision: ['Punchy, defined bass tone', 'Split-coil pickup design', 'Rock and pop standard']
        };

        const shapeFeaturesList = features[shape.value] || ['Excellent tonal characteristics', 'Professional construction', 'Versatile performance'];
        shapeFeatures.innerHTML = shapeFeaturesList.map(feature => `<li>${feature}</li>`).join('');
    }

    // Populate wood selector
    function populateWoodSelector() {
        const selector = document.getElementById('wood-selector');
        if (!selector) return;

        const config = guitarConfigs[guitarConfig.type];
        selector.innerHTML = '';

        config.woods.forEach(wood => {
            const option = document.createElement('div');
            option.className = `wood-option ${wood.value === guitarConfig.bodyWood ? 'active' : ''}`;
            option.dataset.value = wood.value;

            option.innerHTML = `
                <div class="wood-sample ${wood.value}"></div>
                <span>${wood.name}</span>
                <small>${wood.description}</small>
            `;

            option.addEventListener('click', () => {
                guitarConfig.bodyWood = wood.value;
                updateWoodSelection();
                updateToneDescription(wood);
                updateGuitarVisual();
                updatePricing();
            });

            selector.appendChild(option);
        });

        // Update tone description for current selection
        const currentWood = config.woods.find(w => w.value === guitarConfig.bodyWood);
        if (currentWood) updateToneDescription(currentWood);
    }

    // Update wood selection
    function updateWoodSelection() {
        const options = document.querySelectorAll('#wood-selector .wood-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.value === guitarConfig.bodyWood);
        });
    }

    // Update tone description
    function updateToneDescription(wood) {
        const toneBars = document.querySelectorAll('.tone-bar .fill');
        if (!toneBars.length) return;

        const toneCharacteristics = {
            alder: { brightness: 70, warmth: 60, sustain: 80 },
            mahogany: { brightness: 50, warmth: 90, sustain: 85 },
            ash: { brightness: 85, warmth: 50, sustain: 75 },
            maple: { brightness: 90, warmth: 40, sustain: 70 },
            spruce: { brightness: 80, warmth: 70, sustain: 85 },
            cedar: { brightness: 60, warmth: 85, sustain: 80 },
            rosewood: { brightness: 45, warmth: 95, sustain: 90 }
        };

        const characteristics = toneCharacteristics[wood.value] || { brightness: 70, warmth: 70, sustain: 70 };

        toneBars[0].style.width = `${characteristics.brightness}%`;
        toneBars[1].style.width = `${characteristics.warmth}%`;
        toneBars[2].style.width = `${characteristics.sustain}%`;
    }

    // Simplified guitar visual update
    function updateGuitarVisual() {
        const guitarSvg = document.querySelector('.guitar-svg');
        const electricBody = document.getElementById('electric-body');
        const acousticBody = document.getElementById('acoustic-body');
        const bassBody = document.getElementById('bass-body');
        const pickups = document.getElementById('pickups');
        const controls = document.getElementById('controls');
        const stringsGroup = document.getElementById('guitar-strings');

        if (!guitarSvg) return;

        // Hide all body types first
        if (electricBody) electricBody.style.display = 'none';
        if (acousticBody) acousticBody.style.display = 'none';
        if (bassBody) bassBody.style.display = 'none';

        // Show appropriate body type and components
        switch (guitarConfig.type) {
            case 'electric':
                if (electricBody) electricBody.style.display = 'block';
                if (pickups) pickups.style.display = 'block';
                if (controls) controls.style.display = 'block';
                break;
            case 'acoustic':
                if (acousticBody) acousticBody.style.display = 'block';
                if (pickups) pickups.style.display = 'none';
                if (controls) controls.style.display = 'none';
                break;
            case 'bass':
                if (bassBody) bassBody.style.display = 'block';
                if (pickups) pickups.style.display = 'block';
                if (controls) controls.style.display = 'block';
                break;
        }

        // Update colors and patterns
        updateSimpleColors();

        // Update string configuration
        updateSimpleStringConfiguration();

        // Add smooth transition animation
        if (guitarSvg) {
            guitarSvg.style.transform = 'scale(0.98)';
            setTimeout(() => {
                guitarSvg.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Simplified color updates
    function updateSimpleColors() {
        const woodColors = {
            'alder': '#DEB887',
            'mahogany': '#8B4513',
            'maple': '#FFEBCD',
            'ash': '#F5DEB3',
            'basswood': '#DEB887',
            'spruce': '#DEB887',
            'cedar': '#8B4513',
            'rosewood': '#654321'
        };

        const neckColors = {
            'maple': '#FFEBCD',
            'mahogany': '#8B4513',
            'rosewood': '#654321'
        };

        // Update body colors for all guitar types
        const bodyElements = [
            '#electric-body #guitar-body',
            '#acoustic-body ellipse',
            '#bass-body rect'
        ];

        bodyElements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute('fill', woodColors[guitarConfig.bodyWood] || woodColors.alder);
            }
        });

        // Update neck colors
        const neck = document.getElementById('guitar-neck');
        const headstock = document.getElementById('guitar-headstock');

        if (neck) {
            neck.setAttribute('fill', neckColors[guitarConfig.neckWood] || neckColors.maple);
        }
        if (headstock) {
            headstock.setAttribute('fill', neckColors[guitarConfig.neckWood] || neckColors.maple);
        }
    }

    // Simplified string configuration
    function updateSimpleStringConfiguration() {
        const stringsGroup = document.getElementById('guitar-strings');
        if (!stringsGroup) return;

        // Clear existing strings
        stringsGroup.innerHTML = '';

        const stringConfig = stringConfigs[guitarConfig.strings];
        if (!stringConfig) return;

        const stringCount = stringConfig.count;
        const startX = 110;
        const endX = 135;
        const spacing = stringCount > 1 ? (endX - startX) / (stringCount - 1) : 0;

        for (let i = 0; i < stringCount; i++) {
            const x = stringCount === 1 ? (startX + endX) / 2 : startX + (i * spacing);

            const string = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            string.setAttribute('x1', x);
            string.setAttribute('y1', '50');
            string.setAttribute('x2', x);
            string.setAttribute('y2', '500');
            string.setAttribute('stroke', '#e8e8e8');
            string.setAttribute('stroke-width', '1');
            string.setAttribute('opacity', '0.8');

            stringsGroup.appendChild(string);
        }
    }

    // Simplified hardware color update
    function updateHardwareColor() {
        const tuningPegs = document.querySelectorAll('#tuning-pegs circle');
        const bridge = document.querySelector('#bridge-group rect');
        const controls = document.querySelectorAll('#controls circle');

        const hardwareColors = {
            chrome: '#c0c0c0',
            gold: '#ffd700',
            black: '#2c2c2c',
            vintage: '#d4af37'
        };

        const color = hardwareColors[guitarConfig.hardware] || hardwareColors.chrome;

        tuningPegs.forEach(peg => peg.setAttribute('fill', color));
        if (bridge) bridge.setAttribute('fill', color);
        controls.forEach(control => control.setAttribute('fill', color));
    }

    // Update configuration summary
    function updateConfigSummary() {
        const summaryType = document.getElementById('summary-type');
        const summaryBody = document.getElementById('summary-body');
        const summaryWood = document.getElementById('summary-wood');
        const summaryStrings = document.getElementById('summary-strings');
        const finalPrice = document.getElementById('final-price');

        if (summaryType) summaryType.textContent = guitarConfig.type.charAt(0).toUpperCase() + guitarConfig.type.slice(1) + ' Guitar';
        if (summaryBody) summaryBody.textContent = guitarConfig.shape.charAt(0).toUpperCase() + guitarConfig.shape.slice(1).replace('-', ' ');
        if (summaryWood) summaryWood.textContent = guitarConfig.bodyWood.charAt(0).toUpperCase() + guitarConfig.bodyWood.slice(1);
        if (summaryStrings) summaryStrings.textContent = stringConfigs[guitarConfig.strings]?.name || '6-String';
        if (finalPrice) finalPrice.textContent = calculatePrice();
    }

    // Enhanced pricing calculation
    function calculatePrice() {
        const config = guitarConfigs[guitarConfig.type];
        let price = config.basePrice;

        // Add wood price
        const wood = config.woods.find(w => w.value === guitarConfig.bodyWood);
        if (wood) price += wood.price;

        // Add string configuration price
        const strings = stringConfigs[guitarConfig.strings];
        if (strings) price += strings.price;

        // Add pickup price (if applicable)
        if (config.showPickups && pickupConfigs[guitarConfig.pickups]) {
            price += pickupConfigs[guitarConfig.pickups].price;
        }

        // Add hardware price
        if (hardwareOptions[guitarConfig.hardware]) {
            price += hardwareOptions[guitarConfig.hardware].price;
        }

        return `$${price.toLocaleString()}`;
    }

    // Update pricing display
    function updatePricing() {
        const priceAmount = document.getElementById('price-amount');
        if (priceAmount) {
            priceAmount.textContent = calculatePrice();

            // Add price animation
            priceAmount.style.transform = 'scale(1.1)';
            setTimeout(() => {
                priceAmount.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // Step navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateProgressBar();
                    showCurrentStep();

                    // Populate content for the step we're going to
                    if (currentStep === 2) populateBodyShapeSelector();
                    if (currentStep === 3) populateWoodSelector();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentStep < 5) {
                    currentStep++;
                    updateProgressBar();
                    showCurrentStep();

                    // Populate content for the step we're going to
                    if (currentStep === 2) populateBodyShapeSelector();
                    if (currentStep === 3) populateWoodSelector();
                    if (currentStep === 4) populateElectronicsSelector();
                    if (currentStep === 5) populateHardwareSelector();
                } else {
                    // Complete configuration
                    completeConfiguration();
                }
            });
        }

        // View controls
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const view = btn.dataset.view;
                updateGuitarView(view);
            });
        });

        // Rotation controls
        const rotateBtns = document.querySelectorAll('.rotate-btn');
        rotateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const direction = btn.dataset.rotation;
                rotateGuitar(direction);
            });
        });

        // Enhanced action buttons
        setupActionButtons();
    }

    // Setup action buttons
    function setupActionButtons() {
        const resetBtn = document.getElementById('reset-builder');
        const saveBtn = document.getElementById('save-config');
        const quoteBtn = document.getElementById('get-quote');
        const compareBtn = document.getElementById('compare-configs');
        const shareBtn = document.getElementById('share-config');
        const downloadBtn = document.getElementById('download-specs');

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                resetConfiguration();
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                saveConfiguration();
            });
        }

        if (quoteBtn) {
            quoteBtn.addEventListener('click', () => {
                requestQuote();
            });
        }

        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                showComparison();
            });
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                shareConfiguration();
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                downloadSpecs();
            });
        }
    }

    // Guitar view and rotation functions
    function updateGuitarView(view) {
        const container = document.getElementById('guitar-container');
        if (!container) return;

        const transforms = {
            front: 'rotateY(0deg)',
            back: 'rotateY(180deg)',
            side: 'rotateY(90deg)'
        };

        container.style.transform = transforms[view] || transforms.front;
    }

    function rotateGuitar(direction) {
        const container = document.getElementById('guitar-container');
        if (!container) return;

        const currentTransform = container.style.transform || 'rotateY(0deg)';
        const currentRotation = parseInt(currentTransform.match(/rotateY\((-?\d+)deg\)/)?.[1] || '0');
        const newRotation = direction === 'left' ? currentRotation - 15 : currentRotation + 15;

        container.style.transform = `rotateY(${newRotation}deg)`;
    }

    // Setup tooltips
    function setupTooltips() {
        const helpBtns = document.querySelectorAll('.help-btn');
        const tooltip = document.getElementById('tooltip');

        helpBtns.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const tooltipText = btn.dataset.tooltip;
                if (tooltipText && tooltip) {
                    tooltip.querySelector('.tooltip-content').textContent = tooltipText;
                    tooltip.classList.add('show');

                    const rect = btn.getBoundingClientRect();
                    tooltip.style.left = `${rect.left + rect.width / 2}px`;
                    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
                }
            });

            btn.addEventListener('mouseleave', () => {
                if (tooltip) {
                    tooltip.classList.remove('show');
                }
            });
        });
    }

    // Advanced action functions
    function resetConfiguration() {
        guitarConfig = {
            type: 'electric',
            shape: 'stratocaster',
            bodyWood: 'alder',
            neckWood: 'maple',
            strings: '6-standard',
            pickups: 'sss',
            hardware: 'chrome',
            bridge: 'tremolo',
            finish: 'gloss'
        };

        currentStep = 1;
        updateProgressBar();
        showCurrentStep();
        populateGuitarTypeSelector();
        updateGuitarVisual();
        updatePricing();

        showNotification('Guitar configuration reset to default', 'info');
    }

    function saveConfiguration() {
        const configs = JSON.parse(localStorage.getItem('savedGuitarConfigs') || '[]');
        const newConfig = {
            ...guitarConfig,
            id: Date.now(),
            name: `Custom ${guitarConfig.type} ${Date.now()}`,
            timestamp: new Date().toISOString(),
            price: calculatePrice()
        };

        configs.push(newConfig);
        localStorage.setItem('savedGuitarConfigs', JSON.stringify(configs));

        showNotification('Guitar configuration saved successfully!', 'success');
    }

    function requestQuote() {
        const price = calculatePrice();
        const configName = `${guitarConfig.type.charAt(0).toUpperCase() + guitarConfig.type.slice(1)} Guitar`;

        showNotification(
            `Quote requested for ${configName} - ${price}. We'll contact you soon!`,
            'success'
        );

        // Simulate haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    }

    function showComparison() {
        const comparisonPanel = document.getElementById('comparison-panel');
        const configs = JSON.parse(localStorage.getItem('savedGuitarConfigs') || '[]');

        if (configs.length === 0) {
            showNotification('No saved configurations to compare', 'info');
            return;
        }

        if (comparisonPanel) {
            comparisonPanel.style.display = 'block';
            populateComparison(configs);
        }
    }

    function shareConfiguration() {
        const configUrl = generateConfigUrl();

        if (navigator.share) {
            navigator.share({
                title: 'My Custom Guitar Configuration',
                text: `Check out my custom ${guitarConfig.type} guitar configuration!`,
                url: configUrl
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(configUrl).then(() => {
                showNotification('Configuration link copied to clipboard!', 'success');
            });
        }
    }

    function downloadSpecs() {
        const specs = generateSpecSheet();
        const blob = new Blob([specs], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `guitar-specs-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showNotification('Specification sheet downloaded!', 'success');
    }

    function generateConfigUrl() {
        const params = new URLSearchParams(guitarConfig);
        return `${window.location.origin}${window.location.pathname}?config=${btoa(JSON.stringify(guitarConfig))}`;
    }

    function generateSpecSheet() {
        return `
CUSTOM GUITAR SPECIFICATION SHEET
Generated: ${new Date().toLocaleDateString()}

Guitar Type: ${guitarConfig.type.charAt(0).toUpperCase() + guitarConfig.type.slice(1)}
Body Shape: ${guitarConfig.shape.charAt(0).toUpperCase() + guitarConfig.shape.slice(1).replace('-', ' ')}
Body Wood: ${guitarConfig.bodyWood.charAt(0).toUpperCase() + guitarConfig.bodyWood.slice(1)}
Neck Wood: ${guitarConfig.neckWood.charAt(0).toUpperCase() + guitarConfig.neckWood.slice(1)}
String Configuration: ${stringConfigs[guitarConfig.strings]?.name || 'Standard'}
${guitarConfigs[guitarConfig.type].showPickups ? `Pickup Configuration: ${pickupConfigs[guitarConfig.pickups]?.name || 'Standard'}` : ''}
Hardware Finish: ${guitarConfig.hardware.charAt(0).toUpperCase() + guitarConfig.hardware.slice(1)}
Bridge Type: ${guitarConfig.bridge.charAt(0).toUpperCase() + guitarConfig.bridge.slice(1)}
Body Finish: ${guitarConfig.finish.charAt(0).toUpperCase() + guitarConfig.finish.slice(1)}

Estimated Price: ${calculatePrice()}

This specification sheet was generated by the Guitar Builder tool.
        `.trim();
    }

    function completeConfiguration() {
        showNotification('Guitar configuration completed! Ready for quote.', 'success');

        // Simulate haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    // Populate electronics selector (Step 4)
    function populateElectronicsSelector() {
        populateStringSelector();
        if (guitarConfigs[guitarConfig.type].showPickups) {
            populatePickupSelector();
        }
    }

    function populateStringSelector() {
        const selector = document.getElementById('string-selector');
        if (!selector) return;

        selector.innerHTML = '';
        const availableStrings = guitarConfig.type === 'bass'
            ? ['bass-4', 'bass-5', 'bass-6']
            : ['6-standard', '7-extended', '12-doubled'];

        availableStrings.forEach(stringType => {
            const config = stringConfigs[stringType];
            const option = document.createElement('div');
            option.className = `string-option ${stringType === guitarConfig.strings ? 'active' : ''}`;
            option.dataset.value = stringType;

            option.innerHTML = `
                <span class="string-name">${config.name}</span>
                <span class="string-tuning">${config.tuning}</span>
                ${config.price > 0 ? `<span class="string-price">+$${config.price}</span>` : ''}
            `;

            option.addEventListener('click', () => {
                guitarConfig.strings = stringType;
                updateStringSelection();
                updateTuningDisplay();
                updateGuitarVisual();
                updatePricing();
            });

            selector.appendChild(option);
        });

        updateTuningDisplay();
    }

    function updateStringSelection() {
        const options = document.querySelectorAll('#string-selector .string-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.value === guitarConfig.strings);
        });
    }

    function updateTuningDisplay() {
        const tuningDisplay = document.getElementById('tuning-display');
        if (!tuningDisplay) return;

        const config = stringConfigs[guitarConfig.strings];
        if (config) {
            tuningDisplay.querySelector('.tuning-notes').textContent = config.tuning;
        }
    }

    function populatePickupSelector() {
        const selector = document.getElementById('pickup-selector');
        if (!selector) return;

        selector.innerHTML = '';
        Object.keys(pickupConfigs).forEach(pickupType => {
            const config = pickupConfigs[pickupType];
            const option = document.createElement('div');
            option.className = `pickup-option ${pickupType === guitarConfig.pickups ? 'active' : ''}`;
            option.dataset.value = pickupType;

            option.innerHTML = `
                <span class="pickup-name">${config.name}</span>
                <span class="pickup-desc">${config.description}</span>
                ${config.price > 0 ? `<span class="pickup-price">+$${config.price}</span>` : ''}
            `;

            option.addEventListener('click', () => {
                guitarConfig.pickups = pickupType;
                updatePickupSelection();
                updateSoundTags(config.sound);
                updateGuitarVisual();
                updatePricing();
            });

            selector.appendChild(option);
        });

        // Update sound tags for current selection
        const currentPickup = pickupConfigs[guitarConfig.pickups];
        if (currentPickup) updateSoundTags(currentPickup.sound);
    }

    function updatePickupSelection() {
        const options = document.querySelectorAll('#pickup-selector .pickup-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.value === guitarConfig.pickups);
        });
    }

    function updateSoundTags(soundCharacteristics) {
        const soundTags = document.getElementById('sound-tags');
        if (!soundTags || !soundCharacteristics) return;

        soundTags.innerHTML = soundCharacteristics.map(tag =>
            `<span class="sound-tag">${tag}</span>`
        ).join('');
    }

    // Populate hardware selector (Step 5)
    function populateHardwareSelector() {
        const selector = document.getElementById('hardware-selector');
        if (!selector) return;

        // Hardware options are already in HTML, just add event listeners
        const options = selector.querySelectorAll('.hardware-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.dataset.value;
                guitarConfig.hardware = value;
                updateHardwareSelection();
                updateGuitarVisual();
                updatePricing();
            });
        });
    }

    function updateHardwareSelection() {
        const options = document.querySelectorAll('#hardware-selector .hardware-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.value === guitarConfig.hardware);
        });
    }

    // Initialize the enhanced guitar builder
    initBuilder();
}
