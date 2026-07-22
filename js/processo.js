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

  function calculateLayout() {
    offsetTop = section.getBoundingClientRect().top + window.scrollY;
    sectionHeight = section.offsetHeight;
    
    // We want the maximum horizontal translation to be exactly the distance 
    // from the first card to the last card. This ensures the last card 
    // reaches the left-aligned focal point at the very end of the scroll.
    const firstCardOffset = cards.length ? cards[0].offsetLeft : 0;
    const lastCardOffset = cards.length ? cards[cards.length - 1].offsetLeft : 0;
    maxTranslate = lastCardOffset - firstCardOffset;
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

    // To sync the progress bar visually with the markers:
    const numCards = cards.length;
    let syncedProgress = 0;
    const firstCardOffset = numCards ? cards[0].offsetLeft : 0;
    
    // Find where currentTranslate falls between cards
    for (let i = 0; i < numCards - 1; i++) {
      const cardA = cards[i].offsetLeft - firstCardOffset;
      const cardB = cards[i + 1].offsetLeft - firstCardOffset;
      
      if (currentTranslate >= cardA && currentTranslate < cardB) {
        const segmentProgress = (currentTranslate - cardA) / (cardB - cardA);
        syncedProgress = (i + segmentProgress) / (numCards - 1);
        break;
      }
    }
    
    if (numCards > 0 && currentTranslate >= cards[numCards - 1].offsetLeft - firstCardOffset) {
      syncedProgress = 1;
    } else if (currentTranslate <= 0) {
      syncedProgress = 0;
    }
    
    // Update horizontal progress bar width using the strictly synced progress
    if (progressBar) {
      progressBar.style.width = `${syncedProgress * 100}%`;
    }

    // Determine the active step by checking if the card has reached the exact focal point.
    // We activate the marker ONLY when the card reaches the middle (tight 20px threshold).
    let activeStep = 0;
    const activationThreshold = 20; 
    
    cards.forEach((card, index) => {
      const cardPosition = card.offsetLeft - firstCardOffset;
      if (currentTranslate >= cardPosition - activationThreshold) {
        activeStep = index;
      }
    });

    // Update active marker states
    markers.forEach((marker, index) => {
      if (index <= activeStep) {
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
      
      const cardPosition = card.offsetLeft - firstCardOffset;
      // Distance from the optimal "focus" position (current translation)
      const distance = cardPosition - currentTranslate;
      
      // Screen width dependent fade radius (cards further than this are completely grainy/faded)
      const maxFadeDist = window.innerWidth * 0.6;
      
      // Calculate focus level: 1 = perfectly aligned, 0 = far away
      const absDist = Math.abs(distance);
      let focus = 1 - (absDist / maxFadeDist);
      focus = Math.max(0, Math.min(1, focus));
      
      // Easing curve for a smoother transition
      focus = Math.pow(focus, 1.2);
      
      card.style.setProperty('--card-focus', focus.toFixed(3));
    });
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });

  // Add click events on markers to scroll directly to that stage
  markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
      calculateLayout();
      
      const targetCard = cards[index];
      if (!targetCard) return;

      const firstCardOffset = cards.length ? cards[0].offsetLeft : 0;
      let targetTranslate = targetCard.offsetLeft - firstCardOffset;
      targetTranslate = Math.min(Math.max(0, targetTranslate), maxTranslate);

      let stepProgress = maxTranslate > 0 ? targetTranslate / maxTranslate : 0;
      
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
