// Mobile nav toggle. Nav and footer are static HTML in each page
// (so non-JS crawlers see internal links); this only wires the burger menu.
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('nav-burger');
  const navLinks = document.getElementById('nav-links');
  if (!burger || !navLinks) return;
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
