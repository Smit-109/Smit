const resumeData = {
    profile: {
        name: "Smit Patel",
        domain: "AI Developer and Cyber Security Enthusiast",
        heroStats: [
            { value: "10+", label: "Projects" },
            { value: "5+", label: "Internships" },
            { value: "2+", label: "Years Building" },
        ]
    },
    about: {
        paragraphs: [
            "I am a Computer Science student focused on AI systems, developer tooling, and practical automation products.",
            "My workflow blends data-driven engineering with expressive front-end execution so products feel both intelligent and premium.",
            "This portfolio intentionally showcases only part of my journey and is designed to scale as I ship bigger projects."
        ],
        badges: ["Machine Learning", "MERN", "Django", "Flutter", "Cyber Security", "Data Science"]
    },
    skills: [
        {
            title: "Programming",
            items: [
                { name: "Python", level: 88 },
                { name: "Java", level: 85 },
                { name: "C++", level: 80 },
                { name: "JavaScript", level: 82 }
            ]
        },
        {
            title: "AI and Data",
            items: [
                { name: "Machine Learning", level: 87 },
                { name: "Data Analysis", level: 84 },
                { name: "Model Deployment", level: 74 },
                { name: "Prompt Engineering", level: 83 }
            ]
        },
        {
            title: "Frameworks",
            items: [
                { name: "MERN", level: 81 },
                { name: "Django", level: 86 },
                { name: "Flutter", level: 75 },
                { name: "REST APIs", level: 84 }
            ]
        },
        {
            title: "Core CS",
            items: [
                { name: "Data Structures", level: 86 },
                { name: "Algorithms", level: 82 },
                { name: "DBMS", level: 80 },
                { name: "OOP", level: 84 }
            ]
        }
    ],
    projects: [
        {
            title: "Evolvo: 2048 History Puzzle",
            tech: "Flutter · Live on Google Play",
            description: "Swipe to merge historical milestones — from Fire to the Digital Age. Features a Museum of Ages, progressive XP, and relaxing yet rewarding gameplay.",
            link: "https://play.google.com/store/apps/details?id=com.puzzlearcade.puzzle_2048"
        },
        {
            title: "PDF Master – All PDF Toolkit",
            tech: "Flutter · Live on Google Play",
            description: "All-in-one PDF toolkit: read, merge, split, extract text & images, and convert images to PDF — 100% offline and secure with no cloud uploads.",
            link: "https://play.google.com/store/apps/details?id=com.spcreation.pdfmaster"
        },
        {
            title: "PVF Studio Web Platform",
            tech: "MERN Stack",
            description: "Operational platform that streamlined studio workflows and improved day-to-day delivery.",
            link: "#"
        },
        {
            title: "Stock Analyzer",
            tech: "MERN + Angel One API",
            description: "Live and historical market analysis with data ingestion, filtering, and insight dashboards.",
            link: "#"
        },
        {
            title: "IPL Score Predictor",
            tech: "Machine Learning",
            description: "Match score prediction model trained on historical IPL data and feature-engineered inputs.",
            link: "#"
        },
        {
            title: "Stock Price Forecast",
            tech: "Machine Learning",
            description: "Forecasting pipeline exploring market trends using model ensembles and backtesting.",
            link: "#"
        },
        {
            title: "Secure Notes Concept",
            tech: "Cyber Security",
            description: "Experimental encrypted note management concept with privacy-first architecture.",
            link: "#"
        }
    ],
    experience: [
        {
            title: "AI First Engineer - Trainee",
            company: "Groovy Technoweb Pvt. Ltd.",
            date: "Jun 2025 - Present",
            detail: "Building AI-first solutions as a trainee engineer, working on real-world product features and delivery."
        },
        {
            title: "Data Science and Machine Learning Intern",
            company: "Brainy Beams",
            date: "May 2025 - Jun 2025",
            detail: "Built and tuned ML models while transforming noisy datasets into actionable insights."
        },
        {
            title: "Machine Learning Intern",
            company: "Infolabz",
            date: "Jul 2023 - Aug 2023",
            detail: "Developed foundational pipelines for feature engineering, model training, and result analysis."
        },
        {
            title: "Django Intern",
            company: "Infolabz",
            date: "Aug 2022 - Sep 2022",
            detail: "Worked on backend modules and scalable data handling with Django-based services."
        }
    ],
    contact: [
        { label: "Email", value: "officialsmit02@gmail.com", href: "mailto:officialsmit02@gmail.com" },
        { label: "Phone", value: "+91 63550 94230", href: "tel:+916355094230" },
        { label: "LinkedIn", value: "linkedin.com/in/smitpatel111", href: "https://linkedin.com/in/smitpatel111" },
        { label: "GitHub", value: "github.com/Smit-109", href: "https://github.com/Smit-109" }
    ]
};

