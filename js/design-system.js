/* design-system / js / design-system.js */

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Text Stagger Animations
  const staggerTexts = document.querySelectorAll('.animate-text-stagger');
  staggerTexts.forEach(el => {
    const text = el.textContent.trim();
    el.textContent = '';
    let delay = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');
      span.className = 'char';
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      span.style.animationDelay = `${delay}s`;
      el.appendChild(span);
      delay += 0.04; // 40ms stagger entre as letras
    }
  });

  // 0.5 Initialize Grid Stagger Groups
  const staggerGroups = document.querySelectorAll('.animate-stagger-group');
  staggerGroups.forEach(group => {
    const items = group.querySelectorAll('.stagger-item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.15}s`;
    });
  });

  // 1. Copy-to-Clipboard functionality
  const copyBadges = document.querySelectorAll('.copy-badge');

  copyBadges.forEach(badge => {
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = badge.getAttribute('data-copy') || badge.innerText.trim();

      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show tooltip feedback
        badge.classList.add('show-tooltip');
        badge.classList.add('tooltip');

        setTimeout(() => {
          badge.classList.remove('show-tooltip');
        }, 1500);
      }).catch(err => {
        console.error('Falha ao copiar texto: ', err);
      });
    });
  });

  // 2. Replay Entry Animations
  const animationTriggers = document.querySelectorAll('[data-replay-target]');

  animationTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-replay-target');
      const animationClass = trigger.getAttribute('data-replay-class');
      const targetElement = document.getElementById(targetId);

      if (targetElement && animationClass) {
        // Remove animation class
        targetElement.classList.remove(animationClass);
        
        // Force reflow/repaint to reset animation state
        void targetElement.offsetWidth;
        
        // Re-add animation class
        targetElement.classList.add(animationClass);
      }
    });
  });

  // 3. Replay All Animations Button
  const replayAllBtn = document.getElementById('replay-all-animations');
  if (replayAllBtn) {
    replayAllBtn.addEventListener('click', () => {
      const animatedElements = document.querySelectorAll('[data-animate-group]');
      
      animatedElements.forEach(el => {
        const currentAnim = el.getAttribute('data-animate-class');
        if (currentAnim) {
          el.classList.remove(currentAnim);
          void el.offsetWidth;
          el.classList.add(currentAnim);
        }
      });
    });
  }

  // 4. Sidebar Active Link Highlighter on Scroll
  const sections = document.querySelectorAll('.section-anchor');
  const navLinks = document.querySelectorAll('.sidebar-link');

  // Integração do clique com o Lenis
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      lenis.scrollTo(targetId, { offset: -100 });
    });
  });

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 120) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
});
