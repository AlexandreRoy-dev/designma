export function initGallery() {
  const items = [...document.querySelectorAll('.project-gallery__item')];
  if (!items.length) return;

  const images = items.map((btn) => ({
    src: btn.querySelector('img')?.src || '',
    alt: btn.querySelector('img')?.alt || '',
  }));

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Galerie photo');
  lightbox.innerHTML = `
    <button type="button" class="lightbox__close" aria-label="Fermer">&times;</button>
    <button type="button" class="lightbox__prev" aria-label="Image précédente">&#8249;</button>
    <img class="lightbox__img" src="" alt="" />
    <button type="button" class="lightbox__next" aria-label="Image suivante">&#8250;</button>
  `;
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector('.lightbox__img');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');
  let index = 0;
  let touchStartX = 0;

  const show = (i) => {
    index = (i + images.length) % images.length;
    img.src = images[index].src;
    img.alt = images[index].alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const hide = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  items.forEach((btn, i) => btn.addEventListener('click', () => show(i)));
  closeBtn.addEventListener('click', hide);
  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) hide();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) show(diff > 0 ? index - 1 : index + 1);
  }, { passive: true });
}
