/* Homepage-only overlay header: transparent over the cinematic hero,
   solidifies once the hero scrolls past. No effect on other pages. */
export function initHeaderScroll() {
  const home = document.querySelector('.home');
  if (!home) return;

  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.home-hero');
  if (!header || !hero) return;

  header.classList.add('site-header--home', 'site-header--over-hero');

  let ticking = false;

  const update = () => {
    const threshold = hero.offsetHeight - header.offsetHeight;
    header.classList.toggle('site-header--over-hero', window.scrollY < threshold);
    ticking = false;
  };

  update();
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
  window.addEventListener('resize', update, { passive: true });
}
