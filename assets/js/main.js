import { initScrollReveal } from './modules/scroll-reveal.js';
import { initNav } from './modules/nav.js';
import { initParallaxHero } from './modules/parallax-hero.js';
import { initGallery } from './modules/gallery.js';
import { initTestimonials } from './modules/testimonials.js';
import { initHeaderScroll } from './modules/header-scroll.js';

import { initFavorisNav } from './modules/favoris-nav.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeaderScroll();
  initScrollReveal();
  initParallaxHero();
  initGallery();
  initTestimonials();
  initFavorisNav();

  if (new URLSearchParams(location.search).get('sent') === '1') {
    for (const id of ['form-success', 'footer-form-success']) {
      const el = document.getElementById(id);
      if (el) {
        el.hidden = false;
        el.removeAttribute('hidden');
      }
    }
  }
});
