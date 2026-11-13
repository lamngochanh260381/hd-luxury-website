document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 30));
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.navlinks');
  mobileToggle?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.toggle('open') || false;
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      mobileNav?.classList.remove('open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    }
  });
  const search = document.querySelector('#productSearch');
  const cards = [...document.querySelectorAll('.product-card')];
  search?.addEventListener('input', event => {
    const keyword = event.target.value.toLowerCase();
    cards.forEach(card => card.style.display = card.innerText.toLowerCase().includes(keyword) ? 'block' : 'none');
  });
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    cards.forEach(card => card.style.display = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter ? 'block' : 'none');
  }));
  const productInterest = document.querySelector('#productInterest');
  const requestedProduct = new URLSearchParams(window.location.search).get('san-pham');
  if (productInterest && requestedProduct && [...productInterest.options].some(option => option.value === requestedProduct)) {
    productInterest.value = requestedProduct;
  }
  document.querySelectorAll('form:not([data-live-form])').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    alert('Cảm ơn Quý khách. HD LUXURY sẽ liên hệ trong thời gian sớm nhất.');
    form.reset();
  }));
});


const cooperationImages = document.querySelector('.intro .image-frame');
if (cooperationImages && !cooperationImages.querySelector('[src="assets/hop-tac-top-asia.jpg"]')) {
  const topAsiaImage = document.createElement('img');
  topAsiaImage.loading = 'lazy';
  topAsiaImage.src = 'assets/hop-tac-top-asia.jpg';
  topAsiaImage.alt = 'Gặp gỡ hợp tác cùng Top Asia';
  cooperationImages.append(topAsiaImage);
}

const standardNavigation = [
  ['index.html', 'Trang chủ'],
  ['gioi-thieu.html', 'Giới thiệu'],
  ['san-pham.html', 'Sản phẩm'],
  ['top-asia.html', 'ASIA LITE – ASIA GOLD'],
  ['khoi-thanh.html', 'LUXURY PRIME'],
  ['composite-frp.html', 'Composite FRP'],
  ['tin-tuc.html', 'Tin tức'],
  ['dai-ly.html', 'Đại lý'],
  ['lien-he.html', 'Liên hệ']
];
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navlinks').forEach(nav => {
  nav.innerHTML = standardNavigation.map(([href, label]) =>
    `<a href="${href}"${currentPage === href ? ' class="active"' : ''}>${label}</a>`
  ).join('');
});

document.querySelectorAll('footer').forEach(footer => {
  if (footer.querySelector('.footer-contact') || footer.textContent.includes('info@hdluxury.vn')) return;
  const contact = document.createElement('div');
  contact.className = 'footer-contact';
  contact.innerHTML = '<a href="composite-frp.html">Composite FRP</a><span>·</span><a href="mailto:info@hdluxury.vn">info@hdluxury.vn</a><span>·</span><a href="tel:0978934420">Hotline/Zalo: 0978 934 420</a><span>·</span><a href="https://hdluxury.vn/">hdluxury.vn</a>';
  footer.appendChild(contact);
});


// Chuẩn hóa liên kết ba ngành hàng trên mọi trang.
document.querySelectorAll('footer').forEach(footer => {
  if (footer.querySelector('.standard-product-footer-links')) return;
  const links = document.createElement('nav');
  links.className = 'container standard-product-footer-links';
  links.setAttribute('aria-label', 'Ba ngành hàng HD LUXURY');
  links.innerHTML = '<a href="top-asia.html">ASIA LITE – ASIA GOLD · Tấm lấy sáng Polycarbonate</a><a href="khoi-thanh.html">LUXURY PRIME · Tôn nhựa PVC/ASA</a><a href="composite-frp.html">COMPOSITE FRP · Tấm Composite cốt sợi thủy tinh</a><a href="lien-he.html">Liên hệ tư vấn</a>';
  footer.appendChild(links);
});

const socialIcons = [
  '<a class="footer-social-link" href="https://youtube.com/@hdluxuryvn" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21 8.2a2.7 2.7 0 0 0-1.9-1.9C17.4 5.8 12 5.8 12 5.8s-5.4 0-7.1.5A2.7 2.7 0 0 0 3 8.2 28 28 0 0 0 2.6 12a28 28 0 0 0 .4 3.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.1.5 7.1.5s5.4 0 7.1-.5a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .4-3.8 28 28 0 0 0-.4-3.8Z"/><path class="footer-social-cutout" d="m10 9 5 3-5 3z"/></svg></a>',
  '<a class="footer-social-link" href="https://www.tiktok.com/@hdluxuryvn" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 3v11.2a4.2 4.2 0 1 1-3.3-4.1v3.4a1 1 0 1 0-.9 1V3h4.2Zm0 0c.4 2.5 1.9 4.2 4.5 4.5v3.4A8.4 8.4 0 0 1 14 8.8"/></svg></a>',
  '<a class="footer-social-link" href="mailto:info@hdluxury.vn" aria-label="Email HD LUXURY" title="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg></a>',
  '<a class="footer-social-link" href="https://hdluxury.vn" target="_blank" rel="noopener noreferrer" aria-label="Website HD LUXURY" title="Website"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg></a>',
  '<a class="footer-social-link" href="https://maps.app.goo.gl/m2xafnQ5mTmdXiM38?g_st=ic" target="_blank" rel="noopener noreferrer" aria-label="Google Maps" title="Google Maps"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/></svg></a>',
  '<a class="footer-social-link" href="https://www.facebook.com/share/1cPy3H7SBX/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.4 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.6v1.7H7v3.1h2.7v8z"/></svg></a>',
  '<a class="footer-social-link" href="https://zalo.me/0978934420" target="_blank" rel="noopener noreferrer" aria-label="Zalo" title="Zalo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14L9 18h10M5 18h4"/></svg></a>'
];

document.querySelectorAll('footer').forEach(footer => {
  if (footer.querySelector('.footer-social')) return;
  const social = document.createElement('nav');
  social.className = 'footer-social';
  social.setAttribute('aria-label', 'Mạng xã hội và liên hệ');
  social.innerHTML = socialIcons.join('');
  const copyright = footer.querySelector('.copyright');
  footer.insertBefore(social, copyright || null);
});
