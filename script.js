
// ========================================
// AVYAY FOOD & HOSPITALITY
// Website interactions
// ========================================

// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

function closeMenu() {
  if (!mobileNav || !menuToggle) return;

  mobileNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');

  mobileNav.setAttribute('aria-hidden', 'true');
  mobileNav.inert = true;

  document.body.style.overflow = '';
}

function openMenu() {
  if (!mobileNav || !menuToggle) return;

  mobileNav.classList.add('is-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close menu');

  mobileNav.setAttribute('aria-hidden', 'false');
  mobileNav.inert = false;

  document.body.style.overflow = 'hidden';
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close navigation after selecting a link
mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Close navigation with Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

// Close navigation if viewport becomes desktop-sized
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});


// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealItems = document.querySelectorAll('.reveal');

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }

    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -35px 0px'
  });

  revealItems.forEach((item) => {
    observer.observe(item);
  });

} else {

  revealItems.forEach((item) => {
    item.classList.add('is-visible');
  });

}


// ========================================
// DYNAMIC COPYRIGHT YEAR
// ========================================

const yearElement = document.querySelector('#year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ========================================
// INITIAL NAVIGATION ACCESSIBILITY
// ========================================

if (mobileNav && menuToggle) {
  mobileNav.setAttribute('aria-hidden', 'true');
  mobileNav.inert = true;
  menuToggle.setAttribute('aria-expanded', 'false');
}
