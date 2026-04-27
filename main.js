const resumeData = {
    profile: {
        name: "Smit Patel",
        domain: "AI Developer and Cyber Security Enthusiast",
        heroStats: [
            { value: "10+", label: "Projects" },
            { value: "5+", label: "Internships" },
            { value: "2+", label: "Years Building" },
            { value: "30%", label: "Profile Unlocked" }
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
            title: "Evolvo 2048",
            tech: "Flutter",
            description: "Cross-platform puzzle game shipped to production with polished mobile interactions.",
            link: "#"
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

const state = {
    scroll: {
        lenis: null
    }
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
            <article class="project-card tilt-card magnetic">
                <h3>${project.title}</h3>
                <span class="project-meta">${project.tech}</span>
                <p>${project.description}</p>
                <a class="project-link" href="${project.link}" aria-label="View ${project.title} project details">View details</a>
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
            <article class="contact-item magnetic">
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
        toggle.textContent = "Dark";
    }

    toggle.addEventListener("click", () => {
        const isLight = root.getAttribute("data-theme") === "light";
        if (isLight) {
            root.removeAttribute("data-theme");
            localStorage.setItem("portfolio-theme", "dark");
            toggle.textContent = "Light";
        } else {
            root.setAttribute("data-theme", "light");
            localStorage.setItem("portfolio-theme", "light");
            toggle.textContent = "Dark";
        }
    });
}

function setupCustomCursor() {
    const dot = document.querySelector(".cursor-dot");
    const glow = document.querySelector(".cursor-glow");

    if (window.matchMedia("(hover: none)").matches) {
        return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gx = x;
    let gy = y;

    window.addEventListener("pointermove", (event) => {
        x = event.clientX;
        y = event.clientY;
        dot.style.transform = `translate(${x}px, ${y}px)`;
    });

    function loop() {
        gx += (x - gx) * 0.15;
        gy += (y - gy) * 0.15;
        glow.style.transform = `translate(${gx}px, ${gy}px)`;
        requestAnimationFrame(loop);
    }

    loop();
}

function setupMagneticButtons() {
    const targets = document.querySelectorAll(".magnetic");

    targets.forEach((element) => {
        element.addEventListener("mousemove", (event) => {
            const rect = element.getBoundingClientRect();
            const mx = event.clientX - rect.left - rect.width / 2;
            const my = event.clientY - rect.top - rect.height / 2;
            element.style.transform = `translate3d(${mx * 0.08}px, ${my * 0.08}px, 0)`;
        });

        element.addEventListener("mouseleave", () => {
            element.style.transform = "translate3d(0, 0, 0)";
        });
    });
}

function setupProjectTilt() {
    const cards = document.querySelectorAll(".tilt-card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;
            const rotateY = (px - 0.5) * 13;
            const rotateX = (0.5 - py) * 11;
            card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
        });
    });
}

function setupSectionSpy() {
    const links = document.querySelectorAll(".nav-link");
    const sections = [...document.querySelectorAll("main section, header.section")];

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                links.forEach((link) => {
                    const active = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("active", active);
                });
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
}

function setupSmoothScroll() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    if (!window.Lenis) {
        return;
    }

    const lenis = new window.Lenis({
        duration: 1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        gestureOrientation: "vertical"
    });

    state.scroll.lenis = lenis;

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (window.ScrollTrigger) {
        lenis.on("scroll", () => {
            window.ScrollTrigger.update();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            lenis.scrollTo(target, {
                offset: -72,
                duration: 1.1,
                easing: (t) => 1 - Math.pow(1 - t, 3)
            });
        });
    });
}

function setupScrollProgress() {
    const progress = document.getElementById("scrollProgress");
    if (!progress) {
        return;
    }

    const updateProgress = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) {
            progress.style.transform = "scaleX(0)";
            return;
        }

        const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        progress.style.transform = `scaleX(${ratio})`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
}

function setupPreloader() {
    const preloader = document.getElementById("preloader");

    const hidePreloader = () => {
        preloader.classList.add("is-hidden");
    };

    window.addEventListener("load", () => {
        setTimeout(hidePreloader, 450);
    });
}

function setupContactForm() {
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        feedback.textContent = "Thanks. Your message has been queued locally for this demo.";
        form.reset();
    });
}

function setupGsapAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.to("[data-reveal]", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.11
    });

    const animateOnScroll = [".skill-card", ".project-card", ".timeline-item", ".contact-item", ".contact-form"];
    animateOnScroll.forEach((selector) => {
        gsap.to(selector, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: selector,
                start: "top 84%"
            }
        });
    });

    gsap.utils.toArray(".skill-fill").forEach((fill) => {
        const level = Number(fill.dataset.level || 0);
        gsap.to(fill, {
            width: `${level}%`,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: fill,
                start: "top 92%"
            }
        });
    });
}

function setupLazyHeroScene() {
    const heroCanvas = document.getElementById("hero-canvas");
    if (!heroCanvas) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            const [entry] = entries;
            if (!entry.isIntersecting) {
                return;
            }

            if (typeof window.createHeroScene === "function") {
                window.createHeroScene({
                    container: heroCanvas,
                    lowMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                });
            }

            observer.disconnect();
        },
        { threshold: 0.15 }
    );

    observer.observe(heroCanvas);
}

function init() {
    renderResume();
    setupPreloader();
    setupMobileMenu();
    setupThemeToggle();
    setupContactForm();
    setupCustomCursor();
    setupMagneticButtons();
    setupProjectTilt();
    setupSectionSpy();
    setupSmoothScroll();
    setupScrollProgress();
    setupLazyHeroScene();
    setupGsapAnimations();
}

document.addEventListener("DOMContentLoaded", init);
