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

const copyButton=document.querySelector('#copy-email');
copyButton?.addEventListener('click',async()=>{
 const address='by.sofifernandez@gmail.com'; const status=document.querySelector('#copy-status');
 try { if(navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(address);
 else { const field=document.createElement('textarea');field.value=address;field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();if(!document.execCommand('copy')) throw new Error('No se pudo copiar');field.remove(); } status.textContent='¡Correo copiado!'; }
 catch(e) { status.textContent='Copiá este correo: '+address; }
});
