const STORAGE_KEY = 'tecnosaude-clients';

const defaultClients = [
  { id: 1, nome: 'Maria Silva', objetivo: 'Emagrecimento', plano: 'Emagrecimento', status: 'Ativo', observacoes: 'Foco em perda de gordura e rotina consistente.' },
  { id: 2, nome: 'João Pereira', objetivo: 'Hipertrofia', plano: 'Hipertrofia', status: 'Em progresso', observacoes: 'Aumentar massa muscular com foco em força.' },
  { id: 3, nome: 'Ana Costa', objetivo: 'Performance', plano: 'Performance', status: 'Ativo', observacoes: 'Melhorar resistência e condicionamento geral.' },
  { id: 4, nome: 'Lucas Mendes', objetivo: 'Reabilitação', plano: 'Reabilitação', status: 'Aguardando', observacoes: 'Retorno gradual e acompanhamento fisiológico.' }
];

const agenda = [
  { time: '08:30', title: 'Avaliação física', patient: 'Maria Silva' },
  { time: '10:00', title: 'Planejamento nutricional', patient: 'João Pereira' },
  { time: '13:30', title: 'Acompanhamento de performance', patient: 'Ana Costa' },
  { time: '16:00', title: 'Consulta de reabilitação', patient: 'Lucas Mendes' }
];

const chartValues = [52, 60, 58, 72, 81, 90];

let clients = loadClients();

function loadClients() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [...defaultClients];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultClients];
  } catch (error) {
    return [...defaultClients];
  }
}

function saveClients() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch (error) {
    console.warn('Não foi possível salvar os dados localmente:', error);
  }
}

function getClientCount() {
  return clients.length;
}

function renderChart() {
  const chart = document.getElementById('chartBars');
  if (!chart) return;

  chart.innerHTML = '';

  chartValues.forEach((value, index) => {
    const barWrap = document.createElement('div');
    barWrap.className = 'chart-bar-wrap';

    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = `${value}%`;
    bar.title = `${value}%`;

    const label = document.createElement('span');
    label.className = 'chart-label';
    label.textContent = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][index];

    barWrap.appendChild(bar);
    barWrap.appendChild(label);
    chart.appendChild(barWrap);
  });
}

function renderAgenda() {
  const agendaList = document.getElementById('agendaList');
  if (!agendaList) return;

  agendaList.innerHTML = agenda
    .map(
      item => `
        <li class="agenda-item">
          <span class="time">${item.time}</span>
          <div>
            <strong>${item.title}</strong>
            <small>${item.patient}</small>
          </div>
        </li>
      `
    )
    .join('');
}

function renderClients() {
  const list = document.getElementById('clientsList');
  const searchInput = document.getElementById('searchInput');
  if (!list) return;

  const searchTerm = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const filteredClients = clients.filter(client => {
    const haystack = [client.nome, client.objetivo, client.plano, client.status]
      .join(' ')
      .toLowerCase();
    return haystack.includes(searchTerm);
  });

  document.getElementById('totalClients').textContent = String(getClientCount());

  if (!filteredClients.length) {
    list.innerHTML = '<p class="empty-state">Nenhum cliente encontrado.</p>';
    return;
  }

  list.innerHTML = filteredClients
    .map(
      client => `
        <article class="client-card">
          <div>
            <h3>${client.nome}</h3>
            <p>${client.objetivo}</p>
          </div>
          <div class="client-meta">
            <span class="pill">${client.plano}</span>
            <span class="status ${client.status.toLowerCase().replace(/\s+/g, '-')}">${client.status}</span>
          </div>
          <small>${client.observacoes || 'Sem observações cadastradas.'}</small>
        </article>
      `
    )
    .join('');
}

function openModal() {
  const modal = document.getElementById('clientModal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const modal = document.getElementById('clientModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);

  const client = {
    id: Date.now(),
    nome: String(formData.get('nome') || '').trim(),
    objetivo: String(formData.get('objetivo') || '').trim(),
    plano: String(formData.get('plano') || '').trim(),
    status: String(formData.get('status') || '').trim(),
    observacoes: String(formData.get('observacoes') || '').trim()
  };

  if (!client.nome || !client.objetivo || !client.plano) return;

  clients = [client, ...clients];
  saveClients();
  renderClients();
  closeModal();
  form.reset();
}

function bindEvents() {
  const openButton = document.getElementById('openClientForm');
  const closeButton = document.getElementById('closeClientModal');
  const cancelButton = document.getElementById('cancelClientModal');
  const modal = document.getElementById('clientModal');
  const form = document.getElementById('clientForm');
  const searchInput = document.getElementById('searchInput');

  if (openButton) openButton.addEventListener('click', openModal);
  if (closeButton) closeButton.addEventListener('click', closeModal);
  if (cancelButton) cancelButton.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });
  if (form) form.addEventListener('submit', handleSubmit);
  if (searchInput) searchInput.addEventListener('input', renderClients);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });
}

function init() {
  renderChart();
  renderAgenda();
  renderClients();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);



































































