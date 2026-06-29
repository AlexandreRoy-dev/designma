const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScrollReveal() {
  const selector = '.reveal, .reveal-stagger, .reveal-clip';
  document.documentElement.classList.add('reveal-ready');

  if (prefersReduced) {
    document.querySelectorAll(selector).forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
  );

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));

  // Fallback: never leave content invisible if observer or modules fail
  window.setTimeout(() => {
    document.querySelectorAll(selector).forEach((el) => el.classList.add('is-visible'));
  }, 1200);
}
