const animationStyles = `
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulseRing{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.06);opacity:.9}}
@keyframes floatArt{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-12px) rotate(1deg)}}
@keyframes shimmer{from{background-position:-220% 0}to{background-position:220% 0}}
@keyframes drawLine{from{width:0}to{width:170px}}
@keyframes selectedPulse{0%{transform:scale(1)}45%{transform:scale(1.025)}100%{transform:scale(1)}}
@keyframes successPop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.hero-copy>*{animation:fadeUp .8s both}.hero-copy .kicker{animation-delay:.1s}.hero-copy h1{animation-delay:.2s}.hero-copy .hero-subtitle{animation-delay:.35s}.hero-copy .hero-text{animation-delay:.45s}.hero-copy .button{animation-delay:.58s}.hero-copy .hero-quote{animation-delay:.7s}.hero-art{animation:fadeIn 1.2s .35s both,floatArt 7s 1.5s ease-in-out infinite}.art-ring{animation:pulseRing 5s ease-in-out infinite}.art-line{animation:drawLine 1.2s 1s both}.button-primary{background-image:linear-gradient(110deg,transparent 25%,rgba(255,255,255,.38) 45%,transparent 65%);background-size:220% 100%}.button-primary:hover{animation:shimmer .9s ease}.process-grid article,.plan-card{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease,border-color .25s,box-shadow .25s}.process-grid article.revealed,.plan-card.revealed{opacity:1;transform:translateY(0)}.process-grid article:nth-child(2),.plan-card:nth-child(2){transition-delay:.12s}.process-grid article:nth-child(3),.plan-card:nth-child(3){transition-delay:.24s}.process-grid article:nth-child(4){transition-delay:.36s}.plan-card.selected{animation:selectedPulse .55s ease}.selection-bar.ready{animation:fadeUp .45s both}.selection-bar.attention{animation:shake .45s ease;border-color:#d88945}@keyframes shake{25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}.success-icon{animation:successPop .6s cubic-bezier(.17,.89,.32,1.49) both}
.problem-section{background:#080a0b;color:#fff;padding:55px 8vw 70px}.problem-wrap{max-width:1100px;margin:0 auto;display:flex;flex-direction:column;gap:16px}.problem-item{background:#141414;border-radius:8px;overflow:hidden;transition:background .25s ease}.problem-item.open{background:#171717}.problem-trigger{min-height:56px;display:flex;align-items:center;gap:20px;padding:0 18px;cursor:pointer}.problem-icon{width:22px;flex:0 0 22px;text-align:center;color:#fff;font-size:16px;line-height:1}.problem-item h3{flex:1;margin:0;color:#fff;font:800 18px/1 'DM Sans',sans-serif}.problem-item button{width:26px;height:26px;padding:0;background:none;border:0;color:#fff;font-size:25px;line-height:1;font-weight:400;cursor:pointer}.problem-content{max-height:0;overflow:hidden;opacity:0;padding:0 60px;transition:max-height .3s ease,opacity .25s ease,padding .3s ease}.problem-item.open .problem-content{max-height:100px;opacity:1;padding:0 60px 17px}.problem-content p{margin:0;color:#fff;font:800 16px/1.25 'DM Sans',sans-serif}.problem-item.open .problem-trigger button{font-size:0}.problem-item.open .problem-trigger button::after{content:'×';font-size:25px}.problem-section + .plans-section{padding-top:105px}@media(max-width:650px){.problem-section{padding:40px 13px 55px}.problem-wrap{gap:16px}.problem-trigger{min-height:55px;padding:0 16px;gap:15px}.problem-item h3{font-size:15px;line-height:1.1}.problem-content{padding-left:53px;padding-right:20px}.problem-item.open .problem-content{padding-left:53px;padding-right:20px;padding-bottom:17px}.problem-content p{font-size:13px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
`;
const styleTag = document.createElement('style');
styleTag.textContent = animationStyles;
document.head.appendChild(styleTag);

