// Interacciones UI ligeras optimizadas para rendimiento.
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const tiltCards = document.querySelectorAll('.tilt-card');

// Navbar: cambia aspecto al desplazarse.
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menú móvil animado.
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.classList.toggle('active');
  menu.classList.toggle('open');
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll con IntersectionObserver.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((el) => revealObserver.observe(el));

// Contadores animados.
const animateCount = (element, target) => {
  const duration = 1500;
  const startTime = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    element.textContent = target > 100 ? value.toLocaleString('es-MX') : value;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number(entry.target.dataset.target || 0);
        animateCount(entry.target, target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// Efecto 3D tilt en tarjetas de producto con microinteracción.
tiltCards.forEach((card) => {
  const maxTilt = 8;

  const handleMove = (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = ((centerY - y) / centerY) * maxTilt;

    card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  };

  const reset = () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', reset);
});

// Año automático en footer.
document.getElementById('year').textContent = new Date().getFullYear();

// Microinteracción del formulario.
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.textContent = '¡Solicitud enviada!';
  button.style.background = 'linear-gradient(135deg, #d7263d, #ff4c63)';
  button.style.boxShadow = '0 14px 28px rgba(215, 38, 61, .35)';

  setTimeout(() => {
    button.textContent = 'Enviar solicitud';
    button.removeAttribute('style');
    form.reset();
  }, 1800);
});
