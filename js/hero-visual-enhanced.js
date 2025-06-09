/**
 * BitSafariX Enhanced Hero Visual JavaScript
 * This script creates and animates the advanced 3D network visualization
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the enhanced hero visual
    initEnhancedHeroVisual();
    
    // Add interactive effects
    addHeroVisualInteractivity();
});

/**
 * Initialize the enhanced hero visual with all elements
 */
function initEnhancedHeroVisual() {
    const networkVisual = document.querySelector('.network-visual');
    
    // Exit if element doesn't exist
    if (!networkVisual) return;
    
    // Clear existing content
    networkVisual.innerHTML = '';
    
    // Create 3D container
    const container3D = document.createElement('div');
    container3D.className = 'network-3d-container';
    
    // Add Africa outline
    const africaOutline = document.createElement('div');
    africaOutline.className = 'africa-outline';
    container3D.appendChild(africaOutline);
    
    // Add central AI node
    const nodeAI = document.createElement('div');
    nodeAI.className = 'node node-ai';
    nodeAI.setAttribute('data-index', 'ai');
    container3D.appendChild(nodeAI);
    
    // Add regular nodes
    for (let i = 1; i <= 4; i++) {
        const node = document.createElement('div');
        node.className = `node node-${i}`;
        node.setAttribute('data-index', i);
        container3D.appendChild(node);
    }
    
    // Add connectors between nodes and central AI node
    for (let i = 1; i <= 4; i++) {
        const connector = document.createElement('div');
        connector.className = `connector connector-${i}`;
        connector.setAttribute('data-connects', `${i},ai`);
        
        // Add data packets to each connector
        for (let j = 0; j < 3; j++) {
            const dataPacket = document.createElement('div');
            dataPacket.className = 'data-packet';
            dataPacket.style.animationDelay = `${j * 1}s`;
            connector.appendChild(dataPacket);
        }
        
        container3D.appendChild(connector);
    }
    
    // Add central connectors
    for (let i = 1; i <= 4; i++) {
        const connector = document.createElement('div');
        connector.className = `connector connector-central-${i}`;
        connector.setAttribute('data-connects', `ai,central`);
        
        // Add data packets to each central connector
        for (let j = 0; j < 2; j++) {
            const dataPacket = document.createElement('div');
            dataPacket.className = 'data-packet';
            dataPacket.style.animationDelay = `${j * 1.5}s`;
            connector.appendChild(dataPacket);
        }
        
        container3D.appendChild(connector);
    }
    
    // Add code snippets
    const codeSnippets = [
        'function connectTalent() { ... }',
        'const africa = new TechHub();',
        'AI.train(kenyanDevelopers);',
        'export class Innovation { ... }'
    ];
    
    for (let i = 1; i <= 4; i++) {
        const snippet = document.createElement('div');
        snippet.className = `code-snippet code-snippet-${i}`;
        snippet.textContent = codeSnippets[i-1];
        container3D.appendChild(snippet);
    }
    
    // Add tech symbols
    const techSymbols = ['{ }', '</>', '01', '# AI'];
    
    for (let i = 1; i <= 4; i++) {
        const symbol = document.createElement('div');
        symbol.className = `tech-symbol symbol-${i}`;
        symbol.textContent = techSymbols[i-1];
        container3D.appendChild(symbol);
    }
    
    // Add global connection indicator
    const globalConnection = document.createElement('div');
    globalConnection.className = 'global-connection';
    
    const connectionLine = document.createElement('div');
    connectionLine.className = 'connection-line';
    globalConnection.appendChild(connectionLine);
    
    const connectionUS = document.createElement('div');
    connectionUS.className = 'connection-point-us';
    connectionUS.setAttribute('title', 'United States');
    globalConnection.appendChild(connectionUS);
    
    const connectionAfrica = document.createElement('div');
    connectionAfrica.className = 'connection-point-africa';
    connectionAfrica.setAttribute('title', 'Africa');
    globalConnection.appendChild(connectionAfrica);
    
    container3D.appendChild(globalConnection);
    
    // Add 3D grid background
    const gridBackground = document.createElement('div');
    gridBackground.className = 'grid-background';
    container3D.appendChild(gridBackground);
    
    // Add the 3D container to the network visual
    networkVisual.appendChild(container3D);
    
    // Initialize animation state
    setTimeout(() => {
        document.querySelector('.hero').classList.add('animate');
    }, 100);
}

/**
 * Add interactive effects to the hero visual
 */
