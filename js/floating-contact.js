const contactFab = document.getElementById('contact-fab');
const contactToggle = document.getElementById('contact-toggle');
const contactBackdrop = document.getElementById('contact-backdrop');
const contactHover = window.matchMedia('(hover: hover) and (pointer: fine)');

function setContactOpen(open) {
  contactFab.classList.toggle('is-open', open);
  contactBackdrop.classList.toggle('is-open', open);
  contactToggle.setAttribute('aria-expanded', String(open));
  contactToggle.setAttribute('aria-label', open ? 'Fechar opções de contato' : 'Abrir opções de contato');
}

contactFab.addEventListener('pointerenter', () => {
  if (contactHover.matches) setContactOpen(true);
});

contactFab.addEventListener('pointerleave', () => {
  if (contactHover.matches && !contactFab.contains(document.activeElement)) setContactOpen(false);
});

contactToggle.addEventListener('click', () => {
  setContactOpen(contactHover.matches || !contactFab.classList.contains('is-open'));
});

contactFab.addEventListener('focusout', (event) => {
  if (!contactFab.contains(event.relatedTarget)) setContactOpen(false);
});

contactBackdrop.addEventListener('click', () => setContactOpen(false));
document.addEventListener('pointerdown', (event) => {
  if (!contactFab.contains(event.target)) setContactOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && contactFab.classList.contains('is-open')) {
    setContactOpen(false);
    contactToggle.focus();
  }
});
