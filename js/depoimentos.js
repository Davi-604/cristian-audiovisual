document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.testimonial-image-card');
  const texts = document.querySelectorAll('.testimonial-text-wrapper');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  
  if (!cards.length || !texts.length) return;
  
  let activeIndex = 0;
  let autoplayTimer = null;
  const autoplayDuration = 4000;

  function init() {
    cards.forEach((card, index) => {
      const rot = Math.floor(Math.random() * 21) - 10;
      card.style.setProperty('--rand-rot', `${rot}`);
      if (index !== activeIndex) {
        card.style.transform = `scale(0.95) translateZ(-100px) rotate(${rot}deg) translateY(0px)`;
        card.style.opacity = '0.7';
        card.style.zIndex = `${cards.length + 2 - index}`;
      } else {
        card.style.transform = 'scale(1) translateZ(0px) rotate(0deg) translateY(0px)';
        card.style.opacity = '1';
        card.style.zIndex = '999';
        card.classList.add('active');
      }
    });

    texts.forEach((textWrapper, index) => {
      const quoteEl = textWrapper.querySelector('.testimonial-quote');
      if (quoteEl) {
        const text = quoteEl.textContent.trim();
        const words = text.split(/\s+/);
        quoteEl.innerHTML = '';
        
        words.forEach((word, wordIdx) => {
          const span = document.createElement('span');
          span.innerHTML = word + '&nbsp;';
          span.className = 'testimonial-word-span';
          span.style.transitionDelay = `${0.02 * wordIdx}s`;
          quoteEl.appendChild(span);
        });
      }

      if (index === activeIndex) {
        textWrapper.classList.add('active');
        textWrapper.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out';
        textWrapper.style.opacity = '1';
        textWrapper.style.transform = 'translateY(0px)';
        textWrapper.style.pointerEvents = 'auto';
      } else {
        textWrapper.classList.remove('active');
        textWrapper.style.transition = 'none';
        textWrapper.style.opacity = '0';
        textWrapper.style.transform = 'translateY(20px)';
        textWrapper.style.pointerEvents = 'none';
      }
    });

    startAutoplay();
  }

  function updateActive(newIndex) {
    activeIndex = newIndex;

    cards.forEach((card, index) => {
      const rot = card.style.getPropertyValue('--rand-rot') || '0';
      if (index === activeIndex) {
        card.classList.add('active');
        card.style.opacity = '1';
        card.style.zIndex = '999';
        
        // Fase 1 do bounce (sobe e vira um pouco)
        card.style.transform = `scale(0.98) translateZ(-50px) rotate(${rot / 2}deg) translateY(-80px)`;
        
        // Fase 2 do bounce (pousa de volta com suavidade após 200ms)
        setTimeout(() => {
          if (card.classList.contains('active')) {
            card.style.transform = 'scale(1) translateZ(0px) rotate(0deg) translateY(0px)';
          }
        }, 200);

      } else {
        card.classList.remove('active');
        card.style.opacity = '0.7';
        card.style.zIndex = cards.length + 2 - index;
        card.style.transform = `scale(0.95) translateZ(-100px) rotate(${rot}deg) translateY(0px)`;
      }
    });

    texts.forEach((textWrapper, index) => {
      if (index === activeIndex) {
        // Entrando de baixo para cima
        textWrapper.style.transition = 'none';
        textWrapper.style.opacity = '0';
        textWrapper.style.transform = 'translateY(20px)';
        textWrapper.style.pointerEvents = 'auto';
        
        textWrapper.offsetHeight; // Força reflow
        
        textWrapper.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out';
        textWrapper.style.opacity = '1';
        textWrapper.style.transform = 'translateY(0px)';
        textWrapper.classList.add('active');
      } else {
        if (textWrapper.classList.contains('active')) {
          // Saindo para cima (era o ativo)
          textWrapper.classList.remove('active');
          textWrapper.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out';
          textWrapper.style.opacity = '0';
          textWrapper.style.transform = 'translateY(-20px)';
          textWrapper.style.pointerEvents = 'none';
        } else {
          // Permanece escondido embaixo
          textWrapper.classList.remove('active');
          textWrapper.style.transition = 'none';
          textWrapper.style.opacity = '0';
          textWrapper.style.transform = 'translateY(20px)';
          textWrapper.style.pointerEvents = 'none';
        }
      }
    });
  }

  function handleNext() {
    const nextIndex = (activeIndex + 1) % cards.length;
    updateActive(nextIndex);
  }

  function handlePrev() {
    const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
    updateActive(prevIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(handleNext, autoplayDuration);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      handlePrev();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      handleNext();
      startAutoplay();
    });
  }

  init();
});
