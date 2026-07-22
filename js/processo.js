/**
 * Section Processo - Scroll-linked Horizontal Timeline
 * Cristian Salge - Filmmaker & Social Media
 */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('processo');
  const track = document.getElementById('processo-track');
  const progressBar = document.getElementById('processo-progress-bar');
  const markers = document.querySelectorAll('.timeline-marker');
  const cards = document.querySelectorAll('.processo-card');

  if (!section || !track || !markers.length) return;

  let offsetTop = 0;
  let sectionHeight = 0;
  let maxTranslate = 0;
  let focusPosition = 0;

  function calculateLayout() {
    offsetTop = section.getBoundingClientRect().top + window.scrollY;
    sectionHeight = section.offsetHeight;
    
    // Focus position é onde queremos que o card fique na tela para estar ativo (centro)
    focusPosition = window.innerWidth / 2 - (cards.length ? cards[0].offsetWidth / 2 : 0);
    
    // A translação máxima termina com o último card perfeitamente centralizado
    if (cards.length > 0) {
      maxTranslate = cards[cards.length - 1].offsetLeft - focusPosition;
    } else {
      maxTranslate = 0;
    }
  }

  // Initial calculation and listeners
  calculateLayout();
  window.addEventListener('resize', calculateLayout);
  
  // Recalculate multiple times to ensure images are loaded
  setTimeout(calculateLayout, 200);
  setTimeout(calculateLayout, 800);
  setTimeout(calculateLayout, 1500);

  function updateTimeline() {
    const scrollY = window.scrollY;
    const startScroll = offsetTop;
    const endScroll = offsetTop + sectionHeight - window.innerHeight;

    let progress = 0;
    if (scrollY >= startScroll && scrollY <= endScroll) {
      progress = (scrollY - startScroll) / (endScroll - startScroll);
    } else if (scrollY > endScroll) {
      progress = 1;
    }

    // Translate horizontal card track
    const currentTranslate = progress * maxTranslate;
    track.style.transform = `translateX(${-currentTranslate}px)`;

    // Calculate synced progress based on cards hitting the focus position
    const numCards = cards.length;
    let syncedProgress = 0;
    
    if (numCards > 0) {
      const firstCardCenter = cards[0].offsetLeft - focusPosition;
      const lastCardCenter = cards[numCards - 1].offsetLeft - focusPosition;
      
      // A timeline só começa a andar quando o primeiro card chega no centro
      if (currentTranslate < firstCardCenter) {
        syncedProgress = 0;
      } else if (currentTranslate >= lastCardCenter) {
        syncedProgress = 1;
      } else {
        // Find where currentTranslate falls between cards
        for (let i = 0; i < numCards - 1; i++) {
          const cardA = cards[i].offsetLeft - focusPosition;
          const cardB = cards[i + 1].offsetLeft - focusPosition;
          
          if (currentTranslate >= cardA && currentTranslate < cardB) {
            const segmentProgress = (currentTranslate - cardA) / (cardB - cardA);
            syncedProgress = (i + segmentProgress) / (numCards - 1);
            break;
          }
        }
      }
    }
    
    // Update horizontal progress bar width using the strictly synced progress
    if (progressBar) {
      progressBar.style.width = `${syncedProgress * 100}%`;
    }

    // Determine the active step by checking if the card has reached the exact focal point.
    // We activate the marker ONLY when the card reaches the middle.
    let activeStep = -1; // -1 significa que nenhum marker está ativo ainda
    const activationThreshold = 0; 
    
    cards.forEach((card, index) => {
      const cardCenterTranslate = card.offsetLeft - focusPosition;
      if (currentTranslate >= cardCenterTranslate - activationThreshold) {
        activeStep = index;
      }
    });

    // Update active marker states
    markers.forEach((marker, index) => {
      if (activeStep !== -1 && index <= activeStep) {
        marker.classList.add('marker-active');
      } else {
        marker.classList.remove('marker-active');
      }
    });

    // Update active card focus and dynamic CSS variable for continuous visual effect
    cards.forEach((card, index) => {
      if (index === activeStep) {
        card.classList.add('card-active');
      } else {
        card.classList.remove('card-active');
      }
      
      const cardCenterTranslate = card.offsetLeft - focusPosition;
      // Distance from the optimal "focus" position
      const distance = cardCenterTranslate - currentTranslate;
      
      // Screen width dependent fade radius (cards further than this are completely grainy/faded)
      const maxFadeDist = window.innerWidth * 0.6;
      
      // Calculate focus level: 1 = perfectly aligned, 0 = far away
      const absDist = Math.abs(distance);
      let focus = 1 - (absDist / maxFadeDist);
      focus = Math.max(0, Math.min(1, focus));
      
      // Easing curve for a smoother transition
      focus = Math.pow(focus, 1.2);
      
      // Blur Factor: the card remains 100% sharp while elevated (focus >= 0.55).
      // Only starts blurring when it drops below this threshold (returning to track).
      let blurFactor = 0;
      if (focus < 0.55) {
        blurFactor = (0.55 - focus) / 0.55;
        blurFactor = Math.pow(blurFactor, 1.2); // Smooth easing for the blur
      }
      
      card.style.setProperty('--card-focus', focus.toFixed(3));
      card.style.setProperty('--card-blur', blurFactor.toFixed(3));
    });
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });

  // Add click events on markers to scroll directly to that stage
  markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
      calculateLayout();
      
      const targetCard = cards[index];
      if (!targetCard) return;

      const targetTranslate = targetCard.offsetLeft - focusPosition;
      const safeTarget = Math.min(Math.max(0, targetTranslate), maxTranslate);

      let stepProgress = maxTranslate > 0 ? safeTarget / maxTranslate : 0;
      
      const startScroll = offsetTop;
      const endScroll = offsetTop + sectionHeight - window.innerHeight;
      const targetScroll = startScroll + stepProgress * (endScroll - startScroll);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    });
  });

  // Initial call
  setTimeout(updateTimeline, 100);
});
