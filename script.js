document.querySelector('#year').textContent = new Date().getFullYear();
const buttons = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.work-card');
buttons.forEach(button => button.addEventListener('click', () => {
  buttons.forEach(item => {item.classList.remove('active'); item.setAttribute('aria-pressed','false');});
  button.classList.add('active'); button.setAttribute('aria-pressed','true');
  cards.forEach(card => {card.hidden = button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter;});
}));
const dialog = document.querySelector('#video-dialog');
const video = dialog.querySelector('video');
document.querySelector('#open-video').addEventListener('click', () => dialog.showModal());
document.querySelector('#close-video').addEventListener('click', () => {video.pause();dialog.close()});
dialog.addEventListener('click', event => {if(event.target === dialog){video.pause();dialog.close()}});
dialog.addEventListener('close', () => video.pause());


// Contadores que se activan una sola vez al entrar en pantalla.
(() => {
  const numbers = [...document.querySelectorAll('.count-up')];
  if (!numbers.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const format = new Intl.NumberFormat('es-AR');
  const duration = 1150;
  const animate = (node) => {
    const target = Number(node.dataset.count);
    const prefix = node.dataset.prefix || '';
    const finalLabel = node.dataset.final || `${prefix}${format.format(target)}`;
    let started = null;
    const step = (timestamp) => {
      if (started === null) started = timestamp;
      const t = Math.min((timestamp - started) / duration, 1);
      const easeOut = 1 - (1 - t) ** 3;
      const current = Math.round(target * easeOut);
      node.textContent = t >= 1 ? finalLabel : `${prefix}${format.format(current)}`;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      animate(entry.target);
    }
  }, { threshold: 0.45 });
  numbers.forEach(node => observer.observe(node));
})();
