'use strict';

// ===== LOADER =====
(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const countEl = loader.querySelector('.loader-count');
  const barEl = loader.querySelector('.loader-bar');
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * 100);
    countEl.textContent = String(value).padStart(3, '0');
    barEl.style.width = value + '%';
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      loader.classList.add('loader-done');
      document.body.classList.add('loaded');
      setTimeout(() => loader.remove(), 1000);
    }
  }
  requestAnimationFrame(tick);
})();

// ===== NAV =====
(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!nav) return;

  function updateScrollState() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

// ===== THEME TOGGLE =====
(function () {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const html = document.documentElement;
    const next = html.classList.contains('dark') ? 'light' : 'dark';
    html.classList.remove('dark', 'light');
    html.classList.add(next);
    localStorage.setItem('theme', next);
  });
})();

// ===== TYPED =====
new Typed('#typed', {
  strings: ['Laravel Developer', 'Backend Engineer', 'REST API Developer', 'Full-Stack Developer', 'UI-Focused Engineer'],
  typeSpeed: 55,
  backSpeed: 30,
  backDelay: 1800,
  loop: true,
  smartBackspace: true
});

// ===== CONTACT (EmailJS, lazy) =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    try {
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
        emailjs.init('SQ78HLiRkro3gxfPs');
      }
      await emailjs.sendForm('service_hfv47j7', 'template_6uqvrmc', contactForm);
      btn.textContent = 'Message sent ✓';
      contactForm.reset();
      setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 3000);
    } catch (err) {
      console.error('EmailJS error:', err);
      btn.textContent = 'Failed — try again';
      setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 3000);
    }
  });
}

// ===== FOOTER CLOCK =====
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const clockEl = document.getElementById('clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const istMs = now.getTime() + 5.5 * 3600000 + now.getTimezoneOffset() * 60000;
    const ist = new Date(istMs);
    const hh = String(ist.getHours()).padStart(2, '0');
    const mm = String(ist.getMinutes()).padStart(2, '0');
    const ss = String(ist.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hh}:${mm}:${ss} IST`;
  }
  updateClock();
  setInterval(updateClock, 1000);
})();

// ===== CURSOR =====
(function () {
  if (window.matchMedia('(hover: none)').matches) return;
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animate() {
    cx += (mx - cx) * 0.2;
    cy += (my - cy) * 0.2;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  })();

  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();

// ===== MAGNETIC HOVER =====
(function () {
  const targets = document.querySelectorAll('.nav-link, .nav-cta, .cta-link, .project-link, .form-submit');
  if (!targets.length) return;
  const strength = 0.35, radius = 90;
  let ticking = false, lx = 0, ly = 0;

  document.addEventListener('mousemove', e => {
    lx = e.clientX; ly = e.clientY;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      targets.forEach(el => {
        const r = el.getBoundingClientRect();
        const dx = lx - (r.left + r.width / 2);
        const dy = ly - (r.top + r.height / 2);
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < radius) {
          const pull = (1 - d / radius) * strength;
          el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        } else {
          el.style.transform = '';
        }
      });
      ticking = false;
    });
  }, { passive: true });
})();

// ===== REVEALS =====
(function () {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => observer.observe(el));
})();

// ===== SMOOTH SCROLL =====
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();