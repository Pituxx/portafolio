/* ========================================
   DOM Elements
======================================== */
const header = document.querySelector('header');
const scrollProgress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const reveals = document.querySelectorAll('.reveal');
const typingText = document.querySelector('.typing-text');
const skillFills = document.querySelectorAll('.skill-fill');
const statNumbers = document.querySelectorAll('.stat-number');
const projectCards = document.querySelectorAll('.project-card');
const tabBtns = document.querySelectorAll('.tab-btn');

/* ========================================
   Typing Effect
======================================== */
const phrases = [
  'Desarrollador Web',
  'Game Developer',
  'Diseñador VR/AR',
  'Creador de Experiencias'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingDelay = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingDelay = 500;
  }

  setTimeout(typeEffect, typingDelay);
}

/* ========================================
   Particles Background
======================================== */
function createParticles() {
  const particlesContainer = document.getElementById('particles-js');

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';

    particlesContainer.appendChild(particle);
  }
}

/* ========================================
   Scroll Progress Bar
======================================== */
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = progress + '%';
}

/* ========================================
   Header Scroll Effect
======================================== */
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

/* ========================================
   Back to Top Button
======================================== */
function handleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========================================
   Smooth Scroll for Navigation Links
======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });

      // Close mobile menu if open
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

/* ========================================
   Active Navigation Link on Scroll
======================================== */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ========================================
   Reveal Animation on Scroll
======================================== */
function handleReveal() {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

/* ========================================
   Hamburger Menu Toggle
======================================== */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');

  if (navLinks.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

/* ========================================
   Project Filter Tabs
======================================== */
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      if (tab === 'all' || card.dataset.category === tab) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ========================================
   Skill Bars Animation
======================================== */
function animateSkillBars() {
  const skillsSection = document.querySelector('.skills-container');
  if (!skillsSection) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100) {
    skillFills.forEach(fill => {
      const width = fill.dataset.width;
      fill.style.width = width + '%';
    });
  }
}

/* ========================================
   Counter Animation
======================================== */
function animateCounters() {
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100) {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.count);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target;
        }
      };

      updateCounter();
    });
  }
}

/* ========================================
   Form Handling
======================================== */
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    // Inicializar EmailJS
    emailjs.init('CMorJ0aGAd6_pXp14');

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      // Obtener valores del formulario
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subjectSelect = document.getElementById('subject');
      const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;
      const message = document.getElementById('message').value;

      // Enviar con EmailJS
      emailjs.send('service_agv0vmp', 'template_62c10yt', {
        from_name: name,
        from_email: email,
        subject: subjectText,
        message: message
      })
      .then(function() {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        contactForm.reset();
      })
      .catch(function(error) {
        console.error('Error:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        submitBtn.style.background = 'linear-gradient(135deg, #f44336, #e53935)';
      })
      .finally(function() {
        setTimeout(function() {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      });
    });
  }
});

/* ========================================
   Mouse Parallax Effect on Hero Cards
======================================== */
const floatingCards = document.querySelectorAll('.floating-card');

if (floatingCards.length > 0) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    floatingCards.forEach((card, index) => {
      const speed = (index + 1) * 10;
      const x = mouseX * speed;
      const y = mouseY * speed;
      card.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

/* ========================================
   Intersection Observer for Animations
======================================== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

reveals.forEach(el => observer.observe(el));

/* ========================================
   Initialize
======================================== */
function init() {
  createParticles();
  typeEffect();

  // Initial year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll event listener (throttled)
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        handleHeaderScroll();
        handleBackToTop();
        updateActiveNavLink();
        handleReveal();
        animateSkillBars();
        animateCounters();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial calls
  handleReveal();
  updateScrollProgress();
}

document.addEventListener('DOMContentLoaded', init);

/* ========================================
   Utility: Debounce
======================================== */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