function addHeroVisualInteractivity() {
    const heroSection = document.querySelector('.hero');
    const networkVisual = document.querySelector('.network-visual');
    
    // Mouse movement effect
    heroSection.addEventListener('mousemove', function(e) {
        // Only apply if not on mobile
        if (window.innerWidth > 768) {
            const container = document.querySelector('.network-3d-container');
            if (!container) return;
            
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;
            
            // Subtle rotation based on mouse position
            container.style.transform = `rotateY(${mouseX * 20}deg) rotateX(${-mouseY * 20}deg)`;
            
            // Parallax effect on nodes
            const nodes = document.querySelectorAll('.node');
            nodes.forEach((node, index) => {
                const factor = (index % 2 === 0) ? 1 : -1;
                const depth = parseInt(node.style.transform.match(/translateZ\((\d+)px\)/) || [0, 30])[1];
                const moveX = mouseX * depth / 10 * factor;
                const moveY = mouseY * depth / 10 * factor;
                
                node.style.transform = node.style.transform.replace(/translate\(.*?\)/, '') + 
                                      ` translate(${moveX}px, ${moveY}px)`;
            });
        }
    });
    
    // Reset transform on mouse leave
    heroSection.addEventListener('mouseleave', function() {
        const container = document.querySelector('.network-3d-container');
        if (container) {
            container.style.transform = '';
        }
        
        const nodes = document.querySelectorAll('.node');
        nodes.forEach(node => {
            node.style.transform = node.style.transform.replace(/translate\(.*?\)/, '');
        });
    });
    
    // Node hover effects
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace(/scale\(.*?\)/, '') + ' scale(1.2)';
            this.style.boxShadow = '0 0 30px rgba(245, 185, 65, 1), inset 0 0 15px rgba(255, 255, 255, 0.8)';
            this.style.zIndex = '10';
            
            // Highlight connected connectors
            const nodeIndex = this.getAttribute('data-index');
            const connectors = document.querySelectorAll('.connector');
            
            connectors.forEach(connector => {
                const connects = connector.getAttribute('data-connects');
                if (connects && connects.includes(nodeIndex)) {
                    connector.style.backgroundColor = 'rgba(245, 185, 65, 0.8)';
                    connector.style.boxShadow = '0 0 15px rgba(245, 185, 65, 0.6)';
                    connector.style.zIndex = '9';
                    
                    // Speed up data packets
                    const packets = connector.querySelectorAll('.data-packet');
                    packets.forEach(packet => {
                        packet.style.animationDuration = '1.5s';
                    });
                }
            });
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(/scale\(.*?\)/, '');
            this.style.boxShadow = '';
            this.style.zIndex = '';
            
            // Reset connectors
            const connectors = document.querySelectorAll('.connector');
            connectors.forEach(connector => {
                connector.style.backgroundColor = '';
                connector.style.boxShadow = '';
                connector.style.zIndex = '';
                
                // Reset data packet speed
                const packets = connector.querySelectorAll('.data-packet');
                packets.forEach(packet => {
                    packet.style.animationDuration = '';
                });
            });
        });
    });
    
    // Add click effect on AI node
    const aiNode = document.querySelector('.node-ai');
    if (aiNode) {
        aiNode.addEventListener('click', function() {
            // Create pulse effect
            const pulse = document.createElement('div');
            pulse.className = 'ai-pulse';
            pulse.style.position = 'absolute';
            pulse.style.top = '50%';
            pulse.style.left = '50%';
            pulse.style.width = '100%';
            pulse.style.height = '100%';
            pulse.style.borderRadius = '50%';
            pulse.style.backgroundColor = 'rgba(245, 185, 65, 0.8)';
            pulse.style.transform = 'translate(-50%, -50%) scale(1)';
            pulse.style.opacity = '1';
            pulse.style.animation = 'pulse-out 1s forwards';
            
            this.appendChild(pulse);
            
            // Remove after animation
            setTimeout(() => {
                pulse.remove();
            }, 1000);
            
            // Add keyframe animation dynamically if not exists
            if (!document.querySelector('#pulse-keyframes')) {
                const style = document.createElement('style');
                style.id = 'pulse-keyframes';
                style.textContent = `
                    @keyframes pulse-out {
                        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                        100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }
}

/**
 * Create SVG Africa outline if not available
 */
function createAfricaOutlineSVG() {
    // Check if we need to create the SVG file
    fetch('/images/africa-outline.svg')
        .then(response => {
            if (!response.ok) {
                // Create the SVG file if it doesn't exist
                const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900">
                    <path fill="none" stroke="#f5b941" stroke-width="2" d="M400,100 C450,120 500,150 520,200 C540,250 550,300 580,350 C610,400 650,420 630,470 C610,520 590,550 600,600 C610,650 590,700 550,730 C510,760 470,780 420,790 C370,800 320,790 280,760 C240,730 220,680 200,630 C180,580 170,530 150,480 C130,430 120,380 150,340 C180,300 220,280 250,240 C280,200 300,160 340,130 C380,100 350,80 400,100 Z" />
                </svg>
                `;
                
                // Create images directory if it doesn't exist
                const imagesDir = '/home/ubuntu/CodeXSafari/images';
                
                // Use shell_exec to create directory and file
                const createDirCommand = `mkdir -p ${imagesDir}`;
                const createFileCommand = `echo '${svgContent}' > ${imagesDir}/africa-outline.svg`;
                
                // Execute commands
                fetch('/api/shell/exec', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        command: `${createDirCommand} && ${createFileCommand}`
                    })
                });
            }
        })
        .catch(() => {
            // Handle error silently
            console.log('Creating Africa outline SVG');
        });
}
