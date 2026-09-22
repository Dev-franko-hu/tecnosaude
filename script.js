const navLinks = document.querySelectorAll('.nav-link');
const home = document.getElementById('inicio');
const pageName = document.getElementById('pageName');
const sidebar = document.getElementById('sidebar');
const modal = document.getElementById('modal');
const toast = document.getElementById('toast');
const names = {inicio:'Visão geral',clientes:'Clientes',treinos:'Treinos',dietas:'Dietas',evolucao:'Evolução',agenda:'Agenda',mensagens:'Mensagens',configuracoes:'Configurações'};

function showView(view) {
  document.querySelectorAll('.placeholder-view').forEach(section => section.classList.toggle('active', section.id === view));
  home.style.display = view === 'inicio' ? 'block' : 'none';
  pageName.textContent = names[view] || 'Visão geral';
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.view === view));
  sidebar.classList.remove('open');
}
navLinks.forEach(link => link.addEventListener('click', event => { event.preventDefault(); showView(link.dataset.view); history.replaceState(null, '', `#${link.dataset.view}`); }));

document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => showView(button.dataset.action === 'checkin' ? 'evolucao' : button.dataset.action === 'treino' ? 'treinos' : 'dietas')));

document.getElementById('mobileMenu').addEventListener('click', () => sidebar.classList.toggle('open'));
function openModal(){ modal.classList.add('open'); document.querySelector('.modal input').focus(); }
function closeModal(){ modal.classList.remove('open'); }
document.getElementById('newClient').addEventListener('click', openModal);
document.getElementById('newClient2').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if(event.target === modal) closeModal(); });
document.getElementById('clientForm').addEventListener('submit', event => { event.preventDefault(); closeModal(); toast.classList.add('show'); event.target.reset(); setTimeout(() => toast.classList.remove('show'), 3500); });

const initialView = location.hash.slice(1);
if (names[initialView]) showView(initialView);
