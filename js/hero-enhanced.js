/**
 * BitSafariX Enhanced Hero Section JavaScript
 * Advanced animations and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    initEnhancedHero();
});

/**
 * Initialize all hero section enhancements
 */
function initEnhancedHero() {
    createParticles();
    initNetworkVisualization();
    initParallaxEffect();
    initMouseInteraction();
    initScrollIndicator();
}

/**
 * Create animated particles in the hero background
 */
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2-8px
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration and delay
        const duration = Math.random() * 15 + 5;
        const delay = Math.random() * 5;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Create accent lines
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('div');
        line.classList.add('accent-line');
        particlesContainer.appendChild(line);
    }
}

/**
 * Initialize enhanced network visualization
 */
function initNetworkVisualization() {
    const networkVisual = document.querySelector('.network-visual-enhanced');
    if (!networkVisual) return;
    
    // Clear any existing content
    networkVisual.innerHTML = '';
    
    // Create nodes
    for (let i = 0; i < 4; i++) {
        const node = document.createElement('div');
        node.classList.add('node-enhanced');
        
        // Position nodes in a diamond pattern
        const angle = (i * Math.PI / 2) + (Math.PI / 4); // 45°, 135°, 225°, 315°
        const radius = 300; // Distance from center
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        node.style.left = `calc(50% + ${x}px)`;
        node.style.top = `calc(50% + ${y}px)`;
        node.style.transform = 'translate(-50%, -50%)';
        
        // Add animation delay
        node.style.animationDelay = `${i * 0.75}s`;
        
        networkVisual.appendChild(node);
    }
    
    // Create connectors
    for (let i = 0; i < 4; i++) {
        const connector = document.createElement('div');
        connector.classList.add('connector-enhanced');
        
        // Position and rotate connectors
        const angle = (i * Math.PI / 2) + (Math.PI / 4); // Same angles as nodes
        const nextAngle = ((i + 1) % 4 * Math.PI / 2) + (Math.PI / 4); // Next node angle
        
        const x1 = Math.cos(angle) * 300;
        const y1 = Math.sin(angle) * 300;
        const x2 = Math.cos(nextAngle) * 300;
        const y2 = Math.sin(nextAngle) * 300;
        
        // Calculate distance and angle between nodes
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
        
        connector.style.width = `${distance}px`;
        connector.style.height = '2px';
        connector.style.left = `calc(50% + ${x1}px)`;
        connector.style.top = `calc(50% + ${y1}px)`;
        connector.style.transformOrigin = 'left center';
        connector.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        // Add animation delay
        connector.style.animationDelay = `${i * 0.5}s`;
        
        networkVisual.appendChild(connector);
    }
    
    // Add cross connectors
    for (let i = 0; i < 2; i++) {
        const connector = document.createElement('div');
        connector.classList.add('connector-enhanced');
        
        connector.style.width = `${300 * 2 * Math.sqrt(2)}px`; // Diagonal length
        connector.style.height = '2px';
        connector.style.left = '50%';
        connector.style.top = '50%';
        connector.style.transformOrigin = 'center';
        connector.style.transform = `translate(-50%, -50%) rotate(${i * 90}deg)`;
        
        // Add animation delay
        connector.style.animationDelay = `${i * 0.5 + 2}s`;
        
        networkVisual.appendChild(connector);
    }
}

/**
 * Initialize parallax scrolling effect
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    const heroContent = document.querySelector('.hero-content');
    const networkVisual = document.querySelector('.network-visual-enhanced');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroHeight = hero.offsetHeight;
        const scrollRatio = Math.min(scrollPosition / heroHeight, 1);
        
        // Parallax for shapes
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.05);
            const yOffset = scrollPosition * speed;
            shape.style.transform = `translateY(${yOffset}px)`;
        });
        
        // Parallax for hero content
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            heroContent.style.opacity = 1 - scrollRatio * 1.5;
        }
        
        // Parallax for network visual
        if (networkVisual) {
            networkVisual.style.transform = `translate(-50%, -50%) scale(${1 + scrollRatio * 0.2})`;
            networkVisual.style.opacity = 0.7 - scrollRatio * 0.7;
        }
    });
}

/**
 * Initialize mouse interaction effects
 */
function initMouseInteraction() {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    const particles = document.querySelectorAll('.particle');
    const networkNodes = document.querySelectorAll('.node-enhanced');
    
    hero.addEventListener('mousemove', function(e) {
        // Calculate mouse position relative to hero center
        const rect = hero.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const offsetX = (mouseX - centerX) / centerX; // -1 to 1
        const offsetY = (mouseY - centerY) / centerY; // -1 to 1
        
        // Move shapes based on mouse position
        shapes.forEach((shape, index) => {
            const intensity = 20 + index * 5;
            shape.style.transform = `translate(${offsetX * intensity}px, ${offsetY * intensity}px)`;
        });
        
        // Subtle movement for particles
        particles.forEach((particle, index) => {
            const intensity = 5 + (index % 5);
            const currentTransform = window.getComputedStyle(particle).transform;
            if (currentTransform !== 'none') {
                particle.style.transform = `translate(${offsetX * intensity}px, ${offsetY * intensity}px)`;
            }
        });
        
        // Move network nodes
        networkNodes.forEach((node, index) => {
            const intensity = 10;
            const currentLeft = parseFloat(node.style.left);
            const currentTop = parseFloat(node.style.top);
            
            if (!isNaN(currentLeft) && !isNaN(currentTop)) {
                node.style.left = `calc(${currentLeft}% + ${offsetX * intensity}px)`;
                node.style.top = `calc(${currentTop}% + ${offsetY * intensity}px)`;
            }
        });
    });
}

/**
 * Initialize scroll indicator functionality
 */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide scroll indicator when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}
