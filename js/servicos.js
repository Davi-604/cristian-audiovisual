/**
 * Section Serviços - Scroll Control & Layering Stacking Animations
 * Cristian Salge - Filmmaker & Social Media
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('services-scroll-container');
  const panels = document.querySelectorAll('.service-panel');

  if (!container || !panels.length) return;

  let offsetTop = 0;
  let containerHeight = 0;

  // Calcula a posição do container na página
  function calculateLayout() {
    let temp = container;
    let top = 0;
    while (temp) {
      top += temp.offsetTop;
      temp = temp.offsetParent;
    }
    offsetTop = top;
    containerHeight = container.offsetHeight;
  }

  // Configura z-index inicial para os painéis
  panels.forEach((panel, i) => {
    panel.style.zIndex = 10 + i;
  });

  calculateLayout();
  window.addEventListener('resize', calculateLayout);

  // Recalcular em diferentes tempos após carregar para lidar com fontes e imagens
  setTimeout(calculateLayout, 200);
  setTimeout(calculateLayout, 800);
  setTimeout(calculateLayout, 1500);

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // O scroll inicia quando o topo da seção de serviços atinge o topo do viewport
    const startScroll = offsetTop;
    // O scroll termina quando o fundo do container de serviços atinge o fundo do viewport
    const endScroll = offsetTop + containerHeight - window.innerHeight;

    let progress = 0;
    if (scrollY >= startScroll && scrollY <= endScroll) {
      progress = (scrollY - startScroll) / (endScroll - startScroll);
    } else if (scrollY > endScroll) {
      progress = 1;
    }

    // Define os "pesos" da transição e da pausa.
    // pauseWeight = 0.15 significa que a trava de segurança é curta (apenas 15% do tempo de uma transição)
    const numPanels = panels.length;
    const pauseWeight = 0.15;
    const transitionWeight = 1.0;
    
    const totalWeight = (numPanels * pauseWeight) + ((numPanels - 1) * transitionWeight);
    const currentW = progress * totalWeight;
    
    let panelProgress = 0;
    if (progress >= 1) {
      panelProgress = numPanels - 1;
    } else {
      let accumulatedWeight = 0;
      for (let i = 0; i < numPanels; i++) {
        // Verifica a zona de pausa (trava de segurança) do painel atual
        accumulatedWeight += pauseWeight;
        if (currentW <= accumulatedWeight) {
          panelProgress = i;
          break;
        }
        
        // Verifica a zona de transição para o próximo painel
        if (i < numPanels - 1) {
          if (currentW <= accumulatedWeight + transitionWeight) {
            const localP = (currentW - accumulatedWeight) / transitionWeight;
            panelProgress = i + localP;
            break;
          }
          accumulatedWeight += transitionWeight;
        }
      }
    }

    panels.forEach((panel, i) => {
      let t = 0;
      const isActive = Math.round(panelProgress) === i;

      if (isActive) {
        panel.classList.add('panel-active');
        panel.style.pointerEvents = 'auto';
      } else {
        panel.classList.remove('panel-active');
        panel.style.pointerEvents = 'none';
      }

      if (panelProgress < i - 1) {
        // Painel está abaixo da tela
        panel.style.transform = 'translateY(100%) scale(0.95)';
        panel.style.opacity = '0';
      } else if (panelProgress >= i - 1 && panelProgress < i) {
        // Painel está entrando (subindo do fundo)
        t = panelProgress - (i - 1); // 0 para 1
        const y = (1 - t) * 100;
        const scale = 0.95 + t * 0.05;
        panel.style.transform = `translateY(${y}%) scale(${scale})`;
        panel.style.opacity = t;
      } else if (panelProgress >= i && panelProgress < i + 1) {
        // Painel está ativo mas recuando (está sendo coberto pelo próximo)
        t = panelProgress - i; // 0 para 1
        const y = -t * 8; // move levemente para cima para criar profundidade
        const scale = 1 - t * 0.04;
        const opacity = 1 - t * 0.7; // desvanece suavemente
        panel.style.transform = `translateY(${y}%) scale(${scale})`;
        panel.style.opacity = opacity;
      } else {
        // Painel está totalmente coberto e no topo
        panel.style.transform = 'translateY(-8%) scale(0.96)';
        panel.style.opacity = '0';
      }
    });
  }, { passive: true });

  // Força atualização inicial de posicionamento caso a página carregue no meio do scroll
  setTimeout(() => window.dispatchEvent(new Event('scroll')), 150);
});
