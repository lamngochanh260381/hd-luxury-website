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


document.querySelectorAll('a[href="khoi-thanh.html"]').forEach(link => {
  link.textContent = 'Tôn nhựa ngói PVC/ASA';
});
const khoiThanhHeading = document.querySelector('.business.khoi-thanh h2');
if (khoiThanhHeading) khoiThanhHeading.innerHTML = 'Tôn nhựa ngói<br>PVC/ASA';
const khoiThanhButton = document.querySelector('.business.khoi-thanh .btn-outline');
if (khoiThanhButton) khoiThanhButton.textContent = 'Khám phá tôn nhựa PVC/ASA';

const topAsiaEyebrow = document.querySelector('.business.top-asia .eyebrow');
if (topAsiaEyebrow) topAsiaEyebrow.textContent = 'MẢNG 01 · LẤY SÁNG';
const pvcAsaEyebrow = document.querySelector('.business.khoi-thanh .eyebrow');
if (pvcAsaEyebrow) pvcAsaEyebrow.textContent = 'MẢNG 02 · HỆ MÁI';

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
  ['top-asia.html', 'Top Asia'],
  ['khoi-thanh.html', 'Tôn nhựa ngói PVC/ASA'],
  ['composite-frp.html', 'Composite FRP'],
  ['ton-nhom.html', 'Tôn nhôm'],
  ['tin-tuc.html', 'Tin tức'],
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


// Chuẩn hóa liên kết bốn ngành hàng trong footer trên mọi trang.
document.querySelectorAll('footer').forEach(footer => {
  if (footer.querySelector('.standard-product-footer-links')) return;
  const links = document.createElement('nav');
  links.className = 'container standard-product-footer-links';
  links.setAttribute('aria-label', 'Bốn ngành hàng HD LUXURY');
  links.innerHTML = '<a href="top-asia.html">Top Asia</a><a href="khoi-thanh.html">Tôn nhựa ngói PVC/ASA</a><a href="composite-frp.html">Composite FRP</a><a href="ton-nhom.html">Tôn nhôm</a><a href="lien-he.html">Liên hệ tư vấn</a>';
  footer.appendChild(links);
});
