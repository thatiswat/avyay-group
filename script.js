
/* ========================================
   AVYAY FOOD & HOSPITALITY
   Website Interactions
======================================== */

(() => {
  'use strict';

  /* ======================================
     DOM ELEMENTS
  ====================================== */

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const yearElement = document.querySelector('#year');

  const desktopBreakpoint = window.matchMedia('(min-width: 761px)');
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  /* ======================================
     MOBILE NAVIGATION
  ====================================== */

  if (menuToggle && mobileNav) {
    let previousBodyOverflow = '';

    const isMenuOpen = () =>
      menuToggle.getAttribute('aria-expanded') === 'true';

    function openMenu() {
      if (isMenuOpen()) return;

      previousBodyOverflow = document.body.style.overflow;

      mobileNav.classList.add('is-open');

      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close menu');

      mobileNav.setAttribute('aria-hidden', 'false');
      mobileNav.inert = false;

      document.body.style.overflow = 'hidden';

      // Move keyboard focus to the first navigation link.
      const firstLink = mobileNav.querySelector('a');

      firstLink?.focus();
    }

    function closeMenu({ restoreFocus = false } = {}) {
      if (!isMenuOpen()) return;

      mobileNav.classList.remove('is-open');

      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');

      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.inert = true;

      document.body.style.overflow = previousBodyOverflow;

      if (restoreFocus) {
        menuToggle.focus();
      }
    }

    // Initialize accessible closed state.
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');

    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNav.inert = true;

    // Toggle menu.
    menuToggle.addEventListener('click', () => {
      if (isMenuOpen()) {
        closeMenu({ restoreFocus: true });
      } else {
        openMenu();
      }
    });

    // Close after selecting a navigation link.
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close with Escape.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isMenuOpen()) {
        closeMenu({ restoreFocus: true });
      }
    });

    // Close when switching to desktop layout.
    desktopBreakpoint.addEventListener('change', (event) => {
      if (event.matches) {
        closeMenu();
      }
    });
  }

  /* ======================================
     SCROLL REVEAL ANIMATIONS
  ====================================== */

  const revealItems = document.querySelectorAll('.reveal');

  if (revealItems.length > 0) {
    if (
      'IntersectionObserver' in window &&
      !reducedMotion.matches
    ) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');

            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      revealItems.forEach((item) => {
        revealObserver.observe(item);
      });

      // Release observers when the page is leaving.
      window.addEventListener(
        'pagehide',
        () => revealObserver.disconnect(),
        { once: true }
      );
    } else {
      // Show everything if animations are unsupported
      // or the visitor prefers reduced motion.
      revealItems.forEach((item) => {
        item.classList.add('is-visible');
      });
    }
  }

  /* ======================================
     DYNAMIC COPYRIGHT YEAR
  ====================================== */

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ======================================
     ACCESSIBILITY: REDUCED MOTION
  ====================================== */

  reducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return;

    revealItems.forEach((item) => {
      item.classList.add('is-visible');
    });
  });

})();
