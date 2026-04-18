document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const backToTop = document.querySelector('.back-to-top');
  const searchInput = document.querySelector('.search-bar input');
  const searchResults = document.querySelector('.search-results');
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

  mobileMenuBtn?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
    updateActiveLink();
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('.chapter, .section[id]');
    const links = document.querySelectorAll('.sidebar-link');
    let current = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150) {
        current = section.id || '';
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', () => {
      header.classList.toggle('open');
      const body = header.nextElementSibling;
      body.classList.toggle('open');
    });
  });

  const searchableContent = [];
  document.querySelectorAll('.subsection, .concept-box').forEach((el, i) => {
    const text = el.textContent.trim();
    const heading = el.querySelector('h4, h5')?.textContent || '';
    const chapter = el.closest('.chapter')?.querySelector('h2')?.textContent || '';
    if (heading) {
      searchableContent.push({ text, heading, chapter, id: 'search-' + i });
      el.id = 'search-' + i;
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        searchResults.classList.remove('visible');
        return;
      }

      const matches = searchableContent.filter(item =>
        item.heading.toLowerCase().includes(query) ||
        item.text.toLowerCase().includes(query)
      ).slice(0, 8);

      if (matches.length === 0) {
        searchResults.classList.remove('visible');
        return;
      }

      searchResults.innerHTML = matches.map(m =>
        `<div class="search-result-item" data-id="${m.id}">
          <div>${m.heading}</div>
          <div class="result-chapter">${m.chapter}</div>
        </div>`
      ).join('');

      searchResults.classList.add('visible');

      searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const target = document.getElementById(item.dataset.id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.style.outline = '2px solid var(--accent-blue)';
            setTimeout(() => target.style.outline = '', 2000);
          }
          searchResults.classList.remove('visible');
          searchInput.value = '';
        });
      });
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('visible');
      }
    });
  }

  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        sidebar.classList.remove('open');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.concept-box, .comparison-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 0.4s, transform 0.4s';
    observer.observe(el);
  });
});
