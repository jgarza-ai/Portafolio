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

// Initialize Swiper
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
        slideChangeTransitionStart: function () {
            // Reset animations on slide change
            const activeSlide = this.slides[this.activeIndex];
            const chatContainer = activeSlide.querySelector('.chat-demo-container');
            if (chatContainer) {
                chatContainer.innerHTML = '';
                startChatAnimation(chatContainer);
            }
            const chartBars = activeSlide.querySelectorAll('.chart-bar');
            if (chartBars.length > 0) {
                chartBars.forEach(bar => {
                    bar.style.animation = 'none';
                    void bar.offsetWidth; // Trigger reflow
                    bar.style.animation = '';
                });
            }
        },
    },
});

// Slide 1: Chatbot Animation
function startChatAnimation(container) {
    if (!container) return;
    const messages = [
        { text: 'Hello! How can I help you today?', sender: 'bot' },
        { text: 'I want to know my order status.', sender: 'user' },
        { text: 'Sure! What is your order number?', sender: 'bot' },
        { text: 'It is 123456.', sender: 'user' },
        { text: 'Your order has been shipped and will arrive tomorrow.', sender: 'bot' }
    ];

    let delay = 500;
    messages.forEach(message => {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = `chat-demo-bubble ${message.sender}`;
            bubble.textContent = message.text;
            container.appendChild(bubble);
            container.scrollTop = container.scrollHeight;
        }, delay);
        delay += 1500;
    });
}

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


// Initialize
createParticles();
// Trigger initial chat animation for the first slide if it's the chatbot
const initialChatContainer = document.querySelector('.swiper-slide-active .chat-demo-container');
if (initialChatContainer) {
    startChatAnimation(initialChatContainer);
}

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