const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initTestimonials() {
  const slider =
    document.querySelector('.home-reviews__slider') || document.querySelector('.testimonials__slider');
  if (!slider) return;

  const slideSelector = slider.classList.contains('home-reviews__slider') ? '.home-review' : '.testimonial';
  const slides = [...slider.querySelectorAll(slideSelector)];
  if (!slides.length) return;

  slides.forEach((s, i) => s.classList.toggle('is-active', i === 0));

  if (slides.length < 2 || prefersReduced) return;

  let current = 0;
  let timer = null;

  const advance = () => {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  };

  const start = () => {
    if (!timer) timer = setInterval(advance, 6000);
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  start();
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);
}
