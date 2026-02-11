const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const revealElements = document.querySelectorAll('.reveal, .section-animate');
const counters = document.querySelectorAll('[data-count]');
const form = document.querySelector('.contact-form');
const formFeedback = document.getElementById('formFeedback');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(expanded));
});

const closeMenu = () => {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
};

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.count);
      const duration = 1200;
      const startTime = performance.now();

      const update = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        const value = Math.floor(eased * target);

        el.textContent = `${value}${target === 100 ? '%' : '+'}`;

        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => countObserver.observe(counter));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formFeedback.textContent = '¡Gracias! Recibimos tu solicitud y te contactaremos a la brevedad.';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();

const tiltCards = document.querySelectorAll('[data-tilt-card]');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    if (window.matchMedia('(max-width: 760px)').matches) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
