// REVIX - interações simples do site

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('nav a').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-6px)';
    card.style.borderColor = '#168cff';
    card.style.boxShadow = '0 10px 30px rgba(0,128,255,.12)';
    card.style.transition = '.25s';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.borderColor = '#263448';
    card.style.boxShadow = 'none';
  });
});
