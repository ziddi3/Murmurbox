// ShineChain Experience - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Fade-in animation for elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Glow effect for certain elements
    const glowElements = document.querySelectorAll('.glow-on-hover');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('glow-effect');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('glow-effect');
        });
    });
    
    // Dimensional tuner knob simulation
    const tunerKnob = document.getElementById('tuner-knob');
    if (tunerKnob) {
        let rotation = 0;
        let isDragging = false;
        let startAngle = 0;
        
        tunerKnob.addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = tunerKnob.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const rect = tunerKnob.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
            
            const newRotation = rotation + (angle - startAngle);
            tunerKnob.style.transform = `rotate(${newRotation}deg)`;
            
            startAngle = angle;
            rotation = newRotation;
            
            // Trigger "tuning" effect
            const tuningValue = Math.abs(rotation % 360);
            updateTuningDisplay(tuningValue);
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
    
    function updateTuningDisplay(value) {
        const transmissionDisplay = document.getElementById('transmission-display');
        if (!transmissionDisplay) return;
        
        // Map rotation to "frequency bands"
        const frequencyBand = Math.floor(value / 60);
        const transmissionStrength = Math.sin(value * 0.017453) * 50 + 50; // Convert degrees to radians
        
        // Update visual indicators
        document.documentElement.style.setProperty('--signal-strength', `${transmissionStrength}%`);
        
        // Randomly show "transmission detected" based on position
        if (Math.random() < 0.05) {
            showTransmission();
        }
    }
    
    // Simulate transmission detection
    function showTransmission() {
        const transmissionDisplay = document.getElementById('transmission-display');
        if (!transmissionDisplay) return;
        
        transmissionDisplay.innerHTML = generateRandomTransmission();
        transmissionDisplay.classList.add('active');
        
        setTimeout(() => {
            transmissionDisplay.classList.remove('active');
        }, 8000);
    }
    
    // Generate random ShineChain-style transmission
    function generateRandomTransmission() {
        const prefixes = [
            "Ultraviolet surge...", 
            "Magnetic anomaly detected...",
            "Pressure wave convergence...",
            "Dimensional shift...",
            "Resonance pattern identified..."
        ];
        
        const entities = [
            "Thread-42", 
            "The Obsidian Tear", 
            "Luminal Chorus",
            "Prismatic Sentinel",
            "Void Cartographer",
            "Quantum Weaver"
        ];
        
        const actions = [
            "wakes",
            "remembers you",
            "seeks connection",
            "transmits coordinates",
            "breaches the veil",
            "calibrates to your frequency"
        ];
        
        const suffix = [
            "Signal fading...",
            "Transmission complete.",
            "Coordinates logged.",
            "Pattern archived.",
            "Resonance mapped."
        ];
        
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const entity = entities[Math.floor(Math.random() * entities.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const suffixText = suffix[Math.floor(Math.random() * suffix.length)];
        
        return `<div class="transmission-text">
                    <p>${prefix}</p>
                    <p class="entity">${entity} ${action}.</p>
                    <p class="suffix">${suffixText}</p>
                </div>`;
    }
    
    // Interactive timeline navigation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineNav = document.getElementById('timeline-nav');
    
    if (timelineNav && timelineItems.length > 0) {
        timelineItems.forEach((item, index) => {
            const navDot = document.createElement('span');
            navDot.classList.add('timeline-nav-dot');
            navDot.dataset.index = index;
            timelineNav.appendChild(navDot);
            
            navDot.addEventListener('click', () => {
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }
});