function renderResume() {
    const heroStats = document.getElementById("heroStats");
    heroStats.innerHTML = resumeData.profile.heroStats
        .map(
            (stat) => `
                <div class="stat-pill">
                    <strong>${stat.value}</strong>
                    <span>${stat.label}</span>
                </div>
            `
        )
        .join("");

    const aboutParagraphs = document.getElementById("aboutParagraphs");
    aboutParagraphs.innerHTML = resumeData.about.paragraphs.map((p) => `<p class="about-line">${p}</p>`).join("");

    const aboutBadges = document.getElementById("aboutBadges");
    aboutBadges.innerHTML = resumeData.about.badges.map((badge) => `<span>${badge}</span>`).join("");

    const skillsGrid = document.getElementById("skillsGrid");
    skillsGrid.innerHTML = resumeData.skills
        .map(
            (group) => `
                <article class="skill-card">
                    <h3>${group.title}</h3>
                    ${group.items
                        .map(
                            (item) => `
                                <div class="skill-row">
                                    <div class="skill-row-head">
                                        <span>${item.name}</span>
                                        <span>${item.level}%</span>
                                    </div>
                                    <div class="skill-track">
                                        <div class="skill-fill" data-level="${item.level}"></div>
                                    </div>
                                </div>
                            `
                        )
                        .join("")}
                </article>
            `
        )
        .join("");

    const projectsGrid = document.getElementById("projectsGrid");
    projectsGrid.innerHTML = resumeData.projects
        .map(
            (project) => `
                <article class="project-card tilt-card">
                    <h3>${project.title}</h3>
                    <span class="project-meta">${project.tech}</span>
                    <p>${project.description}</p>
                    <a class="project-link" href="${project.link}" target="_blank" rel="noreferrer" aria-label="View ${project.title}">View details</a>
                </article>
            `
        )
        .join("");

    const timeline = document.getElementById("experienceTimeline");
    timeline.innerHTML = resumeData.experience
        .map(
            (item) => `
                <article class="timeline-item">
                    <h3>${item.company}</h3>
                    <p class="timeline-role">${item.title}</p>
                    <p class="timeline-date">${item.date}</p>
                    <p>${item.detail}</p>
                </article>
            `
        )
        .join("");

    const contactCards = document.getElementById("contactCards");
    contactCards.innerHTML = resumeData.contact
        .map(
            (entry) => `
                <article class="contact-item">
                    <span>${entry.label}</span>
                    <a href="${entry.href}" target="_blank" rel="noreferrer">${entry.value}</a>
                </article>
            `
        )
        .join("");
}

function setupMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        navLinks.classList.toggle("is-open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            toggle.setAttribute("aria-expanded", "false");
            navLinks.classList.remove("is-open");
        });
    });
}

function setupThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("portfolio-theme");

    if (storedTheme === "light") {
        root.setAttribute("data-theme", "light");
        toggle.textContent = "Dark Mode";
    }

    toggle.addEventListener("click", () => {
        const isLight = root.getAttribute("data-theme") === "light";
        if (isLight) {
            root.removeAttribute("data-theme");
            localStorage.setItem("portfolio-theme", "dark");
            toggle.textContent = "Light Mode";
        } else {
            root.setAttribute("data-theme", "light");
            localStorage.setItem("portfolio-theme", "light");
            toggle.textContent = "Dark Mode";
        }
    });
}

function setupSectionSpy() {
    const links = document.querySelectorAll(".nav-link");
    const sections = [...document.querySelectorAll("main section, header.section")];

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((link) => {
                    const active = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("active", active);
                });
            });
        },
        { threshold: 0.45 }
    );

    sections.forEach((section) => observer.observe(section));
}

function setupSmoothScroll() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
    if (!window.Lenis) return;

    const lenis = new window.Lenis({
        duration: 0.8,
        smoothWheel: true,
        wheelMultiplier: 0.7,
        touchMultiplier: 1,
        gestureOrientation: "vertical"
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (window.ScrollTrigger) {
        lenis.on("scroll", () => window.ScrollTrigger.update());
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            lenis.scrollTo(target, {
                offset: -64,
                duration: 1,
                easing: (t) => 1 - Math.pow(1 - t, 3)
            });
        });
    });
}

function setupContactForm() {
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = "Sending...";
        feedback.textContent = "";

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(Object.fromEntries(new FormData(form))),
            });
            const data = await res.json();
            if (data.success) {
                feedback.textContent = "Message sent. I will get back to you shortly.";
                feedback.style.color = "var(--brand)";
                form.reset();
            } else {
                feedback.textContent = data.message || "Something went wrong. Please try again.";
                feedback.style.color = "#f87171";
            }
        } catch {
            feedback.textContent = "Network error. Please try again.";
            feedback.style.color = "#f87171";
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });
}

