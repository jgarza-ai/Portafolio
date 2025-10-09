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


// Slide 4: Financial Advisor Doughnut Chart
const riskProfiles = {
    conservative: 'conic-gradient(#2563eb 0% 60%, #10b981 60% 90%, #f97316 90% 100%)',
    moderate: 'conic-gradient(#2563eb 0% 40%, #10b981 40% 80%, #f97316 80% 100%)',
    aggressive: 'conic-gradient(#2563eb 0% 20%, #10b981 20% 70%, #f97316 70% 100%)'
};

const riskSelector = document.getElementById('risk-profile-selector');
const doughnutChart = document.getElementById('doughnut-chart-container');

function updateDoughnutChart(profile) {
    doughnutChart.style.background = riskProfiles[profile];
}

riskSelector.addEventListener('change', (e) => {
    updateDoughnutChart(e.target.value);
});

// Initial chart setup
updateDoughnutChart('conservative');


// Initialize everything after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Basic Setup
    createParticles();

    // 2. Setup Interactive Demos
    buildWhatsAppUI();
    initializeFlowchart();
    initializeEtlDemo(); // Initialize the new ETL Demo

    // 3. Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            init: function () {
                // Initial check for the demo slide on load
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide.querySelector('#split-container')) {
                    resetAndStartChat();
                }
            },
            slideChange: function () {
                // Handles subsequent slide changes
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide.querySelector('#split-container')) {
                    resetAndStartChat();
                } else {
                    clearChatTimeouts();
                }
            },
        },
    });

    // 4. Initialize Split View
    Split(['#whatsapp-panel', '#flow-panel'], {
        sizes: [40, 60],
        gutterSize: 8,
        cursor: 'col-resize',
        minSize: 200,
    });

    // 5. Setup Scroll Observers
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
});

function buildWhatsAppUI() {
    const whatsappPanel = document.getElementById('whatsapp-panel');
    if (!whatsappPanel) return;
    whatsappPanel.innerHTML = `
        <div class="whatsapp-container">
            <div class="whatsapp-header">
                <img src="assets/avatar.png" alt="Avatar" class="avatar">
                <div>
                    <div class="font-bold">E-Commerce Bot</div>
                    <div class="text-sm text-gray-400">Online</div>
                </div>
            </div>
            <div class="whatsapp-messages" id="whatsapp-messages"></div>
            <div class="whatsapp-input" id="whatsapp-input"></div>
        </div>
    `;
}

const chatFlow = [
    { type: 'bot', text: '¡Hola! Bienvenido a nuestra tienda. ¿En qué puedo ayudarte hoy?', delay: 500, nodeId: 'A' },
    { type: 'user-options', options: ['Ver catálogo', 'Rastrear mi pedido', 'Hablar con un agente'], delay: 1000, nodeId: 'B' },
    { trigger: 'Ver catálogo', type: 'bot', text: '¡Claro! Aquí tienes nuestras categorías principales:', delay: 500, nodeId: 'E' },
    { type: 'bot-options', options: ['Electrónicos', 'Ropa', 'Hogar'], delay: 500, nodeId: 'B' },
    { trigger: 'Electrónicos', type: 'bot', text: 'Tenemos los últimos gadgets. ¿Te interesa algo en particular?', delay: 500, nodeId: 'E' },
    { trigger: 'Rastrear mi pedido', type: 'bot', text: 'Por supuesto, por favor ingresa tu número de pedido.', delay: 500, action: 'track-order', nodeId: 'C' },
    { trigger: 'Hablar con un agente', type: 'bot', text: 'Entendido. Te estoy transfiriendo con un agente humano.', delay: 500, nodeId: 'E' },
];

let currentStep = 0;
let chatTimeouts = [];

function chatSetTimeout(callback, delay) {
    const id = setTimeout(callback, delay);
    chatTimeouts.push(id);
}

function clearChatTimeouts() {
    chatTimeouts.forEach(id => clearTimeout(id));
    chatTimeouts = [];
}

function resetAndStartChat() {
    clearChatTimeouts();
    const messagesContainer = document.getElementById('whatsapp-messages');
    if (messagesContainer) messagesContainer.innerHTML = '';

    const inputContainer = document.getElementById('whatsapp-input');
    if (inputContainer) inputContainer.innerHTML = '';

    if (lastHighlightedNode) {
        lastHighlightedNode.classList.remove('active');
        lastHighlightedNode = null;
    }
    currentStep = 0;
    processNextStep();
}

