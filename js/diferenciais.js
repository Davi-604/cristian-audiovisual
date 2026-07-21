/**
 * Section Diferenciais - Scroll Progress vinculado à aparição (Eixo Y)
 * Cristian Salge - Filmmaker & Social Media
 */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('specialties-section');
  const cards = document.querySelectorAll('.specialty-card');

  if (!section || !cards.length) return;

  let offsetTop = 0;
  let sectionHeight = 0;

  function calculateLayout() {
    let temp = section;
    let top = 0;
    while (temp) {
      top += temp.offsetTop;
      temp = temp.offsetParent;
    }
    offsetTop = top;
    sectionHeight = section.offsetHeight;
  }

  calculateLayout();
  window.addEventListener('resize', calculateLayout);
  
  // Recalcular após carregamento completo para garantia de fontes/imagens
  setTimeout(calculateLayout, 200);
  setTimeout(calculateLayout, 800);

  const headerContainer = document.getElementById('specialties-header');

  // Define os pontos percentuais em que cada card deve aparecer (ex: 4 cards)
  // progress vai de 0 a 1 dentro do trecho de 300vh
  const revealTriggers = [0.05, 0.25, 0.45, 0.65]; // Ajuste conforme a quantidade de cards

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // O scroll inicia quando a section chega ao topo
    const startScroll = offsetTop;
    // O scroll termina quando a section passa completamente
    const endScroll = offsetTop + sectionHeight - window.innerHeight;

    let progress = 0;
    if (scrollY >= startScroll && scrollY <= endScroll) {
      progress = (scrollY - startScroll) / (endScroll - startScroll);
    } else if (scrollY > endScroll) {
      progress = 1;
    }

    // Ativa os cards caso o progresso do scroll seja maior que o seu respectivo gatilho
    cards.forEach((card, index) => {
      // Usa um trigger específico para cada card
      const trigger = revealTriggers[index] || (index * 0.2 + 0.1);
      
      if (progress >= trigger) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Animação de saída do texto (Header) quando a seção DESFIXA e começa a subir
    if (headerContainer) {
      let exitProgress = 0;
      if (scrollY > endScroll) {
        // Calcula o progresso nos primeiros 500px APÓS a seção terminar de fixar
        exitProgress = Math.min((scrollY - endScroll) / 500, 1);
      }
      
      if (exitProgress > 0) {
        headerContainer.style.opacity = 1 - exitProgress;
        // O translate é adicionado ao movimento natural de subida da página, criando um efeito de parallax
        headerContainer.style.transform = `translateY(${-40 * exitProgress}px)`;
        headerContainer.style.filter = `blur(${8 * exitProgress}px)`;
      } else {
        // Reseta aos valores originais enquanto estiver dentro da seção
        headerContainer.style.opacity = 1;
        headerContainer.style.transform = `translateY(0)`;
        headerContainer.style.filter = `blur(0)`;
      }
    }
  }, { passive: true });
  
  // Trigger inicial para caso o usuário recarregue a página no meio da section
  setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);

  // Observer para re-engatilhar animações de entrada do header ao entrar na tela
  if (headerContainer) {
    const h2 = headerContainer.querySelector('h2');
    const p = headerContainer.querySelector('p');

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove a classe, força o reflow (recalculo) e adiciona novamente para reiniciar a animação CSS
          if (h2) {
            h2.classList.remove('animate-text-stagger');
            void h2.offsetWidth; 
            h2.classList.add('animate-text-stagger');
          }
          if (p) {
            p.classList.remove('animate-reveal-bottom');
            void p.offsetWidth;
            p.classList.add('animate-reveal-bottom');
          }
        }
      });
    }, { 
      threshold: 0.1 // Dispara quando 10% do header estiver visível
    });

    headerObserver.observe(headerContainer);
  }
});
