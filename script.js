document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 30));
  document.querySelector('.mobile-toggle')?.addEventListener('click', () => document.querySelector('.navlinks')?.classList.toggle('open'));
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
  document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
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

document.querySelectorAll('.navlinks').forEach(nav => {
  const topAsiaLink = nav.querySelector('a[href="top-asia.html"]');
  const pvcAsaLink = nav.querySelector('a[href="khoi-thanh.html"]');
  if (topAsiaLink && pvcAsaLink) nav.insertBefore(topAsiaLink, pvcAsaLink);
});
