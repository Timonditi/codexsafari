/**
 * BitSafariX Team Page JavaScript
 * Interactive features for team page
 */

document.addEventListener('DOMContentLoaded', function() {
    initTeamPage();
});

/**
 * Initialize all team page functionality
 */
function initTeamPage() {
    initNavHighlight();
    initFilterControls();
    initAnimations();
}

/**
 * Highlight active navigation item based on scroll position
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('.team-section');
    const navLinks = document.querySelectorAll('.team-nav-link');
    
    // Highlight nav link on page load based on hash
    highlightNavFromHash();
    
    // Highlight nav link when hash changes
    window.addEventListener('hashchange', highlightNavFromHash);
    
    // Highlight nav link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to section when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, `#${targetId}`);
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Helper function to highlight nav based on hash
    function highlightNavFromHash() {
        const hash = window.location.hash.substring(1);
        
        if (hash) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === hash) {
                    link.classList.add('active');
                }
            });
        }
    }
}

/**
 * Initialize filtering functionality for team members
 */
function initFilterControls() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            const parent = this.parentElement;
            parent.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Get team grid
            const teamGrid = this.closest('.team-section').querySelector('.team-grid');
            
            // Filter team members
            const teamMembers = teamGrid.querySelectorAll('.team-member-card');
            
            teamMembers.forEach(member => {
                if (filter === 'all' || member.getAttribute('data-category') === filter) {
                    member.style.display = 'block';
                    // Add animation
                    member.classList.remove('animate-fade-in');
                    void member.offsetWidth; // Trigger reflow
                    member.classList.add('animate-fade-in');
                } else {
                    member.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize scroll-based animations
 */
function initAnimations() {
    // Animate elements when they enter the viewport
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    
    // Initial check for elements in viewport
    checkElementsInViewport();
    
    // Check on scroll
    window.addEventListener('scroll', checkElementsInViewport);
    
    function checkElementsInViewport() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.animationPlayState = 'running';
            }
        });
    }
    
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    window.addEventListener('scroll', function() {
        if (!animated) {
            const statsSection = document.querySelector('.team-stats');
            if (statsSection) {
                const statsSectionTop = statsSection.getBoundingClientRect().top;
                
                if (statsSectionTop < window.innerHeight / 2) {
                    animated = true;
                    
                    statNumbers.forEach(statNumber => {
                        const targetValue = parseInt(statNumber.textContent);
                        animateCounter(statNumber, targetValue);
                    });
                }
            }
        }
    });
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // Divide animation into 50 steps
        const duration = 1500; // Animation duration in ms
        const interval = duration / 50; // Time between steps
        
        element.textContent = '0';
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                element.textContent = target + (target.toString().includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target.toString().includes('%') ? '%' : '');
            }
        }, interval);
    }
}