function processNextStep() {
    if (currentStep >= chatFlow.length) return;
    const step = chatFlow[currentStep];
    highlightNode(step.nodeId);

    chatSetTimeout(() => {
        if (step.type === 'bot') {
            addBotMessage(step.text);
            if (!step.action) {
                currentStep++;
                processNextStep();
            }
        } else if (step.type === 'user-options' || step.type === 'bot-options') {
            showOptions(step.options);
        }
    }, step.delay || 500);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('whatsapp-messages');
    if (!messagesContainer) return;
    const messageBubble = document.createElement('div');
    messageBubble.className = `whatsapp-bubble ${sender}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageBubble.innerHTML = `
        <span>${text}</span>
        <div class="timestamp">
            ${timestamp}
            ${sender === 'user' ? '<i class="fas fa-check-double read"></i>' : ''}
        </div>
    `;
    messagesContainer.appendChild(messageBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    gsap.from(messageBubble, { opacity: 0, y: 20, duration: 0.5 });
}

function addBotMessage(text) {
    const messagesContainer = document.getElementById('whatsapp-messages');
    if (!messagesContainer) return;
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'whatsapp-bubble bot typing-indicator';
    typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    chatSetTimeout(() => {
        if (typingIndicator.parentNode === messagesContainer) {
            messagesContainer.removeChild(typingIndicator);
        }
        addMessage(text, 'bot');
    }, 1000 + Math.random() * 500);
}

function showOptions(options) {
    const inputContainer = document.getElementById('whatsapp-input');
    if (!inputContainer) return;
    inputContainer.innerHTML = '';
    const optionsWrapper = document.createElement('div');
    optionsWrapper.className = 'whatsapp-options';

    options.forEach(optionText => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.onclick = () => handleOptionClick(optionText);
        optionsWrapper.appendChild(button);
    });

    inputContainer.appendChild(optionsWrapper);
    gsap.from(optionsWrapper, { opacity: 0, y: 20, duration: 0.5 });
}

function handleOptionClick(optionText) {
    addMessage(optionText, 'user');
    const inputContainer = document.getElementById('whatsapp-input');
    if (inputContainer) inputContainer.innerHTML = '';

    const nextStepIndex = chatFlow.findIndex(step => step.trigger === optionText);
    if (nextStepIndex !== -1) {
        currentStep = nextStepIndex;
        processNextStep();
    } else {
        addBotMessage("No entendí esa opción. Reiniciando la conversación.");
        chatSetTimeout(() => {
            resetAndStartChat();
        }, 2000);
    }
}

let lastHighlightedNode = null;
function highlightNode(nodeId) {
    if (lastHighlightedNode) {
        lastHighlightedNode.classList.remove('active');
    }

    if (!nodeId) return;

    const nodeElement = document.querySelector(`[id^="flowchart-svg-${nodeId}"]`);

    if (nodeElement) {
        nodeElement.classList.add('active');
        lastHighlightedNode = nodeElement;
    }
}


function initializeFlowchart() {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
            background: '#1a1a1a',
            primaryColor: '#2a2a3a',
            primaryTextColor: '#fff',
            lineColor: '#4a4a4a',
            textColor: '#fff',
        },
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
        }
    });

    const flowPanel = document.getElementById('flow-panel');
    const graphDefinition = `
        graph TD
            A[<div class=node-content><i class='fab fa-whatsapp'></i> WhatsApp Trigger</div>]:::whatsapp
            B[<div class=node-content><i class='fas fa-brain'></i> IA Decision</div>]:::ai
            C[<div class=node-content><i class='fas fa-database'></i> Database Query</div>]:::db
            D[<div class=node-content><i class='fas fa-credit-card'></i> Payment API</div>]:::api
            E[<div class=node-content><i class='fas fa-paper-plane'></i> Send Message</div>]:::send

            A --o B
            B -- Rastrear pedido --> C
            B -- Ver catálogo --> E
            B -- Hablar con agente --> E
            C --> E
            B -- Opción de pago o-- D
            D --o E

            classDef whatsapp fill:#25D366,stroke:#128C7E,stroke-width:2px,color:#fff;
            classDef ai fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff;
            classDef db fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff;
            classDef api fill:#f97316,stroke:#c2410c,stroke-width:2px,color:#fff;
            classDef send fill:#00d9ff,stroke:#0891b2,stroke-width:2px,color:#fff;
    `;

    const nodeTooltips = {
        A: "Recibe el mensaje inicial del usuario vía WhatsApp.",
        B: "El modelo de IA procesa la entrada del usuario y decide el siguiente paso.",
        C: "Consulta la base de datos para recuperar información del pedido.",
        D: "Se conecta a la pasarela de pago para procesar una transacción.",
        E: "Envía un mensaje de respuesta al usuario en WhatsApp."
    };

    mermaid.render('flowchart-svg', graphDefinition, (svgCode) => {
        if (flowPanel) {
            flowPanel.innerHTML = svgCode;
            const tooltip = document.createElement('div');
            tooltip.className = 'flow-tooltip';
            document.body.appendChild(tooltip);

            const nodes = flowPanel.querySelectorAll('.node');
            nodes.forEach(node => {
                const nodeId = node.id.split('-')[2];
                const tooltipText = nodeTooltips[nodeId];

                if (tooltipText) {
                    node.addEventListener('mouseover', () => {
                        tooltip.innerHTML = tooltipText;
                        tooltip.style.opacity = 1;
                    });
                    node.addEventListener('mousemove', (e) => {
                        tooltip.style.left = `${e.pageX + 15}px`;
                        tooltip.style.top = `${e.pageY + 15}px`;
                    });
                    node.addEventListener('mouseout', () => {
                        tooltip.style.opacity = 0;
                    });
                }
            });
        }
    });
}


// SLIDE 2: ETL Pipeline Demo
function initializeEtlDemo() {
    const slider = document.getElementById('doc-volume-slider');
    const volumeLabel = document.getElementById('doc-volume-label');
    const runButton = document.getElementById('run-etl-button');
    const counterElement = document.getElementById('processed-docs-counter');
    const pipelineContainer = document.getElementById('etl-pipeline-container');
    const chartCanvas = document.getElementById('doc-type-chart');

    if (!slider) return; // Exit if the demo elements are not on the page

    let isRunning = false;
    let chart;

    // Initial HTML structure for the pipeline
    pipelineContainer.innerHTML = `
        <div class="etl-stage" id="etl-input">
            <div class="icon-container"><div id="lottie-excel" style="width: 40px; height: 40px;"></div></div>
            <span class="label">Input</span>
        </div>
        <div class="etl-arrow"><i class="fas fa-arrow-right"></i></div>
        <div class="etl-stage" id="etl-processing">
            <div class="icon-container"><i class="fas fa-cogs"></i></div>
            <span class="label">Processing</span>
            <div class="progress-bar-container"><div class="progress-bar"></div></div>
            <span class="processing-step-label"></span>
        </div>
        <div class="etl-arrow"><i class="fas fa-arrow-right"></i></div>
        <div class="etl-stage" id="etl-merge">
            <div class="icon-container"><i class="fas fa-file-invoice"></i></div>
            <span class="label">Template Merge</span>
        </div>
        <div class="etl-arrow"><i class="fas fa-arrow-right"></i></div>
        <div class="etl-stage" id="etl-output">
            <div class="icon-container"><i class="fas fa-file-pdf"></i></div>
            <span class="label">Output</span>
        </div>
    `;

    const lottieContainer = document.getElementById('lottie-excel');
    if(lottieContainer) {
        lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets-v2.lottiefiles.com/a/cb3cea46-116b-11ee-98ef-ebb74e1b9a88/urzRrrBDyX.lottie'
        });
    }

    const counter = new CountUp(counterElement, 0, { duration: 3 });

    function createChart() {
        const ctx = chartCanvas.getContext('2d');
        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Facturas', 'Contratos', 'Reportes'],
                datasets: [{
                    data: [50, 30, 20],
                    backgroundColor: ['#00d9ff', '#8b5cf6', '#10b981'],
                    borderColor: '#141420',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#e5e7eb',
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    function resetPipeline() {
        document.querySelectorAll('.etl-stage').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.etl-arrow').forEach(el => el.classList.remove('visible'));
        const progressBar = document.querySelector('#etl-processing .progress-bar');
        if(progressBar) progressBar.style.width = '0%';
        const stepLabel = document.querySelector('#etl-processing .processing-step-label');
        if(stepLabel) stepLabel.textContent = '';
        counter.reset();
    }

    async function runEtlProcess() {
        if (isRunning) return;
        isRunning = true;
        runButton.disabled = true;
        resetPipeline();

        const volume = parseInt(slider.value, 10);
        // Scale duration based on volume for a more realistic simulation
        const dynamicDuration = 500 + (volume / 10000) * 1500;

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        // 1. Input
        document.getElementById('etl-input').classList.add('active');
        await sleep(dynamicDuration);
        document.querySelector('.etl-arrow:nth-of-type(1)').classList.add('visible');

        // 2. Processing
        const processingStage = document.getElementById('etl-processing');
        processingStage.classList.add('active');
        const progressBar = processingStage.querySelector('.progress-bar');
        const stepLabel = processingStage.querySelector('.processing-step-label');

        await sleep(dynamicDuration / 2);
        stepLabel.textContent = 'Parsing...';
        progressBar.style.width = '33%';
        await sleep(dynamicDuration);

        stepLabel.textContent = 'Validating...';
        progressBar.style.width = '66%';
        await sleep(dynamicDuration);

        stepLabel.textContent = 'Transforming...';
        progressBar.style.width = '100%';
        await sleep(dynamicDuration / 2);
        document.querySelector('.etl-arrow:nth-of-type(2)').classList.add('visible');

        // 3. Template Merge
        document.getElementById('etl-merge').classList.add('active');
        counter.update(volume); // This is already linked to the slider value
        await sleep(dynamicDuration);
        document.querySelector('.etl-arrow:nth-of-type(3)').classList.add('visible');

        // 4. Output
        document.getElementById('etl-output').classList.add('active');
        await sleep(dynamicDuration);

        isRunning = false;
        runButton.disabled = false;
    }

    slider.addEventListener('input', (e) => {
        volumeLabel.textContent = e.target.value;
    });

    runButton.addEventListener('click', runEtlProcess);

    createChart();
    resetPipeline();
}