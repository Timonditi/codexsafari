/**
 * BitSafariX Website JavaScript
 * Animations, interactions, and functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initTestimonialSlider();
    initLogoAnimation();
    initContactForm();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Check for elements to animate on scroll
        animateOnScroll();
    });
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = menuToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
            
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    
                    const bars = menuToggle.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                    bars.forEach(bar => bar.classList.remove('active'));
                }
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.services-grid .service-card, .why-kenya-content > div, .team-member, .step');
    
    animatedElements.forEach((element, index) => {
        // Alternate between left and right animations for certain elements
        if (element.classList.contains('service-card') || element.classList.contains('team-member')) {
            if (index % 2 === 0) {
                element.classList.add('slide-in-left');
            } else {
                element.classList.add('slide-in-right');
            }
        } else {
            element.classList.add('fade-in');
        }
    });
    
    // Add fade-in to section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
}

/**
 * Check if elements are in viewport and animate them
 */
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // If element is in viewport
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('active');
        }
    });
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    currentSlide = 0;
    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!slides || slides.length === 0) return;
    
    slides.forEach(slide => {
        if (slide && slide.classList) {
            slide.classList.remove('active');
        }
    });
    
    if (slides[index] && slides[index].classList) {
        slides[index].classList.add('active');
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!slides || slides.length === 0) return;
    
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
}

/**
 * Logo Animation
 */
function initLogoAnimation() {
    const logoNodes = document.querySelectorAll('.logo .node');
    
    // Animate nodes on hover
    logoNodes.forEach((node, index) => {
        // Add slight delay between each node
        const delay = index * 0.1;
        node.style.animationDelay = `${delay}s`;
    });
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            const validationResult = validateForm(contactForm);
            
            if (!validationResult.isValid) {
                alert(validationResult.errorMessages.join('\n'));
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Form validation
function validateForm(form) {
    if (!form) return { isValid: false, errorMessages: ['Form not found'] };
    
    let isValid = true;
    const errorMessages = [];
    
    // Get form elements
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const projectType = form.querySelector('[name="projectType"]');
    
    // Validate name
    if (!name || !name.value.trim()) {
        isValid = false;
        errorMessages.push('Name is required');
    }
    
    // Validate email
    if (!email || !email.value.trim()) {
        isValid = false;
        errorMessages.push('Email is required');
    } else if (!isValidEmail(email.value.trim())) {
        isValid = false;
        errorMessages.push('Please enter a valid email address');
    }
    
    // Validate phone if it exists
    if (phone && !phone.value.trim()) {
        isValid = false;
        errorMessages.push('Phone number is required');
    } else if (phone && !isValidPhone(phone.value.trim())) {
        isValid = false;
        errorMessages.push('Please enter a valid phone number');
    }
    
    // Validate project type if it exists
    if (projectType && !projectType.value.trim()) {
        isValid = false;
        errorMessages.push('Please select a project type');
    }
    
    return { isValid, errorMessages };
}

/**
 * Parallax Effect for Hero Section
 */
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
});

/**
 * Animate Network Visual
 */
document.addEventListener('DOMContentLoaded', function() {
    const networkNodes = document.querySelectorAll('.network-visual .node');
    const connectors = document.querySelectorAll('.network-visual .connector');
    
    // Animate nodes with staggered delay
    networkNodes.forEach((node, index) => {
        node.style.animation = `pulse 3s infinite ${index * 0.75}s`;
    });
    
    // Animate connectors
    connectors.forEach((connector, index) => {
        connector.style.animation = `fadeIn 1.5s forwards ${index * 0.5 + 1}s`;
    });
});
