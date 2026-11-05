// The content lives in index.html. This script only handles mobile navigation.
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu({ returnFocus = false } = {}) {
  navigation.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.querySelector('span').textContent = '+';
  if (returnFocus) toggle.focus();
}

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('span').textContent = open ? '−' : '+';
});

navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu({ returnFocus: true });
  }
});

window.matchMedia('(min-width: 721px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

document.querySelector('#year').textContent = new Date().getFullYear();
