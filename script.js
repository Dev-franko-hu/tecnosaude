const brandName = 'TECNOSAUDE';
document.title = `${brandName} | Seu objetivo. Nossa estratégia.`;
document.querySelectorAll('.logo').forEach(logo => {
  const text = [...logo.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
  if (text) text.textContent = `${brandName} `;
  const label = logo.querySelector('b');
  if (label) label.textContent = 'CONSULTORIA';
});
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const textNodes = [];
while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);
textNodes.forEach(node => {
  node.nodeValue = node.nodeValue.replace(/FRANKO CONSULTORIA/g, brandName).replace(/Franko Consultoria/g, 'Tecnosaude');
});

const animationStyles = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap');
:root{--lime:#b9e957;--lime-dark:#8fbf2e;--black:#090c0c;--dark:#111716;--cream:#f7f9f6;--muted:#aeb9b2;--line:#dfe6df}
body{font-family:'DM Sans',sans-serif;letter-spacing:.01em;background:var(--cream);color:#101615}
.site-header,.hero,footer{background:#090c0c}
.logo,.hero h1,.section-heading h2,.start-section h2,.form-intro h2,.success-state h2,.plan-card h3{font-family:'Barlow Condensed',sans-serif}
.desktop-nav,.hero-text,.hero-quote,.section-heading>p:last-child,.process-grid p,.plan-card>p,.mid-message p,footer{font-family:'DM Sans',sans-serif}
.hero-subtitle{font-family:'Manrope',sans-serif;font-weight:600;letter-spacing:-.01em}
.problem-section{background:#080a0b;color:#fff;padding:58px 8vw 74px}
.problem-wrap{max-width:1100px;margin:0 auto;display:flex;flex-direction:column;gap:15px}
.problem-item{background:#17191a;border:1px solid rgba(255,255,255,.035);border-radius:10px;overflow:hidden;transition:background .3s ease,border-color .3s ease,transform .25s ease;box-shadow:0 5px 18px rgba(0,0,0,.12)}
.problem-item:hover{transform:translateY(-2px);border-color:rgba(185,233,87,.22)}
.problem-item.open{background:#1b1d1e;border-color:rgba(185,233,87,.3)}
.problem-trigger{min-height:57px;display:flex;align-items:center;gap:18px;padding:0 19px;cursor:pointer;user-select:none}
.problem-icon{width:25px;flex:0 0 25px;text-align:center;color:#f8faf8;font-size:16px;line-height:1}
.problem-item h3{flex:1;margin:0;color:#fff;font:800 17px/1.1 'Manrope',sans-serif;letter-spacing:-.02em}
.problem-item button{width:28px;height:28px;padding:0;background:transparent;border:0;color:#f5f7f5;font:400 27px/1 'DM Sans',sans-serif;cursor:pointer}
.problem-content{max-height:0;overflow:hidden;opacity:0;padding:0 62px;transition:max-height .35s ease,opacity .25s ease,padding .35s ease}
.problem-item.open .problem-content{max-height:110px;opacity:1;padding:0 62px 19px}
.problem-content p{margin:0;color:#fff;font:800 16px/1.3 'Manrope',sans-serif;letter-spacing:-.015em}
.button-primary{background-color:var(--lime);color:#0a0e0c}
.plan-card.selected{outline:2px solid var(--lime-dark);outline-offset:2px}
.form-modal{font-family:'DM Sans',sans-serif}
.form-modal legend{font-family:'Barlow Condensed',sans-serif}
.form-modal input.invalid,.form-modal select.invalid,.form-modal textarea.invalid{border-color:#d65e55;box-shadow:0 0 0 2px rgba(214,94,85,.12)}
@media(max-width:650px){.problem-section{padding:42px 13px 58px}.problem-trigger{min-height:56px;padding:0 16px;gap:14px}.problem-item h3{font-size:14px}.problem-content{padding-left:54px;padding-right:18px}.problem-item.open .problem-content{padding-left:54px;padding-right:18px;padding-bottom:17px}.problem-content p{font-size:13px}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulseRing{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.06);opacity:.9}}
@keyframes floatArt{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-12px) rotate(1deg)}}
@keyframes shimmer{from{background-position:-220% 0}to{background-position:220% 0}}
@keyframes drawLine{from{width:0}to{width:170px}}
@keyframes selectedPulse{0%{transform:scale(1)}45%{transform:scale(1.025)}100%{transform:scale(1)}}
@keyframes successPop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.hero-copy>*{animation:fadeUp .8s both}.hero-copy .kicker{animation-delay:.1s}.hero-copy h1{animation-delay:.2s}.hero-copy .hero-subtitle{animation-delay:.35s}.hero-copy .hero-text{animation-delay:.45s}.hero-copy .button{animation-delay:.58s}.hero-copy .hero-quote{animation-delay:.7s}.hero-art{animation:fadeIn 1.2s .35s both,floatArt 7s 1.5s ease-in-out infinite}.art-ring{animation:pulseRing 5s ease-in-out infinite}.art-line{animation:drawLine 1.2s 1s both}.button-primary{background-image:linear-gradient(110deg,transparent 25%,rgba(255,255,255,.38) 45%,transparent 65%);background-size:220% 100%}.button-primary:hover{animation:shimmer .9s ease}.process-grid article,.plan-card{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease,border-color .25s,box-shadow .25s}.process-grid article.revealed,.plan-card.revealed{opacity:1;transform:translateY(0)}.process-grid article:nth-child(2),.plan-card:nth-child(2){transition-delay:.12s}.process-grid article:nth-child(3),.plan-card:nth-child(3){transition-delay:.24s}.process-grid article:nth-child(4){transition-delay:.36s}.plan-card.selected{animation:selectedPulse .55s ease}.selection-bar.ready{animation:fadeUp .45s both}.selection-bar.attention{animation:shake .45s ease;border-color:#d88945}@keyframes shake{25%{transform:translateX(-7px)}50%{transform:translateX(7px)}75%{transform:translateX(-4px)}}.success-icon{animation:successPop .6s cubic-bezier(.17,.89,.32,1.49) both}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
`;
const styleTag = document.createElement('style');
styleTag.textContent = animationStyles;
document.head.appendChild(styleTag);

const problemMarkup = `
<section class="problem-section" id="problemas" aria-label="Principais dificuldades">
  <div class="problem-wrap">
    <article class="problem-item open">
      <div class="problem-trigger" role="button" tabindex="0" aria-expanded="true"><span class="problem-icon" aria-hidden="true">◉</span><h3>FALTA DE CLAREZA</h3><button type="button" aria-label="Fechar item">×</button></div>
      <div class="problem-content"><p>VOCÊ NÃO SABE SE O TREINO QUE SEGUE REALMENTE FUNCIONA PARA VOCÊ</p></div>
    </article>
    <article class="problem-item"><div class="problem-trigger" role="button" tabindex="0" aria-expanded="false"><span class="problem-icon" aria-hidden="true">▣</span><h3>DIETAS COPIADAS DA INTERNET</h3><button type="button" aria-label="Abrir item">+</button></div><div class="problem-content"><p>Dietas genéricas não consideram sua rotina, preferências e objetivo.</p></div></article>
    <article class="problem-item"><div class="problem-trigger" role="button" tabindex="0" aria-expanded="false"><span class="problem-icon" aria-hidden="true">♟</span><h3>TREINAR SOZINHO</h3><button type="button" aria-label="Abrir item">+</button></div><div class="problem-content"><p>Sem orientação, você pode perder tempo e treinar sem direção.</p></div></article>
    <article class="problem-item"><div class="problem-trigger" role="button" tabindex="0" aria-expanded="false"><span class="problem-icon" aria-hidden="true">◉</span><h3>RESULTADOS LENTOS</h3><button type="button" aria-label="Abrir item">+</button></div><div class="problem-content"><p>Estratégia e consistência ajudam você a avançar com mais clareza.</p></div></article>
    <article class="problem-item"><div class="problem-trigger" role="button" tabindex="0" aria-expanded="false"><span class="problem-icon" aria-hidden="true">◒</span><h3>INVESTIMENTO PERDIDO</h3><button type="button" aria-label="Abrir item">+</button></div><div class="problem-content"><p>Seu esforço merece um planejamento adequado à sua realidade.</p></div></article>
  </div>
</section>`;
const plansSection = document.querySelector('.plans-section');
if (plansSection && !document.getElementById('problemas')) plansSection.insertAdjacentHTML('beforebegin', problemMarkup);
const problemItems = document.querySelectorAll('.problem-item');
function toggleProblem(item) {
  const willOpen = !item.classList.contains('open');
  problemItems.forEach(problem => { problem.classList.remove('open'); problem.querySelector('.problem-trigger').setAttribute('aria-expanded','false'); problem.querySelector('button').textContent='+'; problem.querySelector('button').setAttribute('aria-label','Abrir item'); });
  if (willOpen) { item.classList.add('open'); item.querySelector('.problem-trigger').setAttribute('aria-expanded','true'); item.querySelector('button').textContent='×'; item.querySelector('button').setAttribute('aria-label','Fechar item'); }
}
problemItems.forEach(item => {
  const trigger = item.querySelector('.problem-trigger');
  trigger.addEventListener('click', () => toggleProblem(item));
  trigger.addEventListener('keydown', event => { if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleProblem(item)} });
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
function choosePlan(card){planCards.forEach(item=>item.classList.remove('selected'));card.classList.add('selected');chosenPlan=card.dataset.plan;selectedPlan.textContent=chosenPlan;continueButton.disabled=false;selectionBar.classList.add('ready')}
planCards.forEach(card=>card.querySelector('.plan-select').addEventListener('click',()=>choosePlan(card)));
function openForm(){if(!chosenPlan){document.getElementById('planos').scrollIntoView({behavior:'smooth'});selectionBar.classList.add('attention');setTimeout(()=>selectionBar.classList.remove('attention'),900);return}formPlan.textContent=chosenPlan;currentStep=1;form.reset();form.hidden=false;document.querySelector('.progress-head').hidden=false;document.querySelector('.progress-track').hidden=false;document.querySelector('.form-intro').hidden=false;document.getElementById('successState').hidden=true;updateStep();overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeForm(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function updateStep(){fields.forEach((field,index)=>{field.hidden=index!==currentStep-1});const percent=currentStep*20;stepLabel.textContent=`ETAPA ${currentStep} DE 5`;progressPercent.textContent=`${percent}%`;progressBar.style.width=`${percent}%`;backButton.hidden=currentStep===1;nextButton.innerHTML=currentStep===5?'ENVIAR INFORMAÇÕES <span>→</span>':'PRÓXIMA ETAPA <span>→</span>'}
function validCurrentStep(){const current=fields[currentStep-1];let valid=true;current.querySelectorAll('[required]').forEach(input=>{input.classList.remove('invalid');const empty=input.type==='checkbox'?!input.checked:!input.value.trim();if(empty){input.classList.add('invalid');valid=false}});if(!valid)current.querySelector('.invalid').focus();return valid}
nextButton.addEventListener('click',()=>{if(!validCurrentStep())return;if(currentStep<5){currentStep+=1;updateStep()}else submitForm()});
backButton.addEventListener('click',()=>{if(currentStep>1){currentStep-=1;updateStep()}});
function submitForm(){const data=Object.fromEntries(new FormData(form));data.plano=chosenPlan;data.enviadoEm=new Date().toISOString();const saved=JSON.parse(localStorage.getItem('franko_leads')||'[]');saved.push(data);localStorage.setItem('franko_leads',JSON.stringify(saved));form.hidden=true;document.querySelector('.progress-head').hidden=true;document.querySelector('.progress-track').hidden=true;document.querySelector('.form-intro').hidden=true;document.getElementById('successState').hidden=false}
document.getElementById('continueButton').addEventListener('click',openForm);document.getElementById('startForm').addEventListener('click',openForm);document.getElementById('closeForm').addEventListener('click',closeForm);document.getElementById('successClose').addEventListener('click',closeForm);overlay.addEventListener('click',event=>{if(event.target===overlay)closeForm()});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&overlay.classList.contains('open'))closeForm()});document.getElementById('menuToggle').addEventListener('click',()=>document.querySelector('.desktop-nav').classList.toggle('open'));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');revealObserver.unobserve(entry.target)}}),{threshold:.15});document.querySelectorAll('.process-grid article,.plan-card').forEach(element=>revealObserver.observe(element));