function setupCustomCursor() {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;
    if (window.matchMedia("(hover: none)").matches) {
        dot.style.display = "none";
        ring.style.display = "none";
        return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    window.addEventListener("pointermove", (event) => {
        x = event.clientX;
        y = event.clientY;
        dot.style.transform = `translate(${x}px, ${y}px)`;
    });

    document.querySelectorAll("a, button, input, textarea, .card, .contact-item, .stat-pill").forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("ring-hover"));
        el.addEventListener("mouseleave", () => ring.classList.remove("ring-hover"));
    });

    function loop() {
        rx += (x - rx) * 0.12;
        ry += (y - ry) * 0.12;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(loop);
    }

    loop();
}

function setupMagneticButtons() {
    const targets = document.querySelectorAll(".magnetic");
    targets.forEach((el) => {
        el.addEventListener("mousemove", (event) => {
            const rect = el.getBoundingClientRect();
            const mx = event.clientX - rect.left - rect.width / 2;
            const my = event.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate3d(${mx * 0.06}px, ${my * 0.06}px, 0)`;
        });
        el.addEventListener("mouseleave", () => {
            el.style.transform = "translate3d(0, 0, 0)";
        });
    });
}

function setupTiltCards() {
    const cards = document.querySelectorAll(".tilt-card");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;
            const rotateY = (px - 0.5) * 8;
            const rotateX = (0.5 - py) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });
}

function animateStats() {
    const values = document.querySelectorAll(".stat-pill strong");
    const statData = resumeData.profile.heroStats;

    values.forEach((el, i) => {
        const raw = statData[i]?.value || "";
        const num = parseInt(raw.match(/\d+/)?.[0] || "0", 10);
        const suffix = (raw.match(/\D+$/) || [""])[0];
        let current = 0;
        const start = performance.now();
        const duration = 900;

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.round(eased * num);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    });
}

function createPreloaderParticles() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    const container = document.createElement("div");
    container.className = "preloader-particles";
    container.setAttribute("aria-hidden", "true");

    for (let i = 0; i < 50; i++) {
        const p = document.createElement("span");
        p.className = "preloader-particle";
        const size = 1.5 + Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dur = 3 + Math.random() * 4;
        const delay = Math.random() * 4;
        const dx = (Math.random() - 0.5) * 40;
        const dy = -(25 + Math.random() * 45);
        p.style.cssText = `
            left:${x}%;top:${y}%;
            width:${size}px;height:${size}px;
            animation-duration:${dur}s;
            animation-delay:${delay}s;
            --dx:${dx}px;--dy:${dy}px;
        `;
        container.appendChild(p);
    }

    preloader.appendChild(container);
}

function setupPreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    createPreloaderParticles();

    const hide = () => {
        preloader.classList.add("is-hidden");
        animateStats();
    };

    if (document.readyState === "complete") {
        setTimeout(hide, 1200);
    } else {
        window.addEventListener("load", () => setTimeout(hide, 1200));
    }
}

function setupGsapAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to("[data-reveal]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08
    });

    const animateOnScroll = [".skill-card", ".project-card", ".timeline-item", ".contact-item", ".contact-form"];
    animateOnScroll.forEach((selector) => {
        gsap.to(selector, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
                trigger: selector,
                start: "top 88%"
            }
        });
    });

    gsap.utils.toArray(".skill-fill").forEach((fill) => {
        const level = Number(fill.dataset.level || 0);
        gsap.to(fill, {
            width: `${level}%`,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: fill,
                start: "top 94%"
            }
        });
    });
}

function setupLazyHeroScene() {
    const heroCanvas = document.getElementById("hero-canvas");
    if (!heroCanvas) return;

    const observer = new IntersectionObserver(
        (entries) => {
            const [entry] = entries;
            if (!entry.isIntersecting) return;

            if (typeof window.createHeroScene === "function") {
                window.createHeroScene({
                    container: heroCanvas,
                    lowMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                });
            }
            observer.disconnect();
        },
        { threshold: 0.1 }
    );

    observer.observe(heroCanvas);
}

function init() {
    renderResume();
    setupPreloader();
    setupCustomCursor();
    setupMagneticButtons();
    setupTiltCards();
    setupMobileMenu();
    setupThemeToggle();
    setupContactForm();
    setupSectionSpy();
    setupSmoothScroll();
    setupLazyHeroScene();
    setupGsapAnimations();
}

document.addEventListener("DOMContentLoaded", init);