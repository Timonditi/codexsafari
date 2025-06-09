/**
 * BitSafariX Hero Section Animation JavaScript
 * This script adds advanced animations and interactive effects to the hero section
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations when the page is loaded
    initHeroAnimations();
    
    // Add scroll-based effects
    window.addEventListener('scroll', handleScroll);
    
    // Add mouse movement interactive effects
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', handleMouseMove);
});

/**
 * Initialize all hero section animations
 */
function initHeroAnimations() {
    // Add class to trigger CSS animations
    setTimeout(() => {
        document.querySelector('.hero').classList.add('animate');
    }, 100);
    
    // Initialize particle background effect
    initParticleEffect();
    
    // Add interactive hover effects to nodes
    addNodeInteractivity();
}

/**
 * Create particle effect in the hero background
 */
function initParticleEffect() {
    const heroSection = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    
    // Create particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position, size and animation delay
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particleContainer.appendChild(particle);
    }
    
    // Insert particle container at the beginning of hero section
    heroSection.insertBefore(particleContainer, heroSection.firstChild);
}

/**
 * Add interactive effects to network nodes
 */
function addNodeInteractivity() {
    const nodes = document.querySelectorAll('.network-visual .node');
    
    nodes.forEach(node => {
        // Enhance node on hover
        node.addEventListener('mouseenter', function() {
            this.classList.add('node-hover');
            
            // Find connected connectors and highlight them
            const nodeIndex = Array.from(nodes).indexOf(this);
            const connectors = document.querySelectorAll('.network-visual .connector');
            
            connectors.forEach(connector => {
                if (connector.dataset.connects && connector.dataset.connects.includes(nodeIndex.toString())) {
                    connector.classList.add('connector-active');
                }
            });
        });
        
        // Remove enhancement on mouse leave
        node.addEventListener('mouseleave', function() {
            this.classList.remove('node-hover');
            
            // Remove highlight from connectors
            document.querySelectorAll('.connector-active').forEach(el => {
                el.classList.remove('connector-active');
            });
        });
    });
}

/**
 * Handle scroll effects for parallax and reveal animations
 */
function handleScroll() {
    const scrollPosition = window.scrollY;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    // Only apply effects when hero section is visible
    if (scrollPosition <= heroHeight) {
        const scrollRatio = scrollPosition / heroHeight;
        
        // Parallax effect for background
        const background = document.querySelector('.hero::before');
        if (background) {
            background.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
        
        // Parallax effect for hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
        
        // Parallax effect for network visual (moving in opposite direction)
        const networkVisual = document.querySelector('.network-visual');
        if (networkVisual) {
            networkVisual.style.transform = `translateY(${scrollPosition * -0.1}px)`;
        }
    }
}

/**
 * Handle mouse movement for interactive background effect
 */
function handleMouseMove(e) {
    const hero = document.querySelector('.hero');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Subtle movement of background based on mouse position
    hero.style.setProperty('--mouse-x', mouseX);
    hero.style.setProperty('--mouse-y', mouseY);
    
    // Move network nodes slightly based on mouse position
    const nodes = document.querySelectorAll('.network-visual .node');
    nodes.forEach((node, index) => {
        const factor = (index % 2 === 0) ? 1 : -1;
        const moveX = (mouseX - 0.5) * 10 * factor;
        const moveY = (mouseY - 0.5) * 10 * factor;
        
        node.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}
