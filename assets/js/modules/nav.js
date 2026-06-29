export function initNav() {
  const panel = document.getElementById('menu-panel');
  const openBtns = [document.getElementById('menu-open'), document.getElementById('menu-open-desktop')].filter(Boolean);
  const closeBtn = document.getElementById('menu-close');
  if (!panel) return;

  const setOpen = (open) => {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    openBtns.forEach((btn) => btn.setAttribute('aria-expanded', open ? 'true' : 'false'));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeBtn?.focus();
  };

  openBtns.forEach((btn) => btn.addEventListener('click', () => setOpen(true)));
  closeBtn?.addEventListener('click', () => setOpen(false));
  panel.querySelectorAll('.menu-link').forEach((link) => link.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
  });
}
