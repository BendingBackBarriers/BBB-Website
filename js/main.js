// =============================================
// BENDING BACK BARRIERS — Main JS
// =============================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Active nav link ---
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
    link.classList.add('active');
  }
});

// --- Mobile nav toggle ---
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const bars = hamburger.querySelectorAll('span');
    bars.forEach(b => b.style.background = mobileNav.classList.contains('open') ? 'var(--gold)' : 'var(--white)');
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

// --- Animate numbers on scroll (impact section) ---
function animateNumber(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = String(target).includes('.');
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const impactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateNumber(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.impact-number[data-target], .hero-stat-number[data-target]').forEach(el => {
  impactObserver.observe(el);
});

// --- Scroll reveal for cards ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.program-card, .help-card, .team-card, .info-card, .impact-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});

// --- Featured program carousel ---
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const image = carousel.querySelector('[data-carousel-image]');
  const counter = carousel.querySelector('[data-carousel-counter]');
  const prevButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const thumbs = carousel.querySelectorAll('[data-carousel-thumb]');
  const slides = Array.from(thumbs).map((thumb) => ({
    src: thumb.dataset.src,
    alt: thumb.dataset.alt || ''
  }));

  if (!slides.length) {
    return;
  }

  let currentIndex = 0;

  function updateCarousel(index) {
    currentIndex = (index + slides.length) % slides.length;
    const slide = slides[currentIndex];
    image.src = slide.src;
    image.alt = slide.alt;
    counter.textContent = `${currentIndex + 1} / ${slides.length}`;

    thumbs.forEach((thumb) => {
      const thumbIndex = Number(thumb.dataset.carouselThumb);
      thumb.classList.toggle('is-active', thumbIndex === currentIndex);
      thumb.setAttribute('aria-selected', thumbIndex === currentIndex ? 'true' : 'false');
    });
  }

  prevButton.addEventListener('click', () => updateCarousel(currentIndex - 1));
  nextButton.addEventListener('click', () => updateCarousel(currentIndex + 1));

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      updateCarousel(Number(thumb.dataset.carouselThumb));
    });
  });

  updateCarousel(0);
});

// --- Contact form handler ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Azure Static Web Apps built-in forms POST to /__forms/contact
    // For now we show a success message (replace with actual endpoint)
    setTimeout(() => {
      const msg = document.createElement('div');
      msg.style.cssText = 'background:var(--navy);color:var(--white);padding:16px 20px;border-radius:4px;margin-top:16px;font-size:0.9rem;border-left:4px solid var(--gold);';
      msg.textContent = 'Thank you! Your message has been received. We\'ll be in touch soon.';
      contactForm.appendChild(msg);
      contactForm.reset();
      btn.textContent = originalText;
      btn.disabled = false;
    }, 1200);
  });
}
