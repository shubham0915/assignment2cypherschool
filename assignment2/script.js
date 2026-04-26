// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Scroll reveal animation =====
const revealElements = document.querySelectorAll('.card, .tech-item, .arch-box, .iam-card');
revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Visitor counter (localStorage) =====
const visitorCountEl = document.getElementById('visitor-count');
let visits = parseInt(localStorage.getItem('visitor_count') || '0') + 1;
localStorage.setItem('visitor_count', visits);
if (visitorCountEl) {
  animateCount(visitorCountEl, 0, visits, 1000);
}

// ===== Uptime counter animation =====
const uptimeEl = document.getElementById('uptime');
if (uptimeEl) {
  // Simulate uptime calculation
  const startDate = new Date('2026-04-18');
  const now = new Date();
  const diffMs = now - startDate;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  uptimeEl.textContent = diffHours > 0 ? `${diffHours}h` : '99.9%';
}

// ===== Number animation helper =====
function animateCount(el, from, to, duration) {
  const start = performance.now();
  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(from + (to - from) * easeOut(progress));
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Active nav highlighting =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'white' : '';
  });
});

// ===== Terminal typing effect =====
const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.4s';
    line.style.opacity = '1';
  }, 500 + i * 400);
});

// ===== Easter egg: Konami code =====
let konamiCode = [];
const secret = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  if (konamiCode.join(',') === secret.join(',')) {
    document.body.style.animation = 'rainbow 0.5s linear infinite';
    setTimeout(() => document.body.style.animation = '', 3000);
    const style = document.createElement('style');
    style.textContent = `@keyframes rainbow { to { filter: hue-rotate(360deg); } }`;
    document.head.appendChild(style);
  }
});

// ===== Card hover 3D tilt =====
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c🚀 CloudSpace — AWS EC2 Assignment', 'font-size:18px; font-weight:bold; color:#7c3aed;');
console.log('%cBuilt by Shubham | Cipher Schools | Phase 2 | 2026', 'color:#8b949e;');
