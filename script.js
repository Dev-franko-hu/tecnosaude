const navLinks = document.querySelectorAll('.nav-link');
const home = document.getElementById('inicio');
const pageName = document.getElementById('pageName');
const sidebar = document.getElementById('sidebar');
const modal = document.getElementById('modal');
const toast = document.getElementById('toast');
const modalTitle = modal.querySelector('h2');
const modalDescription = modal.querySelector('p');
const modalForm = document.getElementById('clientForm');
const modalSubmit = modalForm.querySelector('.primary-btn');
const names = {inicio:'Visão geral',clientes:'Clientes',treinos:'Treinos',dietas:'Dietas',evolucao:'Evolução',agenda:'Agenda',mensagens:'Mensagens',configuracoes:'Configurações'};
const storageKeys = {clients:'tecnosaude_clients', plans:'tecnosaude_plans'};
let modalMode = 'client';

function getStored(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function saveStored(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function notify(message) {
  toast.firstChild.textContent = `${message} `;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
function showView(view) {
  document.querySelectorAll('.placeholder-view').forEach(section => section.classList.toggle('active', section.id === view));
  home.style.display = view === 'inicio' ? 'block' : 'none';
  pageName.textContent = names[view] || 'Visão geral';
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.view === view));
  sidebar.classList.remove('open');
}
navLinks.forEach(link => link.addEventListener('click', event => {
  event.preventDefault(); showView(link.dataset.view); history.replaceState(null, '', `#${link.dataset.view}`);
}));

document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
  const action = button.dataset.action;
  if (action === 'checkin') showView('evolucao');
  else if (action === 'treino') openModal('training');
  else if (action === 'dieta') openModal('diet');
}));

document.getElementById('mobileMenu').addEventListener('click', () => sidebar.classList.toggle('open'));
function setModalFields(mode) {
  modalMode = mode;
  const isClient = mode === 'client';
  modalTitle.textContent = isClient ? 'Novo cliente' : mode === 'training' ? 'Novo treino' : 'Nova dieta';
  modalDescription.textContent = isClient ? 'Cadastre os dados básicos para começar o acompanhamento.' : mode === 'training' ? 'Registre um plano de treino para organizar sua rotina.' : 'Registre um plano alimentar para acompanhar seu cliente.';
  modalForm.innerHTML = isClient ? `
    <label>Nome completo<input name="name" required placeholder="Ex.: Marina Oliveira" /></label>
    <label>E-mail<input name="email" type="email" required placeholder="cliente@email.com" /></label>
    <label>Objetivo<select name="goal"><option>Emagrecimento</option><option>Hipertrofia</option><option>Performance</option><option>Saúde geral</option></select></label>
    <button class="primary-btn" type="submit">Cadastrar cliente</button>` : `
    <label>Nome do plano<input name="name" required placeholder="Ex.: ${mode === 'training' ? 'Hipertrofia - A/B' : 'Plano alimentar - Performance'}" /></label>
    <label>Cliente<input name="client" required placeholder="Nome do cliente" /></label>
    <label>Observações<textarea name="notes" rows="3" placeholder="Objetivos, frequência ou observações"></textarea></label>
    <button class="primary-btn" type="submit">Salvar ${mode === 'training' ? 'treino' : 'dieta'}</button>`;
  modalForm.querySelector('input').focus();
}
function openModal(mode = 'client') { setModalFields(mode); modal.classList.add('open'); }
function closeModal() { modal.classList.remove('open'); }
document.getElementById('newClient').addEventListener('click', () => openModal());
document.getElementById('newClient2').addEventListener('click', () => openModal());
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });

// Os botões das telas de Treinos e Dietas passam a abrir formulários funcionais.
document.querySelector('#treinos .primary-btn').addEventListener('click', () => openModal('training'));
document.querySelector('#dietas .primary-btn').addEventListener('click', () => openModal('diet'));
modalForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(modalForm));
  if (modalMode === 'client') {
    const clients = getStored(storageKeys.clients);
    clients.push({...data, createdAt: new Date().toISOString()});
    saveStored(storageKeys.clients, clients);
    const counter = document.querySelector('.nav-link[data-view="clientes"] b');
    if (counter) counter.textContent = 24 + clients.length;
    notify('Cliente cadastrado com sucesso!');
  } else {
    const plans = getStored(storageKeys.plans);
    plans.push({...data, type: modalMode, createdAt: new Date().toISOString()});
    saveStored(storageKeys.plans, plans);
    notify(`${modalMode === 'training' ? 'Treino' : 'Dieta'} salvo com sucesso!`);
  }
  closeModal(); modalForm.reset();
});

// Busca rápida no cabeçalho: filtra clientes recentes pelo nome ou e-mail.
const searchButton = document.querySelector('[aria-label="Buscar"]');
if (searchButton) searchButton.addEventListener('click', () => {
  const term = window.prompt('Buscar cliente por nome ou e-mail:');
  if (!term) return;
  const rows = document.querySelectorAll('.clients-panel tbody tr');
  let found = 0;
  rows.forEach(row => { const match = row.textContent.toLowerCase().includes(term.toLowerCase()); row.hidden = !match; if (match) found++; });
  showView('inicio');
  notify(found ? `${found} cliente(s) encontrado(s).` : 'Nenhum cliente encontrado.');
});
const initialView = location.hash.slice(1);
if (names[initialView]) showView(initialView);
