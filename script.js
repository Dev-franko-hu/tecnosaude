const animationStyles = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulseRing { 0%,100% { transform: scale(1); opacity: .55; } 50% { transform: scale(1.06); opacity: .9; } }
  @keyframes floatArt { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-12px) rotate(1deg); } }
  @keyframes shimmer { from { background-position: -220% 0; } to { background-position: 220% 0; } }
  @keyframes drawLine { from { width: 0; } to { width: 170px; } }
  @keyframes blink { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
  .hero-copy > * { animation: fadeUp .8s both; }
  .hero-copy .kicker { animation-delay: .1s; }
  .hero-copy h1 { animation-delay: .2s; }
  .hero-copy .hero-subtitle { animation-delay: .35s; }
  .hero-copy .hero-text { animation-delay: .45s; }
  .hero-copy .button { animation-delay: .58s; }
  .hero-copy .hero-quote { animation-delay: .7s; }
  .hero-art { animation: fadeIn 1.2s .35s both, floatArt 7s 1.5s ease-in-out infinite; }
  .art-ring { animation: pulseRing 5s ease-in-out infinite; }
  .art-line { animation: drawLine 1.2s 1s both; }
  .art-number { animation: fadeUp .9s .8s both; }
  .trust-strip { animation: fadeIn .8s .4s both; }
  .process-grid article, .plan-card { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease, border-color .25s, box-shadow .25s; }
  .process-grid article.revealed, .plan-card.revealed { opacity: 1; transform: translateY(0); }
  .process-grid article:nth-child(2), .plan-card:nth-child(2) { transition-delay: .12s; }
  .process-grid article:nth-child(3), .plan-card:nth-child(3) { transition-delay: .24s; }
  .process-grid article:nth-child(4) { transition-delay: .36s; }
  .button-primary { background-image: linear-gradient(110deg, transparent 25%, rgba(255,255,255,.38) 45%, transparent 65%); background-size: 220% 100%; }
  .button-primary:hover { animation: shimmer .9s ease; }
  .section-quote strong { transition: color .3s; }
  .section-quote:hover strong { color: var(--lime-dark); }
  .plan-card.selected { animation: selectedPulse .55s ease; }
  @keyframes selectedPulse { 0% { transform: scale(1); } 45% { transform: scale(1.025); } 100% { transform: scale(1); } }
  .selection-bar.ready { animation: fadeUp .45s both; }
  .selection-bar.attention { animation: shake .45s ease; border-color: #d88945; }
  @keyframes shake { 25% { transform: translateX(-7px); } 50% { transform: translateX(7px); } 75% { transform: translateX(-4px); } }
  .success-icon { animation: successPop .6s cubic-bezier(.17,.89,.32,1.49) both; }
  @keyframes successPop { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; } }
`;
const styleTag = document.createElement('style');
styleTag.textContent = animationStyles;
document.head.appendChild(styleTag);

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
  form.hidden = false;
  document.querySelector('.progress-head').hidden = false;
  document.querySelector('.progress-track').hidden = false;
  document.querySelector('.form-intro').hidden = false;
  document.getElementById('successState').hidden = true;
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
document.getElementById('menuToggle').addEventListener('click', () => document.querySelector('.desktop-nav').classList.toggle('open'));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); }
}), { threshold: .15 });
document.querySelectorAll('.process-grid article, .plan-card').forEach(element => revealObserver.observe(element));
