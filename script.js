'use strict';

// ===== PHASE 1 — LOADER =====

(function () {
  const loader = document.getElementById('loader');
  const countEl = loader.querySelector('.loader-count');
  const barEl = loader.querySelector('.loader-bar');

  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
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

// ===== PHASE 2 — NAV =====

(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  function updateScrollState() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

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
})();

// ===== PHASE 3 — HERO (Typed.js + kinetic type) =====

new Typed('#typed', {
  strings: [
    'Laravel Developer',
    'Backend Engineer',
    'REST API Developer',
    'Full-Stack Developer',
    'UI-Focused Engineer'
  ],
  typeSpeed: 55,
  backSpeed: 30,
  backDelay: 1800,
  loop: true,
  smartBackspace: true
});

// ===== PHASE 4 — MARQUEE SCROLL REACTIVITY =====

(function () {
  const tracks = document.querySelectorAll('.marquee-track');
  if (!tracks.length) return;

  let lastY = window.scrollY;
  let lastTime = performance.now();
  let currentSpeed = 1;
  let targetSpeed = 1;
  const baseDuration = 32;

  function updateMarqueeSpeed() {
    const now = performance.now();
    const dt = now - lastTime || 16;
    const dy = Math.abs(window.scrollY - lastY);
    const velocity = dy / dt;

    targetSpeed = 1 + Math.min(velocity * 2, 5);

    const scrollingDown = window.scrollY > lastY;
    tracks.forEach(track => {
      if (scrollingDown) track.classList.remove('reverse');
      else track.classList.add('reverse');
    });

    lastY = window.scrollY;
    lastTime = now;
  }

  function smoothSpeed() {
    currentSpeed += (targetSpeed - currentSpeed) * 0.08;
    targetSpeed += (1 - targetSpeed) * 0.03;

    tracks.forEach(track => {
      track.style.animationDuration = (baseDuration / currentSpeed) + 's';
    });

    requestAnimationFrame(smoothSpeed);
  }

  window.addEventListener('scroll', updateMarqueeSpeed, { passive: true });
  smoothSpeed();
})();

// ===== PHASE 8 — CONTACT FORM (EmailJS, lazy-loaded) =====

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

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

      submitBtn.textContent = 'Message sent ✓';
      contactForm.reset();
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
      submitBtn.textContent = 'Failed — try again';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// ===== FOOTER — YEAR + LIVE CLOCK =====

(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const clockEl = document.getElementById('clock');

  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const istMs = now.getTime() + (5.5 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000);
    const ist = new Date(istMs);
    const hh = String(ist.getHours()).padStart(2, '0');
    const mm = String(ist.getMinutes()).padStart(2, '0');
    const ss = String(ist.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hh}:${mm}:${ss} IST`;
  }

  updateClock();
  setInterval(updateClock, 1000);
})();

// ===== PHASE 9 — CUSTOM CURSOR =====

(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.2;
    curY += (mouseY - curY) * 0.2;
    cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll('a, button, .project-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();

// ===== PHASE 9 — MAGNETIC HOVER (throttled with rAF) =====

(function () {
  const magnetTargets = document.querySelectorAll('.nav-links a, .nav-cta, .cta-link, .project-link, .form-submit');
  if (!magnetTargets.length) return;

  const strength = 0.35;
  const radius = 90;

  let ticking = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  document.addEventListener('mousemove', (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      magnetTargets.forEach(el => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = lastMouseX - cx;
        const dy = lastMouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const pull = (1 - dist / radius) * strength;
          el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        } else {
          el.style.transform = '';
        }
      });
      ticking = false;
    });
  }, { passive: true });
})();

// ===== PHASE 9 — SCROLL REVEALS =====

(function () {
  const reveals = document.querySelectorAll('.about-lead, .about-text, .about-stats, .projects-heading, .skills-heading, .contact-heading, .contact-email, .contact-form, .skill-row, .stat');
  if (!reveals.length) return;

  reveals.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
})();

// ===== PHASE 9 — UNIFIED SMOOTH SCROLL FOR NAV LINKS =====

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