// Seção de dúvidas/problemas do cliente, criada sem alterar a estrutura original da landing page.
const problemMarkup = `
<section class="problem-section" id="problemas" aria-label="Principais dificuldades">
  <div class="problem-wrap">
    <article class="problem-item open">
      <div class="problem-trigger" role="button" tabindex="0" aria-expanded="true">
        <span class="problem-icon" aria-hidden="true">◉</span>
        <h3>FALTA DE CLAREZA</h3>
        <button type="button" aria-label="Fechar item">×</button>
      </div>
      <div class="problem-content"><p>VOCÊ NÃO SABE SE O TREINO QUE SEGUE REALMENTE FUNCIONA PARA VOCÊ</p></div>
    </article>
    <article class="problem-item">
      <div class="problem-trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="problem-icon" aria-hidden="true">▣</span>
        <h3>DIETAS COPIADAS DA INTERNET</h3>
        <button type="button" aria-label="Abrir item">+</button>
      </div>
      <div class="problem-content"><p>Dietas genéricas não consideram sua rotina, preferências e objetivo.</p></div>
    </article>
    <article class="problem-item">
      <div class="problem-trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="problem-icon" aria-hidden="true">♟</span>
        <h3>TREINAR SOZINHO</h3>
        <button type="button" aria-label="Abrir item">+</button>
      </div>
      <div class="problem-content"><p>Sem orientação, você pode perder tempo e treinar sem direção.</p></div>
    </article>
    <article class="problem-item">
      <div class="problem-trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="problem-icon" aria-hidden="true">◉</span>
        <h3>RESULTADOS LENTOS</h3>
        <button type="button" aria-label="Abrir item">+</button>
      </div>
      <div class="problem-content"><p>Estratégia e consistência ajudam você a avançar com mais clareza.</p></div>
    </article>
    <article class="problem-item">
      <div class="problem-trigger" role="button" tabindex="0" aria-expanded="false">
        <span class="problem-icon" aria-hidden="true">◒</span>
        <h3>INVESTIMENTO PERDIDO</h3>
        <button type="button" aria-label="Abrir item">+</button>
      </div>
      <div class="problem-content"><p>Seu esforço merece um planejamento adequado à sua realidade.</p></div>
    </article>
  </div>
</section>`;
const quoteBanner = document.querySelector('.quote-banner');
const plansSection = document.querySelector('.plans-section');
if (quoteBanner && plansSection && !document.getElementById('problemas')) {
  plansSection.insertAdjacentHTML('beforebegin', problemMarkup);
}
const problemItems = document.querySelectorAll('.problem-item');
function toggleProblem(item) {
  const willOpen = !item.classList.contains('open');
  problemItems.forEach(problem => {
    problem.classList.remove('open');
    problem.querySelector('.problem-trigger').setAttribute('aria-expanded', 'false');
    problem.querySelector('button').textContent = '+';
    problem.querySelector('button').setAttribute('aria-label', 'Abrir item');
  });
  if (willOpen) {
    item.classList.add('open');
    item.querySelector('.problem-trigger').setAttribute('aria-expanded', 'true');
    item.querySelector('button').textContent = '×';
    item.querySelector('button').setAttribute('aria-label', 'Fechar item');
  }
}
problemItems.forEach(item => {
  const trigger = item.querySelector('.problem-trigger');
  trigger.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') toggleProblem(item);
    else toggleProblem(item);
  });
  trigger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleProblem(item); }
  });
});

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
planCards.forEach(card => card.querySelector('.plan-select').addEventListener('click', () => choosePlan(card)));

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
  nextButton.innerHTML = currentStep === 5 ? 'ENVIAR INFORMAÇÕES <span>→</span>' : 'PRÓXIMA ETAPA <span>→</span>';
}
function validCurrentStep() {
  const current = fields[currentStep - 1];
  let valid = true;
  current.querySelectorAll('[required]').forEach(input => {
    input.classList.remove('invalid');
    const empty = input.type === 'checkbox' ? !input.checked : !input.value.trim();
    if (empty) { input.classList.add('invalid'); valid = false; }
  });
  if (!valid) current.querySelector('.invalid').focus();
  return valid;
}
nextButton.addEventListener('click', () => {
  if (!validCurrentStep()) return;
  if (currentStep < 5) { currentStep += 1; updateStep(); } else submitForm();
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
}), {threshold:.15});
document.querySelectorAll('.process-grid article,.plan-card').forEach(element => revealObserver.observe(element));
