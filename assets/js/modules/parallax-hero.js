const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initParallaxHero() {
  if (prefersReduced || window.innerWidth < 768) return;

  const hero = document.querySelector('[data-parallax-hero]');
  if (!hero) return;

  const layer = hero.querySelector('.parallax-layer');
  if (!layer) return;

  let ticking = false;

  const update = () => {
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      ticking = false;
      return;
    }
    const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
    layer.style.transform = `translate3d(0, ${progress * 6}%, 0)`;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}
