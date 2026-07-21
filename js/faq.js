// js/faq.js
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerWrapper = item.querySelector('.faq-answer-wrapper');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Fecha todas as outras abertas (comportamento de accordion único)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherWrapper = otherItem.querySelector('.faq-answer-wrapper');
          otherWrapper.style.maxHeight = null;
        }
      });

      // Alterna a atual
      if (isActive) {
        item.classList.remove('active');
        answerWrapper.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
      }
    });
  });

  // Scroll Reveal Animations with Stagger
  const revealElements = document.querySelectorAll('.faq-reveal');
  
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          // Permite que a animação aconteça novamente ao sair e voltar (saída)
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    revealElements.forEach((el, index) => {
      // Cria um efeito stagger (cascata) multiplicando o delay pelo index
      el.style.transitionDelay = `${index * 150}ms`;
      observer.observe(el);
    });
  }
});
