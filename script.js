// ===== PAGE LOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("loader-hide");
      setTimeout(() => {
        loader.remove();
      }, 1000);
    }, 2200);
  }
});

// ===== 1. TYPED.JS INITIALIZATION =====
const typed = new Typed('#typed', {
  strings: ['FRONTEND DEVELOPER', 'UI/UX CREATOR', 'WEB ANIMATION SPECIALIST', 'MODERN WEB DESIGNER', 'SALESFORCE DEVELOPER'],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
  backDelay: 1500
});

// ===== 2. NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function () {
  const nav = document.getElementById('mainNavbar');
  if (!nav) return;
  
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
    nav.classList.remove('bg-transparent');
  } else {
    nav.classList.remove('scrolled');
    nav.classList.add('bg-transparent');
  }
});

// ===== 3. AUTO-CLOSE MOBILE NAVIGATION MENU =====
document.addEventListener('click', e => {
  const nav = document.getElementById('navMenu');
  const btn = document.querySelector('.navbar-toggler');
  if (!nav || !btn) return;

  if (nav.classList.contains('show') && !nav.contains(e.target) && !btn.contains(e.target)) {
    const instance = bootstrap.Collapse.getInstance(nav);
    if (instance) {
      instance.hide();
    }
  }
});

// ===== 4. PARTICLES ENGINE INITIALIZATION =====
if (document.getElementById('particles-js')) {
  particlesJS('particles-js', {
    "particles": {
      "number": { "value": 60 },
      "color": { "value": "#00f2ff" },
      "opacity": { "value": 0.3 },
      "size": { "value": 2 },
      "line_linked": { "enable": true, "distance": 150, "color": "#00f2ff", "opacity": 0.1, "width": 1 },
      "move": { "enable": true, "speed": 1 }
    }
  });
}

// ===== 5. EMAILJS DISPATCH & FORM HANDLING =====
(function () {
  emailjs.init("SQ78HLiRkro3gxfPs");
})();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.sendForm('service_hfv47j7', 'template_6uqvrmc', this).then(() => {
      alert('Message sent successfully!');
      contactForm.reset();
    }, (error) => {
      alert('Failed to send message. Please try again.');
    });
  });
}

// ===== 6. SCROLL-RESPONSIVE SKILLS MARQUEE DIRECTION =====
let lastScrollPosition = 0;
let currentDirection = 'left';
const skillsTrack = document.getElementById('skillsTrack');

window.addEventListener('scroll', function () {
  if (!skillsTrack) return;
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollPosition) {
    if (currentDirection !== 'left') {
      skillsTrack.style.animationName = 'scroll-left';
      currentDirection = 'left';
    }
  } else {
    if (currentDirection !== 'right') {
      skillsTrack.style.animationName = 'scroll-right';
      currentDirection = 'right';
    }
  }
  lastScrollPosition = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });

// ===== 7. CINEMATIC PROJECT SCROLL ENGINE =====
const section = document.querySelector(".cinematic-projects");
const slides = document.querySelectorAll(".project-slide");
const dots = document.querySelectorAll(".progress-dot");

function updateProjectSlides() {
  if (!section || slides.length === 0) return;

  const rect = section.getBoundingClientRect();
  
  // Calculate exact percentage progress down into the pin sequence
  const totalScrollableSpace = section.offsetHeight - window.innerHeight;
  const progress = Math.min(Math.max(-rect.top / totalScrollableSpace, 0), 1);

  // Map progress to current slide array index bounds
  const index = Math.round(progress * (slides.length - 1));

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function projectLoop() {
  updateProjectSlides();
  requestAnimationFrame(projectLoop);
}
projectLoop();

// ===== 8. CUSTOM VIRTUAL INERTIA SMOOTH SCROLL ENGINE =====
window.smoothY = 0;

window.addEventListener("load", () => {
  const content = document.getElementById("smooth-content");
  if (!content) return;

  let current = 0;
  let target = 0;
  const ease = 0.08;

  function setHeight() {
    document.body.style.height = content.scrollHeight + "px";
  }

  setHeight();
  
  // Recalculate sizing layouts on orientation adjustments or window sizing scaling
  window.addEventListener("resize", setHeight);
  window.addEventListener("scroll", () => {
    target = window.scrollY;
  });

  function animate() {
    current += (target - current) * ease;
    window.smoothY = current;
    
    content.style.transform = `translate3d(0, ${-current}px, 0)`;
    requestAnimationFrame(animate);
  }
  animate();
});

// ===== 9. INERTIA-AWARE ON-SCROLL ELEMENT REVEALS =====
const reveals = document.querySelectorAll(".reveal");

function revealCheck() {
  reveals.forEach(el => {
    // Collect bounding details cleanly relative to active transformed viewport layers
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add("active");
    }
  });
  requestAnimationFrame(revealCheck);
}
revealCheck();
