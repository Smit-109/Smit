// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Smooth scroll to content
function scrollToContent() {
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .timeline-item, .stat-card, .benchmark-card').forEach(el => {
        observer.observe(el);
    });
}

// Active navigation highlighting
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Attention mechanism interactive demo
function setupAttentionDemo() {
    const tokens = document.querySelectorAll('.token');

    tokens.forEach(token => {
        token.addEventListener('click', () => {
            const tokenIndex = Array.from(tokens).indexOf(token);
            updateAttentionWeights(tokenIndex);
        });

        token.addEventListener('mouseenter', () => {
            const tokenIndex = Array.from(tokens).indexOf(token);
            highlightAttention(tokenIndex);
        });

        token.addEventListener('mouseleave', () => {
            resetAttentionWeights();
        });
    });
}

function updateAttentionWeights(focusIndex) {
    const bars = document.querySelectorAll('.weight-bar');
    const weights = [0.2, 0.4, 0.1, 0.8, 0.3, 0.1];

    bars.forEach((bar, i) => {
        const weight = i === focusIndex ? 1.0 : weights[i];
        bar.style.setProperty('--weight', weight);
        bar.classList.toggle('active', i === focusIndex);
    });
}

function highlightAttention(tokenIndex) {
    const bars = document.querySelectorAll('.weight-bar');
    bars.forEach((bar, i) => {
        if (i === tokenIndex) {
            bar.classList.add('active');
        }
    });
}

function resetAttentionWeights() {
    const bars = document.querySelectorAll('.weight-bar');
    bars.forEach((bar, i) => {
        bar.style.setProperty('--weight', bar.dataset.originalWeight || 0.5);
        bar.classList.remove('active');
    });
}

// Chart hover effect
function setupChartInteractivity() {
    const bars = document.querySelectorAll('.chart-bar');

    bars.forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            bar.style.transform = 'scaleY(1.1)';
        });

        bar.addEventListener('mouseleave', () => {
            bar.style.transform = 'scaleY(1)';
        });
    });
}

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimations();
    setupActiveNavigation();
    setupAttentionDemo();
    setupChartInteractivity();
    setupNavbarScroll();

    // Animate counters when stats section comes into view
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;

    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});
