/**
 * BitSafariX Team Slider JavaScript
 * Implements interactive team member carousel
 */

document.addEventListener('DOMContentLoaded', function() {
    initTeamSlider();
});

/**
 * Initialize the team slider functionality
 */
function initTeamSlider() {
    const sliderContainer = document.querySelector('.team-slider-container');
    const prevBtn = document.querySelector('.team-prev-btn');
    const nextBtn = document.querySelector('.team-next-btn');
    const dots = document.querySelectorAll('.team-dot');
    
    if (!sliderContainer) return;
    
    let currentSlide = 0;
    let slideWidth = 100;
    let slidesToShow = 1;
    
    // Determine how many slides to show based on screen width
    function updateSlidesToShow() {
        if (window.innerWidth >= 992) {
            slidesToShow = 3;
        } else if (window.innerWidth >= 768) {
            slidesToShow = 2;
        } else {
            slidesToShow = 1;
        }
        
        // Update slide width based on slides to show
        slideWidth = 100 / slidesToShow;
        
        // Update slider container and slides
        const slides = document.querySelectorAll('.team-member');
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}%`;
            slide.style.maxWidth = `${slideWidth}%`;
        });
        
        // Move to current slide without animation
        goToSlide(currentSlide, false);
    }
    
    // Go to specific slide
    function goToSlide(slideIndex, animate = true) {
        // Calculate maximum slide index
        const slides = document.querySelectorAll('.team-member');
        const maxSlideIndex = Math.max(0, slides.length - slidesToShow);
        
        // Ensure slide index is within bounds
        if (slideIndex < 0) {
            slideIndex = 0;
        } else if (slideIndex > maxSlideIndex) {
            slideIndex = maxSlideIndex;
        }
        
        currentSlide = slideIndex;
        
        // Move slider to position
        const translateValue = -slideIndex * slideWidth;
        
        if (animate) {
            sliderContainer.style.transition = 'transform 0.5s ease';
        } else {
            sliderContainer.style.transition = 'none';
        }
        
        sliderContainer.style.transform = `translateX(${translateValue}%)`;
        
        // Update active dot
        updateActiveDot();
        
        // Re-enable transition after a brief delay if it was disabled
        if (!animate) {
            setTimeout(() => {
                sliderContainer.style.transition = 'transform 0.5s ease';
            }, 50);
        }
    }
    
    // Update active dot indicator
    function updateActiveDot() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', updateSlidesToShow);
    
    // Initialize slider
    updateSlidesToShow();
    
    // Add touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left, go to next slide
            goToSlide(currentSlide + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right, go to previous slide
            goToSlide(currentSlide - 1);
        }
    }
}
