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
    let temp = section;
    let top = 0;
    while (temp) {
      top += temp.offsetTop;
      temp = temp.offsetParent;
    }
    offsetTop = top;
    sectionHeight = section.offsetHeight;
    
    // Calculate how much horizontal space needs to be translated
    // We want the last card to be fully visible at the end of the scroll, with padding
    const containerWidth = section.querySelector('.processo-track-container').offsetWidth;
    maxTranslate = Math.max(0, track.scrollWidth - containerWidth + (window.innerWidth * 0.1));
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

    // Update horizontal progress bar width
    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`;
    }

    // Determine the active step (0 to 6)
    const numSteps = markers.length;
    const activeStep = Math.min(Math.round(progress * (numSteps - 1)), numSteps - 1);

    // Update active marker states
    markers.forEach((marker, index) => {
      if (index <= activeStep) {
        marker.classList.add('marker-active');
      } else {
        marker.classList.remove('marker-active');
      }
    });

    // Update active card focus
    cards.forEach((card, index) => {
      if (index === activeStep) {
        card.classList.add('card-active');
      } else {
        card.classList.remove('card-active');
      }
    });
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });

  // Add click events on markers to scroll directly to that stage
  markers.forEach((marker) => {
    marker.addEventListener('click', () => {
      const stepIndex = parseInt(marker.getAttribute('data-step'), 10);
      if (isNaN(stepIndex)) return;

      calculateLayout();
      const startScroll = offsetTop;
      const endScroll = offsetTop + sectionHeight - window.innerHeight;
      const stepProgress = stepIndex / (markers.length - 1);
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
