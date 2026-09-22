const planCards = document.querySelectorAll('.plan-card');
const selectionBar = document.getElementById('selectionBar');
const selectedPlan = document.getElementById('selectedPlan');
const continueButton = document.getElementById('continueButton');
const overlay = document.getElementById('formOverlay');
const form = document.getElementById('studentForm');
const formPlan = document.getElementById('formPlan');
const fields = [...form.querySelectorAll('fieldset')];
const nextButton = document.getElementById('nextStep');
const backButton = document.getElementById('backStep');
const stepLabel = document.getElementById('stepLabel');
const progressPercent = document.getElementById('progressPercent');
const progressBar = document.getElementById('progressBar');
let chosenPlan = '';
let currentStep = 1;

function choosePlan(card) {
  planCards.forEach(item => item.classList.remove('selected'));
  card.classList.add('selected');
  chosenPlan = card.dataset.plan;
  selectedPlan.textContent = chosenPlan;
  continueButton.disabled = false;
  selectionBar.classList.add('ready');
}
planCards.forEach(card => {
  card.querySelector('.plan-select').addEventListener('click', () => choosePlan(card));
});

function openForm() {
  if (!chosenPlan) {
    document.getElementById('planos').scrollIntoView({behavior:'smooth'});
    selectionBar.classList.add('attention');
    setTimeout(() => selectionBar.classList.remove('attention'), 900);
    return;
  }
  formPlan.textContent = chosenPlan;
  currentStep = 1;
  form.reset();
  updateStep();
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeForm() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function updateStep() {
  fields.forEach((field, index) => { field.hidden = index !== currentStep - 1; });
  const percent = currentStep * 20;
  stepLabel.textContent = `ETAPA ${currentStep} DE 5`;
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
  backButton.hidden = currentStep === 1;
  nextButton.textContent = currentStep === 5 ? 'ENVIAR INFORMAÇÕES  →' : 'PRÓXIMA ETAPA  →';
}
function validCurrentStep() {
  const current = fields[currentStep - 1];
  const required = [...current.querySelectorAll('[required]')];
  let valid = true;
  required.forEach(input => {
    input.classList.remove('invalid');
    if ((input.type === 'checkbox' && !input.checked) || (input.type !== 'checkbox' && !input.value.trim())) {
      input.classList.add('invalid'); valid = false;
    }
  });
  if (!valid) current.querySelector('.invalid').focus();
  return valid;
}
nextButton.addEventListener('click', () => {
  if (!validCurrentStep()) return;
  if (currentStep < 5) { currentStep += 1; updateStep(); }
  else submitForm();
});
backButton.addEventListener('click', () => { if (currentStep > 1) { currentStep -= 1; updateStep(); } });
function submitForm() {
  const data = Object.fromEntries(new FormData(form));
  data.plano = chosenPlan;
  data.enviadoEm = new Date().toISOString();
  const saved = JSON.parse(localStorage.getItem('franko_leads') || '[]');
  saved.push(data);
  localStorage.setItem('franko_leads', JSON.stringify(saved));
  form.hidden = true;
  document.querySelector('.progress-head').hidden = true;
  document.querySelector('.progress-track').hidden = true;
  document.querySelector('.form-intro').hidden = true;
  document.getElementById('successState').hidden = false;
}

document.getElementById('continueButton').addEventListener('click', openForm);
document.getElementById('startForm').addEventListener('click', openForm);
document.getElementById('closeForm').addEventListener('click', closeForm);
document.getElementById('successClose').addEventListener('click', closeForm);
overlay.addEventListener('click', event => { if (event.target === overlay) closeForm(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && overlay.classList.contains('open')) closeForm(); });
document.querySelectorAll('.desktop-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.desktop-nav').classList.remove('open')));
document.getElementById('menuToggle').addEventListener('click', () => document.querySelector('.desktop-nav').classList.toggle('open'));
