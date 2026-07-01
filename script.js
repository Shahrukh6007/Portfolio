// Page Loader
window.addEventListener("load", () => {

   const loader = document.getElementById("page-loader");

   setTimeout(() => {

       loader.classList.add("loader-hide");

       setTimeout(()=>{
           loader.remove();
       },1000);

   }, 2200);

});


// 1. Typed.js Initialization
const typed = new Typed('#typed', {
  strings: ['PHP DEVELOPER', 'FRONTEND DEVELOPER', 'BACKEND DEVELOPER' , 'UI/UX CREATOR', 'WEB ANIMATION SPECIALIST', 'MODERN WEB DESIGNER', 'SALESFORCE DEVELOPER'],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
  backDelay: 1500
});

// 2. Navbar Scroll Effect
window.addEventListener('scroll', function () {
  const nav = document.getElementById('mainNavbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
    nav.classList.remove('bg-transparent');
  } else {
    nav.classList.remove('scrolled');
    nav.classList.add('bg-transparent');
  }
});

// 3. Auto-close Menu
document.addEventListener('click', e => {
  const nav = document.getElementById('navMenu');
  const btn = document.querySelector('.navbar-toggler');
  if (nav.classList.contains('show') && !nav.contains(e.target) && !btn.contains(e.target)) {
    bootstrap.Collapse.getInstance(nav).hide();
  }
});

// 4. Particles Init
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

// emailjs initialization and form handling
(function () {
  emailjs.init("SQ78HLiRkro3gxfPs");
})();

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.sendForm('service_hfv47j7', 'template_6uqvrmc', this).then(() => {
    alert('Message sent successfully!');
    document.getElementById('contact-form').reset();
  }, (error) => {
    alert('Failed to send message. Please try again.');
  });
});

// Scroll-Responsive Skills Bar Animation
let lastScrollPosition = 0;
const skillsTrack = document.getElementById('skillsTrack');

window.addEventListener('scroll', function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollPosition) {
    // SCROLLING DOWN -> Move Bar Left
    skillsTrack.style.animationName = 'scroll-left';
  } else {
    // SCROLLING UP -> Move Bar Right
    skillsTrack.style.animationName = 'scroll-right';
  }

  // Smoothly update the last position
  lastScrollPosition = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });

/* =============================
   CINEMATIC PROJECT SCROLL ENGINE
============================= */

const section = document.querySelector(".cinematic-projects");
const slides = document.querySelectorAll(".project-slide");
const dots = document.querySelectorAll(".progress-dot");

function updateProjectSlides(){

    if(!section) return;

    const rect = section.getBoundingClientRect();

    /* progress inside section */
    const progress =
      Math.min(
        Math.max((-rect.top) / (section.offsetHeight - window.innerHeight),0),
      1);

    const index = Math.round(progress * (slides.length - 1));

    slides.forEach((slide,i)=>{
        slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot,i)=>{
        dot.classList.toggle("active", i === index);
    });
}

/* run continuously (works with smooth scroll) */
function projectLoop(){
    updateProjectSlides();
    requestAnimationFrame(projectLoop);
}

projectLoop();


// smooth scroll

window.addEventListener("load", () => {

  const content = document.getElementById("smooth-content");

  let current = 0;
  let target = 0;
  const ease = 0.08;

  /* GLOBAL SCROLL VALUE */
  window.smoothY = 0;

  function setHeight() {
    document.body.style.height =
      content.scrollHeight + "px";
  }

  setHeight();
  window.addEventListener("resize", setHeight);

  window.addEventListener("scroll", () => {
    target = window.scrollY;
  });

  function animate() {

    current += (target - current) * ease;

    /* expose smooth position */
    window.smoothY = current;

    content.style.transform =
      `translate3d(0, ${-current}px, 0)`;

    requestAnimationFrame(animate);
  }

  animate();

});

// reveal on scroll
const reveals = document.querySelectorAll(".reveal");

function revealCheck(){

  reveals.forEach(el=>{

      const top =
        el.offsetTop - window.smoothY;

      if(top < window.innerHeight * 0.85){
          el.classList.add("active");
      }
  });

  requestAnimationFrame(revealCheck);
}

revealCheck();

