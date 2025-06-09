// BitSafariX Hero Section Redesign JavaScript
// Advanced animations and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero section animations and interactions
    initParticlesAnimation();
    initTypingEffect();
    initScrollIndicator();
    initHeroParallax();
    initNetworkAnimation();
});

/**
 * Initialize particles animation in hero background
 */
function initParticlesAnimation() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add mouse interaction
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const offsetX = (mouseX - 0.5) * 20;
            const offsetY = (mouseY - 0.5) * 20;
            
            particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

/**
 * Initialize typing effect for hero title
 */
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        let charIndex = 0;
        const typeSpeed = 100; // ms per character
        
        function typeWriter() {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Remove cursor when typing is complete
                element.classList.add('typing-complete');
            }
        }
        
        // Start typing with a delay
        setTimeout(typeWriter, 500);
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
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 300);
        } else {
            scrollIndicator.style.display = 'flex';
            setTimeout(() => {
                scrollIndicator.style.opacity = '0.7';
            }, 10);
        }
    });
}

/**
 * Initialize parallax effect for hero section
 */
function initHeroParallax() {
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (heroImage) {
            heroImage.style.transform = `scale(1.05) translateY(${scrollPosition * 0.1}px)`;
        }
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
        
        shapes.forEach((shape, index) => {
            const speed = 0.03 + (index * 0.01);
            shape.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}

/**
 * Initialize enhanced network visualization animation
 */
function initNetworkAnimation() {
    const networkVisual = document.querySelector('.network-visual-enhanced');
    if (!networkVisual) return;
    
    // Create nodes
    for (let i = 0; i < 4; i++) {
        const node = document.createElement('div');
        node.classList.add('node-enhanced');
        
        // Position nodes in a diamond pattern
        switch(i) {
            case 0: // top
                node.style.top = '0';
                node.style.left = '50%';
                node.style.transform = 'translateX(-50%)';
                break;
            case 1: // right
                node.style.top = '50%';
                node.style.right = '0';
                node.style.transform = 'translateY(-50%)';
                break;
            case 2: // bottom
                node.style.bottom = '0';
                node.style.left = '50%';
                node.style.transform = 'translateX(-50%)';
                break;
            case 3: // left
                node.style.top = '50%';
                node.style.left = '0';
                node.style.transform = 'translateY(-50%)';
                break;
        }
        
        // Add animation delay
        node.style.animationDelay = `${i * 0.75}s`;
        
        networkVisual.appendChild(node);
    }
    
    // Create connectors
    const connectorPositions = [
        { width: '2px', height: '100%', top: '0', left: '50%', transform: 'translateX(-50%)' }, // vertical
        { width: '100%', height: '2px', top: '50%', left: '0', transform: 'translateY(-50%)' }, // horizontal
        { width: '140%', height: '2px', top: '50%', left: '-20%', transform: 'translateY(-50%) rotate(45deg)' }, // diagonal 1
        { width: '140%', height: '2px', top: '50%', left: '-20%', transform: 'translateY(-50%) rotate(-45deg)' }  // diagonal 2
    ];
    
    connectorPositions.forEach((pos, index) => {
        const connector = document.createElement('div');
        connector.classList.add('connector-enhanced');
        
        Object.keys(pos).forEach(key => {
            connector.style[key] = pos[key];
        });
        
        // Add animation delay
        connector.style.animationDelay = `${index * 0.5}s`;
        
        networkVisual.appendChild(connector);
    });
    
    // Add mouse interaction
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const nodes = document.querySelectorAll('.node-enhanced');
        nodes.forEach(node => {
            const offsetX = (mouseX - 0.5) * 10;
            const offsetY = (mouseY - 0.5) * 10;
            
            // Apply subtle movement based on mouse position
            const currentTransform = node.style.transform;
            if (currentTransform.includes('translate')) {
                const baseTransform = currentTransform.split(')')[0] + ')';
                node.style.transform = `${baseTransform} translate(${offsetX}px, ${offsetY}px)`;
            } else {
                node.style.transform += ` translate(${offsetX}px, ${offsetY}px)`;
            }
        });
    });
}
