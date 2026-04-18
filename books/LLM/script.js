document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initAccordions();
  initQuiz();
  initScrollSpy();
  initReadingProgress();
  initSearch();
});

function initTheme() {
  const toggle = document.querySelector('.theme-toggle');
  const saved = localStorage.getItem('nf-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nf-theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) toggle.textContent = theme === 'dark' ? '\u2600' : '\uD83C\uDF19';
}

function initSidebar() {
  const menuBtn = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.mobile-overlay');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar && window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
      }
    });
  });
}

function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');
      if (isOpen) {
        item.classList.remove('open');
        body.style.maxHeight = null;
      } else {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

function initQuiz() {
  document.querySelectorAll('.quiz-block').forEach(block => {
    const options = block.querySelectorAll('.quiz-option');
    const feedback = block.querySelector('.quiz-feedback');
    const correctIdx = parseInt(block.getAttribute('data-answer') || '0');

    options.forEach((opt, idx) => {
      opt.addEventListener('click', () => {
        options.forEach(o => {
          o.classList.remove('correct', 'wrong');
          o.style.pointerEvents = 'none';
        });
        if (idx === correctIdx) {
          opt.classList.add('correct');
          if (feedback) {
            feedback.className = 'quiz-feedback show correct';
            feedback.textContent = 'Correct! Well done.';
          }
        } else {
          opt.classList.add('wrong');
          if (options[correctIdx]) options[correctIdx].classList.add('correct');
          if (feedback) {
            feedback.className = 'quiz-feedback show wrong';
            feedback.textContent = 'Not quite. The correct answer is highlighted in green.';
          }
        }
      });
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('[data-section]');
  const links = document.querySelectorAll('.nav-link[data-section]');

  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const id = entry.target.getAttribute('data-section');
        const link = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

function initReadingProgress() {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  });
}

function initSearch() {
  const input = document.querySelector('.search-box input');
  if (!input) return;

  const searchData = buildSearchIndex();

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (query.length < 2) return;

    const matches = searchData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length > 0) {
      const target = document.querySelector(matches[0].href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    input.value = '';
  });
}

function buildSearchIndex() {
  const items = [];
  document.querySelectorAll('[data-searchable]').forEach(el => {
    const title = el.getAttribute('data-searchable') || el.querySelector('h1, h2, h3')?.textContent || '';
    const content = el.textContent.substring(0, 300);
    const id = el.id;
    if (id) items.push({ title, content, href: '#' + id });
  });
  return items;
}
