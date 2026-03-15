document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. DATA RENDERING FROM data.js
    // ==========================================
    const data = window.portfolioData;

    // Render Hero
    const heroContainer = document.getElementById('hero-container');
    if (heroContainer && data.hero) {
        heroContainer.innerHTML = `
            <h2 class="text-ether font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-4 opacity-0" id="hero-subtitle">${data.hero.subtitle}</h2>
            <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight opacity-0" id="hero-title">${data.hero.name}</h1>
            <p class="text-gray-400 text-lg md:text-xl font-light max-w-xl mx-auto opacity-0" id="hero-desc">
                ${data.hero.description}
            </p>
            <div class="mt-10 opacity-0" id="hero-cta">
                <a href="${data.hero.ctaLink}" class="magnetic-btn inline-block relative group px-8 py-3 overflow-hidden rounded-full bg-transparent border border-ether text-ether font-medium tracking-wide transition-all duration-300 hover:bg-ether hover:text-navy hover:shadow-[0_0_20px_rgba(125,249,255,0.4)]">
                    <span class="relative z-10 block">${data.hero.ctaText}</span>
                </a>
            </div>
        `;
    }

    // Render Timeline
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer && data.timeline) {
        data.timeline.forEach((item, index) => {
            const isEven = index % 2 !== 0; // zero-based index: 0 is odd in UI, 1 is even in UI logic
            const alignmentClass = isEven ? 'md:text-right md:pr-12' : 'md:ml-auto md:text-left md:pl-12';
            const dotPosClass = isEven ? '-left-[9px] md:right-0 md:left-auto md:translate-x-1/2' : '-left-[9px] md:left-0 md:-translate-x-1/2';
            const highlightBorder = item.isHighlight ? `border border-${item.borderColorClass.split('-')[1]}/30` : '';

            const itemHtml = `
                <div class="relative pl-8 md:pl-0 md:w-1/2 mb-16 timeline-item ${alignmentClass}">
                    <div class="absolute w-4 h-4 rounded-full bg-navy border-2 ${item.borderColorClass} ${dotPosClass} top-1 timeline-dot ${item.shadowClass}"></div>
                    <div class="glass-card p-6 rounded-2xl timeline-content ${highlightBorder}">
                        <span class="${item.colorClass} font-mono text-sm">${item.year}</span>
                        <h3 class="text-2xl font-semibold text-white mt-1">${item.title}</h3>
                        <p class="text-gray-400 mt-2 font-light">${item.description}</p>
                    </div>
                </div>
            `;
            timelineContainer.insertAdjacentHTML('beforeend', itemHtml);
        });
    }

    // Render Elemental Grid
    const gridContainer = document.getElementById('elemental-grid-container');
    if (gridContainer && data.elementalGrid) {
        data.elementalGrid.forEach(gridItem => {
            const skillsHtml = gridItem.skills.map(skill => `<li>${skill}</li>`).join('');
            const cardHtml = `
                <div class="element-card glass-card p-8 rounded-3xl relative overflow-hidden group border ${gridItem.themeConfig.borderColorClass}" data-color="${gridItem.themeConfig.glowColor}">
                    <div class="absolute top-0 right-0 p-4 opacity-20 text-4xl group-hover:opacity-100 transition-opacity duration-500 blur-[2px] group-hover:blur-none">${gridItem.icon}</div>
                    <h3 class="text-2xl font-bold text-white mb-2 pt-4">${gridItem.name}</h3>
                    <h4 class="text-sm ${gridItem.themeConfig.textColorClass} font-mono mb-6 uppercase tracking-wider">${gridItem.subtitle}</h4>
                    <ul class="space-y-2 text-gray-300 font-light mb-8">
                        ${skillsHtml}
                    </ul>
                    <div class="project-link mt-auto">
                        <span class="block text-xs text-gray-500 uppercase tracking-wider mb-1">${gridItem.projectSurtitle}</span>
                        <a href="${gridItem.projectLink}" class="text-white font-medium ${gridItem.themeConfig.bgHoverColorClass} transition-colors inline-block relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] ${gridItem.themeConfig.underlineColorClass} after:scale-x-0 group-hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform">${gridItem.projectTitle}</a>
                    </div>
                </div>
            `;
            gridContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    // Render Footer
    const footerText = document.getElementById('footer-text');
    if (footerText && data.footer) {
        footerText.innerHTML = data.footer.text;
    }


    // ==========================================
    // 2. ANIMATIONS & INTERACTIONS (GSAP)
    // ==========================================
    gsap.registerPlugin(ScrollTrigger);

    // Particle System (with mouse dodge)
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: null, y: null, radius: 100 };

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener('resize', resize);
        resize();

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = Math.random() > 0.5 ? 'rgba(212, 175, 55, ' : 'rgba(125, 249, 255, ';
                this.alpha = Math.random() * 0.5 + 0.1;
                this.originalSpeedX = this.speedX;
                this.originalSpeedY = this.speedY;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Mouse dodge
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (mouse.x != null && distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Move away from mouse
                    this.x -= forceDirectionX * force * 5;
                    this.y -= forceDirectionY * force * 5;
                }
            }

            draw() {
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // Sacred Geometry SVG Drawing Animation
    const sacredPaths = document.querySelector('.sacred-paths');
    if (sacredPaths) {
        const shapes = sacredPaths.querySelectorAll('circle, polygon');
        
        shapes.forEach(shape => {
            const length = shape.getTotalLength ? shape.getTotalLength() : 500;
            shape.style.strokeDasharray = length;
            shape.style.strokeDashoffset = length;
        });

        const tlHero = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tlHero.to(shapes, {
            strokeDashoffset: 0,
            duration: 3,
            ease: 'power2.inOut',
            stagger: 0.1
        })
        .to('.sacred-paths', { opacity: 1, duration: 2 }, "-=3")
        .to('#hero-subtitle', { y: 0, opacity: 1, duration: 1 }, "-=1.5")
        .to('#hero-title', { y: 0, opacity: 1, duration: 1 }, "-=1.2")
        .to('#hero-desc', { y: 0, opacity: 1, duration: 1 }, "-=1")
        .to('#hero-cta', { y: 0, opacity: 1, duration: 1 }, "-=0.8")
        .to('#scroll-indicator', { opacity: 1, duration: 1 }, "-=0.5");
    }

    // Magnetic Button Effect
    const magneticBtn = document.querySelector('.magnetic-btn');
    if (magneticBtn) {
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(magneticBtn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(magneticBtn.querySelector('span'), {
                x: x * 0.15,
                y: y * 0.15,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        magneticBtn.addEventListener('mouseleave', () => {
            gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
            gsap.to(magneticBtn.querySelector('span'), { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
        });
    }

    // Mouse Parallax for Geometry and Card
    const geometry = document.getElementById('sacred-geometry');
    const heroCard = document.querySelector('.hero-content');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2; 
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        if (geometry) {
            gsap.to(geometry, { x: x * 30, y: y * 30, rotateX: y * 10, rotateY: x * 10, duration: 1, ease: 'power2.out' });
        }
        if (heroCard) {
            gsap.to(heroCard, { x: -x * 10, y: -y * 10, duration: 1.5, ease: 'power2.out' });
        }
    });

    // Ascension Timeline ScrollTrigger
    const timelineItems = gsap.utils.toArray('.timeline-item');
    timelineItems.forEach((item, i) => {
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        
        const isEven = i % 2 !== 0; 
        const xOffset = window.innerWidth > 768 ? (isEven ? 50 : -50) : 0;

        gsap.set(content, { opacity: 0, x: xOffset, y: 30 });
        gsap.set(dot, { scale: 0 });

        const tlItem = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        tlItem.to(dot, { scale: 1, duration: 0.4, ease: 'back.out(1.7)' })
              .to(content, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.2");
    });

    // Header reveal on scroll
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Elemental Grid Hover & Continuous Float Effects
    const cards = gsap.utils.toArray('.element-card');
    cards.forEach(card => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, {
            scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            onComplete: () => {
                // Start floating purely via GSAP after reveal
                gsap.to(card, {
                    y: "-=8",
                    duration: 2.5 + Math.random(),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        });

        const glowingColor = card.getAttribute('data-color');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                boxShadow: `0 15px 35px ${glowingColor}`,
                borderColor: glowingColor,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                borderColor: 'rgba(125, 249, 255, 0.1)',
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });
});
