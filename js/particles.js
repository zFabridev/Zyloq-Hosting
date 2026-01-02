// Particles background for hero section

document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles-js');
    
    if (!particlesContainer) return;
    
    // Create particles
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size and position
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random color (blue shades)
        const colors = ['#0074FF', '#55CCFF', '#0088FF', '#33AAFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        particlesContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: posX,
            y: posY,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            size: size
        });
    }
    
    // Add CSS for particles
    const particlesStyle = document.createElement('style');
    particlesStyle.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(10px, 10px) rotate(90deg);
            }
            50% {
                transform: translate(0, 20px) rotate(180deg);
            }
            75% {
                transform: translate(-10px, 10px) rotate(270deg);
            }
        }
    `;
    document.head.appendChild(particlesStyle);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX + mouseX * 0.1;
            particle.y += particle.speedY + mouseY * 0.1;
            
            // Wrap around edges
            if (particle.x > 100) particle.x = 0;
            if (particle.x < 0) particle.x = 100;
            if (particle.y > 100) particle.y = 0;
            if (particle.y < 0) particle.y = 100;
            
            // Update position
            particle.element.style.left = `${particle.x}%`;
            particle.element.style.top = `${particle.y}%`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Start animation
    animateParticles();
});