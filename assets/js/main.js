// Main JavaScript file for Haven Woodworks
console.log("Haven Woodworks JS Loaded");

class Carousel {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            // console.error(`Carousel container ${containerSelector} not found.`);
            return;
        }

        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.prevButton = this.container.querySelector('.carousel-button.prev');
        this.nextButton = this.container.querySelector('.carousel-button.next');
        this.dotsContainer = this.container.querySelector('.carousel-dots');

        if (this.slides.length === 0) {
            // console.warn("No slides found in the carousel.");
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

        this.container.setAttribute('tabindex', '0');
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
            const caption = slide.querySelector('.carousel-caption');
            if (caption) {
                caption.classList.remove('caption-animate-in');
            }
            slide.classList.remove('active');

            if (index === this.currentIndex) {
                slide.classList.add('active');
                if (caption) {
                    void caption.offsetWidth;
                    caption.classList.add('caption-animate-in');
                }
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
        this.stopAutoRotate();
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

// Scroll-triggered Animations
function initializeScrollAnimations() {
    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
    if (!sectionsToAnimate.length) return;

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sectionsToAnimate.forEach(section => intersectionObserver.observe(section));
}

// Back to Top Button
function initializeBackToTopButton() {
    const backToTopButton = document.getElementById('backToTopBtn');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
    });
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Interactive Gallery Section - Arrow Controls
function initializeInteractiveGalleryControls() {
    const gallerySection = document.querySelector('.interactive-gallery-section');
    if (!gallerySection) return;

    const scrollContainer = gallerySection.querySelector('.image-scroll-container');
    const prevButton = gallerySection.querySelector('.gallery-arrow.prev');
    const nextButton = gallerySection.querySelector('.gallery-arrow.next');
    if (!scrollContainer || !prevButton || !nextButton) return;

    const scrollAmount = () => {
        const firstItem = scrollContainer.querySelector('.gallery-image-item');
        return firstItem ? firstItem.offsetWidth + 20 : 300; // 20 is gap
    };
    prevButton.addEventListener('click', () => scrollContainer.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    nextButton.addEventListener('click', () => scrollContainer.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
}

// --- Data for Interactive Service Showcase ---
const serviceShowcaseData = {
    "custom-furniture": {
        imageSrc: "https://via.placeholder.com/600x750/EEEEEE/CCCCCC?Text=Handcrafted+Dining+Table",
        altText: "Handcrafted dining table",
        htmlContent: `
            <h3>Bespoke furniture tailored to your space</h3>
            <p>Our artisans create heirloom-quality pieces using sustainably sourced hardwoods.</p>
            <ul>
                <li>100+ wood species available</li>
                <li>3D design previews</li>
                <li>10-year structural warranty</li>
                <li>Eco-friendly finishes</li>
            </ul>
        `
    },
    "bespoke-cabinetry": {
        imageSrc: "https://via.placeholder.com/600x750/DDEEFF/AACCFF?Text=Kitchen+Cabinet+Close-up",
        altText: "Kitchen cabinet close-up",
        htmlContent: `
            <h3>Precision-built storage solutions</h3>
            <p>From walk-in closets to kitchen pantries, we maximize functionality without compromising aesthetics.</p>
            <ul>
                <li>Soft-close hardware standard</li>
                <li>Custom organizational inserts</li>
                <li>6-week average turnaround</li>
                <li>Dust-proof joinery</li>
            </ul>
        `
    },
    "residential-woodwork": {
        imageSrc: "https://via.placeholder.com/600x750/EEFFEE/CCEECC?Text=Staircase+Wainscoting",
        altText: "Staircase and wainscoting example",
        htmlContent: `
            <h3>Elevating homes through wood</h3>
            <p>Architectural millwork that transforms ordinary rooms into warm, inviting spaces.</p>
            <ul>
                <li>Historic restoration specialists</li>
                <li>CAD-assisted pattern matching</li>
                <li>On-site finishing available</li>
                <li>Fire-retardant options</li>
            </ul>
        `
    },
    "commercial-installations": {
        imageSrc: "https://via.placeholder.com/600x750/FFEECC/FFDDAA?Text=Office+Reception+Desk",
        altText: "Office reception desk",
        htmlContent: `
            <h3>Durable craftsmanship for businesses</h3>
            <p>High-traffic commercial spaces demand our industrial-grade wood solutions.</p>
            <ul>
                <li>ADA-compliant designs</li>
                <li>Antimicrobial coatings</li>
                <li>24/7 emergency repairs</li>
                <li>Bulk order discounts</li>
            </ul>
        `
    },
    "restoration-services": {
        imageSrc: "https://via.placeholder.com/600x750/FFEEEE/FFCCCC?Text=Antique+Furniture+Restoration",
        altText: "Antique furniture being restored",
        htmlContent: `
            <h3>Breathing new life into old wood</h3>
            <p>We preserve the past while making pieces functional for modern use.</p>
            <ul>
                <li>19th-century technique specialists</li>
                <li>Veneer repair masters</li>
                <li>Patina-matching services</li>
                <li>Museum conservation standards</li>
            </ul>
        `
    }
};
// --- End of Data for Interactive Service Showcase ---

// --- Interactive Service Showcase Logic ---
function initializeServiceShowcase() {
    const showcaseSection = document.querySelector('.service-showcase');
    if (!showcaseSection) return;

    const buttons = showcaseSection.querySelectorAll('.service-btn');
    const showcaseImage = document.getElementById('serviceShowcaseImage');
    const showcaseTextContainer = document.getElementById('serviceShowcaseText');

    if (!buttons.length || !showcaseImage || !showcaseTextContainer) {
        // console.warn('Service showcase elements not found.');
        return;
    }

    function updateShowcaseContent(serviceKey) {
        const serviceData = serviceShowcaseData[serviceKey];
        if (!serviceData) {
            // console.error(`No data found for service key: ${serviceKey}`);
            return;
        }

        showcaseImage.classList.add('content-fading');
        showcaseTextContainer.classList.add('content-fading');

        setTimeout(() => {
            showcaseImage.src = serviceData.imageSrc;
            showcaseImage.alt = serviceData.altText;
            showcaseTextContainer.innerHTML = serviceData.htmlContent;

            showcaseImage.classList.remove('content-fading');
            showcaseTextContainer.classList.remove('content-fading');
        }, 300); // Match CSS transition out (opacity 0.3s)
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const serviceKey = button.dataset.service;
            updateShowcaseContent(serviceKey);
        });
    });

    const activeButton = showcaseSection.querySelector('.service-btn.active');
    if (activeButton) {
        const initialServiceKey = activeButton.dataset.service;
        if (serviceShowcaseData[initialServiceKey]) {
            showcaseImage.alt = serviceShowcaseData[initialServiceKey].altText;
            // Initial HTML content is already in index.html for the default active service
        }
    } else if (buttons.length > 0) {
        buttons[0].classList.add('active');
        updateShowcaseContent(buttons[0].dataset.service);
    }
}
// --- End of Interactive Service Showcase Logic ---


