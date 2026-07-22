/* ==========================================================================
   Section Sobre — Interactive Counters, Radial Border Glow & Entry/Exit Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBentoCardGlow();
  initSobreScrollObserver();
});

/**
 * Updates CSS custom variables --mouse-x and --mouse-y on all Cards
 * relative to the cursor position anywhere in the section, creating a 
 * continuous radial spotlight border reveal across adjacent cards.
 */
function initBentoCardGlow() {
  const sectionSobre = document.getElementById('sobre');
  if (!sectionSobre) return;

  const allRevealCards = sectionSobre.querySelectorAll('.bento-card, .profile-card-frame');

  sectionSobre.addEventListener('mousemove', (e) => {
    sectionSobre.classList.add('mouse-active');

    allRevealCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  sectionSobre.addEventListener('mouseleave', () => {
    sectionSobre.classList.remove('mouse-active');
  });
}

/**
 * IntersectionObserver to handle Entry Animations, Exit Animations,
 * and Big Numbers Count-Up / Count-Down transitions for individual elements.
 */
function initSobreScrollObserver() {
  const sectionSobre = document.getElementById('sobre');
  if (!sectionSobre) return;

  const counterElements = sectionSobre.querySelectorAll('.animate-counter');
  const animatedElements = sectionSobre.querySelectorAll('.sobre-reveal-item, .sobre-reveal-left, .card-inner-item, .animate-counter');

  // Pre-set counters to 0 on initial page load so they start counting from zero
  counterElements.forEach(el => {
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
  });

  // Observer para ENTRADA: mais rigoroso para que o usuário veja a animação iniciar na tela
  const observerInOptions = {
    root: null,
    rootMargin: '-5% 0px -5% 0px',
    threshold: 0.15
  };

  // Observer para SAÍDA: margem morta grande (150px) para anular o flickering gerado pelos translates do CSS
  const observerOutOptions = {
    root: null,
    rootMargin: '150px 0px 150px 0px',
    threshold: 0
  };

  const observerOut = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target;
      // Quando sair completamente da margem grande
      if (!entry.isIntersecting) {
        if (target.classList.contains('in-view')) {
          target.classList.remove('in-view');
          target.classList.add('out-view');

          if (target.classList.contains('animate-counter')) {
            animateCounter(target, 'down');
          }

          // Para de escutar saída, passa a escutar entrada novamente
          observerOut.unobserve(target);
          observerIn.observe(target);
        }
      }
    });
  }, observerOutOptions);

  const observerIn = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target;
      // Quando entrar na zona rigorosa de visualização
      if (entry.isIntersecting) {
        target.classList.add('in-view');
        target.classList.remove('out-view');

        if (target.classList.contains('animate-counter')) {
          animateCounter(target, 'up');
        }

        // Para de escutar a entrada para evitar flickering e passa a escutar só a saída
        observerIn.unobserve(target);
        observerOut.observe(target);
      }
    });
  }, observerInOptions);

  // Inicializa todos ouvindo a entrada primeiro
  animatedElements.forEach(el => observerIn.observe(el));
}

// Track active animation frame ID per element to prevent race conditions
const activeAnimations = new WeakMap();

/**
 * Smoothly animates counter number UP (to target) or DOWN (to 0).
 * @param {HTMLElement} element 
 * @param {'up' | 'down'} direction 
 */
function animateCounter(element, direction) {
  if (activeAnimations.has(element)) {
    cancelAnimationFrame(activeAnimations.get(element));
  }

  const target = parseFloat(element.getAttribute('data-target'));
  const prefix = element.getAttribute('data-prefix') || '';
  const suffix = element.getAttribute('data-suffix') || '';
  const decimals = parseInt(element.getAttribute('data-decimals') || '0', 10);
  const duration = 1800; // 1.8 seconds

  // Extract current numerical value
  const rawText = element.textContent
    .replace(prefix, '')
    .replace(suffix, '')
    .trim();
  let currentVal = parseFloat(rawText);
  if (isNaN(currentVal)) currentVal = 0;

  // Force start from 0 if counting UP and current value is near or at target
  let startValue = currentVal;
  if (direction === 'up' && Math.abs(currentVal - target) < 0.01) {
    startValue = 0;
  }

  const endValue = direction === 'up' ? target : 0;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // Ease Out Expo for UP, Ease In Quad for DOWN
    const easeProgress = direction === 'up'
      ? (progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress))
      : (progress * progress);

    const currentValue = startValue + (endValue - startValue) * easeProgress;

    element.textContent = `${prefix}${currentValue.toFixed(decimals)}${suffix}`;

    if (progress < 1) {
      const frameId = requestAnimationFrame(updateNumber);
      activeAnimations.set(element, frameId);
    } else {
      activeAnimations.delete(element);
    }
  }

  const frameId = requestAnimationFrame(updateNumber);
  activeAnimations.set(element, frameId);
}
