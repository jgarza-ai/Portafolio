// Particles Animation
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Mobile Menu
document.getElementById('menu-btn').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

document.getElementById('mobile-menu').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        this.classList.add('hidden');
    }
});

// Scroll Reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animated Counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters when visible
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// Demo Flow System
const flowScenarios = {
    'Buscar productos de energía': {
        nodes: [
            { id: 'whatsapp', name: 'WhatsApp API', icon: '📱', x: 50, y: 50 },
            { id: 'n8n1', name: 'n8n Webhook', icon: '⚙️', x: 200, y: 50 },
            { id: 'flowise', name: 'Flowise Agent', icon: '🤖', x: 350, y: 50 },
            { id: 'database', name: 'PostgreSQL', icon: '🗄️', x: 500, y: 50 },
            { id: 'ai', name: 'AI Processing', icon: '✨', x: 350, y: 150 },
            { id: 'n8n2', name: 'n8n Response', icon: '⚙️', x: 200, y: 150 },
            { id: 'whatsapp2', name: 'WhatsApp Send', icon: '📱', x: 50, y: 150 }
        ],
        connections: [
            { from: 'whatsapp', to: 'n8n1' },
            { from: 'n8n1', to: 'flowise' },
            { from: 'flowise', to: 'database' },
            { from: 'database', to: 'ai' },
            { from: 'ai', to: 'n8n2' },
            { from: 'n8n2', to: 'whatsapp2' }
        ],
        response: '🔋 **Productos de Energía Disponibles:**\n\n⚡ **JANNIS FIT** - $569\n• Acompaña entrenamiento y saciedad\n• Ingredientes naturales\n\n💪 **ENERGY BOOST** - $450\n• Energía natural de larga duración\n• Sin cafeína\n\n¿Te interesa alguno de estos productos?'
    },
    'Ver mi carrito': {
        nodes: [
            { id: 'whatsapp', name: 'WhatsApp API', icon: '📱', x: 50, y: 50 },
            { id: 'n8n1', name: 'n8n Cart Query', icon: '⚙️', x: 200, y: 50 },
            { id: 'database', name: 'PostgreSQL', icon: '🗄️', x: 350, y: 50 },
            { id: 'flowise', name: 'Flowise Format', icon: '🤖', x: 200, y: 150 },
            { id: 'whatsapp2', name: 'WhatsApp Send', icon: '📱', x: 50, y: 150 }
        ],
        connections: [
            { from: 'whatsapp', to: 'n8n1' },
            { from: 'n8n1', to: 'database' },
            { from: 'database', to: 'flowise' },
            { from: 'flowise', to: 'whatsapp2' }
        ],
        response: '🛒 **Tu Carrito Actual:**\n\n• JANNIS FIT x1 - $569\n• ENERGY BOOST x1 - $450\n\n**Total: $1,019**\n\n¿Deseas proceder al pago o agregar más productos?'
    },
    'Proceder al pago': {
        nodes: [
            { id: 'whatsapp', name: 'WhatsApp API', icon: '📱', x: 50, y: 50 },
            { id: 'flowise', name: 'Flowise Agent', icon: '🤖', x: 200, y: 50 },
            { id: 'whatsapp2', name: 'WhatsApp Data', icon: '📱', x: 350, y: 50 },
            { id: 'n8n1', name: 'n8n Process', icon: '⚙️', x: 200, y: 150 },
            { id: 'database', name: 'PostgreSQL', icon: '🗄️', x: 350, y: 150 },
            { id: 'odoo', name: 'Odoo ERP', icon: '📦', x: 500, y: 150 },
            { id: 'whatsapp3', name: 'WhatsApp Pay', icon: '📱', x: 50, y: 250 }
        ],
        connections: [
            { from: 'whatsapp', to: 'flowise' },
            { from: 'flowise', to: 'whatsapp2' },
            { from: 'whatsapp2', to: 'n8n1' },
            { from: 'n8n1', to: 'database' },
            { from: 'database', to: 'odoo' },
            { from: 'odoo', to: 'whatsapp3' }
        ],
        response: '💳 **Información de Pago:**\n\n**Transferencia Bancaria:**\n🏦 BBVA\nCLABE: 012180001234567890\n\n**Total a Pagar: $1,019**\n\n📋 **Instrucciones:**\n1. Realiza la transferencia\n2. Envía el comprobante\n3. Recibirás confirmación\n\n¿Necesitas ayuda con el proceso?'
    },
    'Necesito ayuda': {
        nodes: [
            { id: 'whatsapp', name: 'WhatsApp API', icon: '📱', x: 50, y: 50 },
            { id: 'flowise', name: 'Flowise Agent', icon: '🤖', x: 200, y: 50 },
            { id: 'ai', name: 'AI Assistant', icon: '✨', x: 350, y: 50 },
            { id: 'whatsapp2', name: 'WhatsApp Help', icon: '📱', x: 200, y: 150 }
        ],
        connections: [
            { from: 'whatsapp', to: 'flowise' },
            { from: 'flowise', to: 'ai' },
            { from: 'ai', to: 'whatsapp2' }
        ],
        response: '❓ **¿En qué puedo ayudarte?**\n\n• 🔍 **Búsqueda de productos**\n• 🛒 **Gestión de carrito**\n• 💳 **Proceso de pago**\n• 📦 **Seguimiento de pedidos**\n• 🔧 **Soporte técnico**\n\nEscribe tu consulta específica y te ayudo inmediatamente. 😊'
    }
};

