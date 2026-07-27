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
  const mobileHeader = document.getElementById('mobile-specialties-header');

  // Define os pontos percentuais em que cada card deve aparecer (ex: 4 cards)
  // O primeiro card tem trigger negativo para aparecer enquanto a seção entra na tela
  const revealTriggers = [-0.2, 0.25, 0.50, 0.75];
  const mobileDots = document.querySelectorAll('.mobile-specialty-dot');

  let ticking = false;

  function updateScroll() {
    const scrollY = window.scrollY;
    const isMobile = window.innerWidth < 1024;
    
    // O scroll inicia quando a section chega ao topo
    const startScroll = offsetTop;
    // O scroll termina quando a section passa completamente
    const endScroll = offsetTop + sectionHeight - window.innerHeight;

    let progress = 0;
    let desktopProgress = 0;
    
    if (endScroll > startScroll) {
      if (scrollY < startScroll) {
        progress = 0;
        desktopProgress = (scrollY - startScroll) / window.innerHeight;
      } else if (scrollY >= startScroll && scrollY <= endScroll) {
        progress = (scrollY - startScroll) / (endScroll - startScroll);
        desktopProgress = progress;
      } else if (scrollY > endScroll) {
        progress = 1;
        desktopProgress = 1;
      }
    }

    const numPanels = cards.length;
    const activeIndex = Math.min(numPanels - 1, Math.max(0, Math.floor(progress * numPanels + 0.2)));

    // Update Mobile Pagination Dots
    if (mobileDots.length) {
      mobileDots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add('w-6', 'bg-brand-soft');
          dot.classList.remove('w-2', 'bg-brand-soft/30');
        } else {
          dot.classList.remove('w-6', 'bg-brand-soft');
          dot.classList.add('w-2', 'bg-brand-soft/30');
        }
      });
    }

    if (isMobile) {
      // Mobile Fixed Header Visibility Control
      if (mobileHeader) {
        if (scrollY >= startScroll - 80 && scrollY <= endScroll + 80) {
          mobileHeader.style.opacity = '1';
        } else {
          mobileHeader.style.opacity = '0';
        }
      }

      // MOBILE / TABLET (< 1024px): Carrossel Vertical Imersivo
      const panelProgress = progress * (numPanels - 1);

      cards.forEach((card, i) => {
        const diff = i - panelProgress;
        const isActive = Math.abs(diff) < 0.5;

        if (isActive) {
          card.classList.add('active');
          card.style.pointerEvents = 'auto';
        } else {
          card.classList.remove('active');
          card.style.pointerEvents = 'none';
        }

        let offsetY;
        let scale;
        let opacity;

        if (diff < 0) {
          offsetY = diff * (window.innerHeight * 0.8);
          scale = 1;
          opacity = 1;
        } else {
          offsetY = diff * 160;
          scale = Math.max(0.8, 1 - diff * 0.05);
          opacity = Math.max(0, 1 - diff * 0.2);
        }

        card.style.transform = `translate3d(-50%, calc(-50% + ${offsetY.toFixed(1)}px), 0) scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = 100 - i;
      });
    } else {
      if (mobileHeader) {
        mobileHeader.style.opacity = '0';
      }

      // DESKTOP (>= 1024px): Animação de Entrada Estática
      cards.forEach((card, index) => {
        card.style.transform = '';
        card.style.opacity = '';
        card.style.zIndex = '';
        card.style.pointerEvents = '';
        
        const trigger = revealTriggers[index] || (index * 0.2 + 0.1);
        if (desktopProgress >= trigger) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }

    // Animação de saída do texto (Header Desktop apenas)
    if (headerContainer && !isMobile) {
      let exitProgress = 0;
      if (scrollY > endScroll) {
        exitProgress = Math.min((scrollY - endScroll) / 500, 1);
      }
      
      if (exitProgress > 0) {
        headerContainer.style.opacity = (1 - exitProgress).toFixed(2);
        headerContainer.style.transform = `translate3d(0, ${(-40 * exitProgress).toFixed(1)}px, 0)`;
        headerContainer.style.filter = `blur(${(8 * exitProgress).toFixed(1)}px)`;
      } else {
        headerContainer.style.opacity = '';
        headerContainer.style.transform = '';
        headerContainer.style.filter = '';
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });
  
  // Trigger inicial
  setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);

  // Observer para re-engatilhar animações de entrada do header no Desktop
  if (headerContainer) {
    const h2 = headerContainer.querySelector('h2');
    const p = headerContainer.querySelector('p');

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
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
      threshold: 0.1
    });

    headerObserver.observe(headerContainer);
  }
});
