const problemItems = document.querySelectorAll('.problem-item');

problemItems.forEach((item) => {
  const trigger = item.querySelector('.problem-trigger');
  const button = item.querySelector('button');

  trigger.addEventListener('click', () => {
    const willOpen = !item.classList.contains('open');

    problemItems.forEach((problem) => {
      problem.classList.remove('open');
      problem.querySelector('button').textContent = '+';
      problem.querySelector('button').setAttribute('aria-label', 'Abrir item');
    });

    if (willOpen) {
      item.classList.add('open');
      button.textContent = '×';
      button.setAttribute('aria-label', 'Fechar item');
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.process-grid article, .plan-card').forEach((element) => revealObserver.observe(element));