function sendMessage(message) {
    const chatContainer = document.getElementById('chat-container');
    const flowContainer = document.getElementById('flow-container');

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message-bubble flex items-start gap-3 mb-4 p-3 bg-blue-500/20 rounded-lg ml-auto';
    userMessage.style.maxWidth = '80%';
    userMessage.innerHTML = `
        <div>
            <div class="text-xs text-gray-400 mb-1 text-right">Tú</div>
            <div class="text-sm">${message}</div>
        </div>
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <i class="fas fa-user text-white text-sm"></i>
        </div>
    `;
    chatContainer.appendChild(userMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Show loading
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message-bubble flex items-start gap-3 mb-4 p-3 bg-gray-500/20 rounded-lg';
    loadingMessage.innerHTML = `
        <div class="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div>
            <div class="text-xs text-gray-400 mb-1">Bot Assistant</div>
            <div class="text-sm">Procesando...</div>
        </div>
    `;
    chatContainer.appendChild(loadingMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Simulate processing delay
    setTimeout(() => {
        // Remove loading
        loadingMessage.remove();

        // Add bot response
        const botMessage = document.createElement('div');
        botMessage.className = 'message-bubble flex items-start gap-3 mb-4 p-3 bg-green-500/20 rounded-lg';
        botMessage.innerHTML = `
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <i class="fas fa-robot text-white text-sm"></i>
            </div>
            <div>
                <div class="text-xs text-gray-400 mb-1">Bot Assistant</div>
                <div class="text-sm whitespace-pre-line">${flowScenarios[message].response}</div>
            </div>
        `;
        chatContainer.appendChild(botMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Show flow visualization
        showFlowVisualization(flowScenarios[message]);
    }, 2000);
}

function showFlowVisualization(scenario) {
    const flowContainer = document.getElementById('flow-container');

    // Create SVG for flow visualization
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 600 300');

    // Clear container
    flowContainer.innerHTML = '';
    flowContainer.appendChild(svg);

    // Draw connections first (so they appear behind nodes)
    scenario.connections.forEach((conn, index) => {
        setTimeout(() => {
            const fromNode = scenario.nodes.find(n => n.id === conn.from);
            const toNode = scenario.nodes.find(n => n.id === conn.to);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromNode.x);
            line.setAttribute('y1', fromNode.y + 25);
            line.setAttribute('x2', toNode.x);
            line.setAttribute('y2', toNode.y + 25);
            line.setAttribute('stroke', '#00d9ff');
            line.setAttribute('stroke-width', '2');
            line.setAttribute('stroke-dasharray', '5,5');
            line.classList.add('flow-connection');

            svg.appendChild(line);
        }, index * 300);
    });

    // Draw nodes
    scenario.nodes.forEach((node, index) => {
        setTimeout(() => {
            // Create node group
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.classList.add('flow-node');

            // Create rectangle
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', node.x - 50);
            rect.setAttribute('y', node.y - 25);
            rect.setAttribute('width', '100');
            rect.setAttribute('height', '50');
            rect.setAttribute('rx', '10');
            rect.setAttribute('fill', 'rgba(20, 20, 32, 0.9)');
            rect.setAttribute('stroke', '#00d9ff');
            rect.setAttribute('stroke-width', '2');

            // Create text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', node.x);
            text.setAttribute('y', node.y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', '#e5e7eb');
            text.setAttribute('font-size', '10');
            text.setAttribute('font-family', 'Inter, sans-serif');
            text.textContent = node.name;

            // Create icon
            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            icon.setAttribute('x', node.x - 35);
            icon.setAttribute('y', node.y - 5);
            icon.setAttribute('text-anchor', 'middle');
            icon.setAttribute('font-size', '16');
            icon.textContent = node.icon;

            group.appendChild(rect);
            group.appendChild(icon);
            group.appendChild(text);
            svg.appendChild(group);

            // Add active class after a short delay
            setTimeout(() => {
                group.classList.add('active');
            }, 100);
        }, index * 500);
    });
}

// Initialize
createParticles();

// Scroll Reveal for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-section').forEach(section => {
    sectionObserver.observe(section);
});