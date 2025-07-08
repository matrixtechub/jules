// Main JavaScript file for Haven Woodworks
console.log("Haven Woodworks JS Loaded");

class Carousel {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.error(`Carousel container ${containerSelector} not found.`);
            return;
        }

        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.prevButton = this.container.querySelector('.carousel-button.prev');
        this.nextButton = this.container.querySelector('.carousel-button.next');
        this.dotsContainer = this.container.querySelector('.carousel-dots');

        if (this.slides.length === 0) {
            console.warn("No slides found in the carousel.");
            return;
        }

        this.currentIndex = 0;
        this.slideInterval = null;
        this.autoRotateTime = 5000; // 5 seconds

        this.init();
    }

    init() {
        this.createDots();
        this.updateCarousel();
        this.startAutoRotate();

        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());

        this.dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-dot')) {
                const dotIndex = parseInt(e.target.dataset.slideTo);
                this.goToSlide(dotIndex);
            }
        });

        this.container.addEventListener('mouseenter', () => this.stopAutoRotate());
        this.container.addEventListener('mouseleave', () => this.startAutoRotate());

        // Keyboard navigation
        this.container.setAttribute('tabindex', '0'); // Make container focusable
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.dataset.slideTo = index;
            this.dotsContainer.appendChild(dot);
        });
    }

    updateCarousel() {
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            // const caption = slide.querySelector('.carousel-caption'); // No longer needed
            // if (caption) { // No longer needed
            //     caption.classList.remove('caption-animate-in'); // No longer needed
            // } // No longer needed

            if (index === this.currentIndex) {
                slide.classList.add('active');
                // Animation logic for caption removed
                // if (caption) { // No longer needed
                    // setTimeout(() => caption.classList.add('caption-animate-in'), 50); // No longer needed
                // } // No longer needed
            }
        });

        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === this.currentIndex) {
                dot.classList.add('active');
            }
        });
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
        this.resetAutoRotate();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
        this.resetAutoRotate();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoRotate();
    }

    startAutoRotate() {
        this.stopAutoRotate(); // Clear existing interval before starting a new one
        this.slideInterval = setInterval(() => this.nextSlide(), this.autoRotateTime);
    }

    stopAutoRotate() {
        clearInterval(this.slideInterval);
    }

    resetAutoRotate() {
        this.stopAutoRotate();
        this.startAutoRotate();
    }
}

// Dark Mode Toggle function removed.

// Scroll-triggered Animations
function initializeScrollAnimations() {
    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');

    if (!sectionsToAnimate.length) {
        console.warn('No sections found for scroll animation.');
        return;
    }

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of item is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    sectionsToAnimate.forEach(section => {
        intersectionObserver.observe(section);
    });
}

// Back to Top Button
function initializeBackToTopButton() {
    const backToTopButton = document.getElementById('backToTopBtn');

    if (!backToTopButton) {
        // This button is on all pages, so it should ideally be found.
        // console.warn('Back to Top button not found on this page.'); // Less critical if not found on some pages
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show after 300px of scroll
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero carousel only if the hero section exists on the page
    if (document.getElementById('hero')) {
        const heroCarousel = new Carousel('.carousel-container');
    }

    // Initialize gallery filter only if gallery exists
    if (document.getElementById('gallery')) {
        initializeProductGalleryFilter();
    }

    // Initialize contact form only if it exists
    if (document.getElementById('contact-form')) {
        initializeContactForm();
    }

    // These are common to all pages
    initializeMobileMenu();
    // initializeDarkModeToggle(); // Call removed
    initializeScrollAnimations(); // Assumes .fade-in-section might be on any page
    initializeBackToTopButton(); // Button is on all pages
});

// Product Gallery Filtering
function initializeProductGalleryFilter() {
    const filterButtonsContainer = document.querySelector('.filter-buttons');
    const galleryItems = document.querySelectorAll('.product-card');

    if (!filterButtonsContainer || galleryItems.length === 0) {
        console.warn('Filter buttons container or gallery items not found.');
        return;
    }

    filterButtonsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Remove active class from all buttons
            filterButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to the clicked button
            e.target.classList.add('active');

            const filterValue = e.target.dataset.filter;

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        }
    });
}

// Contact Form Handling
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (!form) {
        console.warn('Contact form not found.');
        return;
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        if (!validateForm(form)) {
            formStatus.textContent = 'Please correct the errors above.';
            formStatus.className = 'form-status error';
            return;
        }

        const formData = new FormData(form);
        formStatus.textContent = 'Sending...';
        formStatus.className = 'form-status';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Thanks for your message! We will get back to you soon.';
                formStatus.className = 'form-status success';
                form.reset();
                clearErrorMessages(form);
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = 'Oops! There was a problem submitting your form.';
                    }
                    formStatus.className = 'form-status error';
                })
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem submitting your form. Check your network connection.';
            formStatus.className = 'form-status error';
        }
    });

    // Real-time validation listeners
    form.querySelectorAll('input[required], textarea[required]').forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
        // Also validate on blur for fields that might be skipped
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
}

function validateForm(form) {
    let isValid = true;
    clearErrorMessages(form);
    form.querySelectorAll('input[required], textarea[required]').forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    return isValid;
}

function validateField(field) {
    const errorMessageElement = field.parentElement.querySelector('.error-message');
    let message = '';
    field.removeAttribute('aria-invalid');

    if (field.hasAttribute('required') && !field.value.trim()) {
        message = `${field.previousElementSibling.textContent} is required.`;
    } else if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value.trim())) {
        message = 'Please enter a valid email address.';
    }

    if (message) {
        errorMessageElement.textContent = message;
        field.setAttribute('aria-invalid', 'true');
        return false;
    } else {
        errorMessageElement.textContent = ''; // Clear error message
        return true;
    }
}

function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearErrorMessages(form) {
    form.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
    form.querySelectorAll('[aria-invalid]').forEach(input => input.removeAttribute('aria-invalid'));
}

// Modular functions will be added here as features are implemented.

// Mobile Menu Toggle
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.getElementById('navList');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const isExpanded = navList.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Optional: Close menu when a link is clicked (for single-page apps)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Optional: Close menu if clicking outside of it
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navList.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            if (!isClickInsideNav && !isClickOnToggle && navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });


    } else {
        console.warn('Mobile navigation toggle or list not found.');
    }
}
