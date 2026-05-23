// nav and footer injected on all pages
const NAV_HTML = `
<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <svg width="36" height="36" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="8"  y="8"  width="28" height="28" rx="5" fill="#1D9E75"/>
        <rect x="44" y="8"  width="28" height="28" rx="5" fill="#1D9E75"/>
        <rect x="80" y="8"  width="28" height="28" rx="5" fill="#1D9E75"/>
        <rect x="8"  y="44" width="28" height="28" rx="5" fill="#1D9E75"/>
        <rect x="44" y="44" width="28" height="28" rx="5" fill="#1D9E75"/>
        <rect x="80" y="44" width="28" height="28" rx="14" fill="#5DCAA5"/>
        <rect x="8"  y="80" width="28" height="28" rx="14" fill="#5DCAA5"/>
        <circle cx="58" cy="94" r="14" fill="#9FE1CB"/>
        <circle cx="94" cy="94" r="10" fill="#9FE1CB" opacity="0.7"/>
        <circle cx="110" cy="60" r="6" fill="#1D9E75" opacity="0.4"/>
        <circle cx="112" cy="80" r="4" fill="#5DCAA5" opacity="0.5"/>
      </svg>
      <span class="nav-wordmark">pixl<span>grove</span></span>
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="portfolio.html">Portfolio</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="contact.html" class="nav-cta">Get in touch</a></li>
    </ul>
    <button class="nav-burger" id="nav-burger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-wordmark">pixl<span>grove</span></div>
        <p>Pixel-perfect websites built to grow your business — wherever you are in the world.</p>
      </div>
      <div class="footer-links">
        <h4>Pages</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:hello@pixlgrove.com">hello@pixlgrove.com</a></li>
          <li><a href="contact.html">Start a project</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Pixlgrove. All rights reserved.</p>
      <p>Web design &amp; development studio</p>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // active nav link
  const links = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  links.forEach(l => {
    if (l.getAttribute('href') === location.pathname.split('/').pop()) {
      l.classList.add('active');
    }
  });

  // mobile burger
  const burger = document.getElementById('nav-burger');
  const navLinks = document.getElementById('nav-links');
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
});