// Lightbox Functionality
function initializeLightbox() {
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCloseButton = lightboxOverlay ? lightboxOverlay.querySelector('.lightbox-close') : null;
    const lightboxPrevButton = lightboxOverlay ? lightboxOverlay.querySelector('.lightbox-nav.prev') : null;
    const lightboxNextButton = lightboxOverlay ? lightboxOverlay.querySelector('.lightbox-nav.next') : null;

    const galleryItems = document.querySelectorAll('.interactive-gallery-section .gallery-image-item');
    let currentImageIndex = 0;
    const imageSources = [];

    if (!lightboxOverlay || !lightboxImage || !lightboxCloseButton || !lightboxPrevButton || !lightboxNextButton) return;
    if (galleryItems.length === 0) return;

    galleryItems.forEach((item, index) => {
        const imgElement = item.querySelector('img');
        const triggerButton = item.querySelector('.lightbox-trigger');
        if (imgElement && triggerButton) {
            imageSources.push(imgElement.src);
            triggerButton.addEventListener('click', () => {
                currentImageIndex = index;
                updateLightboxImage();
                lightboxOverlay.style.display = 'flex';
                setTimeout(() => lightboxOverlay.classList.add('visible'), 10);
                document.body.style.overflow = 'hidden';
            });
        }
    });

    function updateLightboxImage() {
        if (imageSources.length > 0) lightboxImage.src = imageSources[currentImageIndex];
    }
    function closeLightbox() {
        lightboxOverlay.classList.remove('visible');
        setTimeout(() => { lightboxOverlay.style.display = 'none'; }, 300);
        document.body.style.overflow = '';
    }
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        updateLightboxImage();
    }
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        updateLightboxImage();
    }

    lightboxCloseButton.addEventListener('click', closeLightbox);
    lightboxPrevButton.addEventListener('click', showPrevImage);
    lightboxNextButton.addEventListener('click', showNextImage);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('visible')) closeLightbox();
    });
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) closeLightbox();
    });
}

// Contact Form Handling
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (!form) return;

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
                method: form.method, body: formData, headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                formStatus.textContent = 'Thanks for your message! We will get back to you soon.';
                formStatus.className = 'form-status success';
                form.reset();
                clearErrorMessages(form);
            } else {
                response.json().then(data => {
                    formStatus.textContent = Object.hasOwn(data, 'errors') ? data["errors"].map(error => error["message"]).join(", ") : 'Oops! There was a problem submitting your form.';
                    formStatus.className = 'form-status error';
                });
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem submitting your form. Check your network connection.';
            formStatus.className = 'form-status error';
        }
    });
    form.querySelectorAll('input[required], textarea[required]').forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });
}

function validateForm(form) {
    let isValid = true;
    clearErrorMessages(form);
    form.querySelectorAll('input[required], textarea[required]').forEach(input => {
        if (!validateField(input)) isValid = false;
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
        errorMessageElement.textContent = '';
        return true;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearErrorMessages(form) {
    form.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');
    form.querySelectorAll('[aria-invalid]').forEach(input => input.removeAttribute('aria-invalid'));
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.getElementById('navList');
    if (!navToggle || !navList) return;

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navList.classList.contains('active'));
    });
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    document.addEventListener('click', (event) => {
        if (!navList.contains(event.target) && !navToggle.contains(event.target) && navList.classList.contains('active')) {
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('hero')) {
        const heroCarousel = new Carousel('.carousel-container');
    }
    if (document.getElementById('gallery')) {
        initializeProductGalleryFilter();
    }
    if (document.getElementById('contact-form')) {
        initializeContactForm();
    }
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeBackToTopButton();
    if (document.querySelector('.interactive-gallery-section')) {
        initializeInteractiveGalleryControls();
        initializeLightbox();
    }
    if (document.querySelector('.service-showcase')) {
        initializeServiceShowcase(); // Added this call
    }
});
