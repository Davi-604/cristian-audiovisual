// SECTION_HEIGHT is the height in pixels of scroll before the image is fully open
const SECTION_HEIGHT = 2500;
const IDLE_HEIGHT = 800; // Extra scroll area for text animation

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.speed = 0.06;
    this.duration = 1.5;
    this.isAnimating = false;
    this.originalText = '';
    this.interval = null;
  }

  scramble() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const steps = this.duration / this.speed;
    let step = 0;
    const text = this.originalText;

    this.interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled += this.chars[Math.floor(Math.random() * this.chars.length)];
        }
      }

      this.el.textContent = scrambled;
      step++;

      if (step > steps) {
        clearInterval(this.interval);
        this.el.textContent = text;
        this.isAnimating = false;
      }
    }, this.speed * 1000);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Text Stagger Animations
  const staggerTexts = document.querySelectorAll('.animate-text-stagger');
  staggerTexts.forEach(el => {
    let baseDelay = 0;
    const computedDelay = window.getComputedStyle(el).animationDelay;
    if (computedDelay && computedDelay !== '0s') {
      baseDelay = parseFloat(computedDelay) || 0;
    }

    const nodes = Array.from(el.childNodes);
    el.innerHTML = '';
    let delayOffset = baseDelay;

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent.replace(/\s+/g, ' ');
        if (node === nodes[0]) text = text.trimStart();
        if (node === nodes[nodes.length - 1]) text = text.trimEnd();

        let currentWordSpan = null;
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === ' ') {
            if (currentWordSpan) {
              el.appendChild(currentWordSpan);
              currentWordSpan = null;
            }
            el.appendChild(document.createTextNode(' '));
          } else {
            if (!currentWordSpan) {
              currentWordSpan = document.createElement('span');
              currentWordSpan.style.display = 'inline-block';
            }
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;
            span.style.animationDelay = `${delayOffset}s`;
            currentWordSpan.appendChild(span);
            delayOffset += 0.08;
          }
        }
        if (currentWordSpan) {
          el.appendChild(currentWordSpan);
        }
      } else {
        el.appendChild(node.cloneNode(true));
      }
    });
  });
  // 0.5 Initialize Wavy Background
  const initWavyBackground = () => {
    const canvas = document.getElementById('wavy-canvas');
    if (!canvas || typeof SimplexNoise === 'undefined') return;

    const ctx = canvas.getContext('2d');
    const simplex = new SimplexNoise();
    let w, h, nt = 0;
    
    const waveColors = [
      "#CEE5F2", // brand-ice
      "#ACCBE1", // brand-soft
      "#7C98B3", // brand-muted
      "#38BDF8", // azul claro destacado
      "#F8FAFC"  // brand-bg
    ];

    const resize = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const drawWave = (n) => {
      nt += 0.002;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = simplex.noise3D(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      const servicosSection = document.getElementById('servicos');
      const maxScroll = servicosSection ? servicosSection.offsetTop : (SECTION_HEIGHT + 4000);
      const heroFadeEnd = SECTION_HEIGHT + IDLE_HEIGHT + 500;
      
      // Mostrar na Hero (antes de maximizar a imagem) e na section Diferenciais (após a Hero sumir)
      const isHeroStart = window.scrollY < (SECTION_HEIGHT - 200);
      const isSecondSection = window.scrollY > heroFadeEnd;
      const shouldShow = (isHeroStart || isSecondSection) && window.scrollY <= maxScroll && document.body.classList.contains('hero-sequence-complete');

      if (shouldShow) {
        canvas.style.opacity = '1';
      } else {
        canvas.style.opacity = '0';
      }

      // Continuar renderizando enquanto estiver próximo para não congelar a animação durante o fade-out
      const isNearHeroFadeOut = window.scrollY > (SECTION_HEIGHT - 1000) && window.scrollY < (SECTION_HEIGHT + 500);
      const isNearSecondSectionFadeIn = window.scrollY > (heroFadeEnd - 1000) && window.scrollY <= (maxScroll + 1000);
      
      if (shouldShow || isNearHeroFadeOut || isNearSecondSectionFadeIn) {
        ctx.fillStyle = "#0A1128"; // brand-deep
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, w, h);
        drawWave(5);
      }

      requestAnimationFrame(render);
    };
    
    render();
  };
  initWavyBackground();

  // 1. Initialize Lenis for Smooth Scrolling
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });
  window.lenis = lenis; // Expose globally for navbar and other scripts

  if (!document.body.classList.contains('preloader-done')) {
    lenis.stop();
  }

  window.addEventListener('preloaderComplete', () => {
    document.body.classList.add('hero-sequence-active');
    setTimeout(() => {
        document.body.classList.add('hero-sequence-complete');
    }, 3000);

    lenis.start();
    lenis.scrollTo(0, { immediate: true });
    window.dispatchEvent(new Event('scroll'));
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Grab elements
  const centerImage = document.querySelector('.center-image-clipped');
  const centerImageInner = document.querySelector('.center-image-inner');
  const heroOverlayCard = document.querySelector('.hero-overlay-content > div');
  const parallaxImages = document.querySelectorAll('.parallax-img');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const heroBottomFade = document.querySelector('.hero-bottom-fade');

  // Text Scramble Init
  const scrambleEl = document.getElementById('scramble-text');
  let scrambleText = null;
  if (scrambleEl) {
    scrambleText = new TextScramble(scrambleEl);
    scrambleText.originalText = "CRISTIAN SALGE";
  }
  const maximizedTextContainer = document.getElementById('hero-maximized-text');
  const staggerSubtitle = document.getElementById('stagger-subtitle');
  let scrambleTriggered = false;

  let glitchInterval = null;
  let glitchTimeout = null;

  const startRandomGlitch = () => {
    if (glitchInterval) return;
    
    const triggerGlitch = () => {
      if (scrambleTriggered && !scrambleText.isAnimating) {
        const nextGlitchIn = Math.random() * 1000 + 800; // Between 0.8 to 1.8 seconds
        const glitchDuration = Math.random() * 400 + 300; // Between 300ms to 700ms
        
        if (scrambleEl && scrambleEl.textContent.trim() !== '') {
          scrambleEl.setAttribute('data-text', scrambleEl.textContent);
          scrambleEl.classList.add('glitch-effect');
          
          glitchTimeout = setTimeout(() => {
            scrambleEl.classList.remove('glitch-effect');
            scrambleEl.removeAttribute('data-text');
          }, glitchDuration);
        }
        
        glitchInterval = setTimeout(triggerGlitch, nextGlitchIn);
      } else {
        glitchInterval = setTimeout(triggerGlitch, 1000);
      }
    };
    
    glitchInterval = setTimeout(triggerGlitch, Math.random() * 1000 + 800);
  };

  const stopRandomGlitch = () => {
    if (glitchInterval) {
      clearTimeout(glitchInterval);
      glitchInterval = null;
    }
    if (glitchTimeout) {
      clearTimeout(glitchTimeout);
      glitchTimeout = null;
    }
    if (scrambleEl) {
      scrambleEl.classList.remove('glitch-effect');
      scrambleEl.removeAttribute('data-text');
    }
  };

  let idleTimeout;
  let lastScrollYForIdle = -1;

  const isNearCTA = () => {
    const ctaFooter = document.getElementById('cta-footer');
    if (!ctaFooter) return false;
    const ctaRect = ctaFooter.getBoundingClientRect();
    // A pill some se a seção do CTA já estiver visível na tela
    return ctaRect.top <= window.innerHeight;
  };

  const showIndicator = () => {
    if (scrollIndicator && !isNearCTA()) {
      scrollIndicator.style.opacity = '1';
    }
  };

  const resetIdleTimer = () => {
    if (scrollIndicator) {
      scrollIndicator.style.opacity = '0';
    }
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(showIndicator, 800);
  };

  // Cache viewport dimensions
  let viewportHeight = window.innerHeight;

  // Recalculate offset tops for parallax elements
  const recalculateOffsets = () => {
    parallaxImages.forEach(img => {
      let offsetTop = 0;
      let temp = img;
      // Traverse up offsetParents to get absolute offsetTop relative to document
      while (temp) {
        offsetTop += temp.offsetTop;
        temp = temp.offsetParent;
      }
      img.dataset.offsetTop = offsetTop;
    });
  };

  // Recalculate offsets on resize and on load
  window.addEventListener('resize', () => {
    viewportHeight = window.innerHeight;
    recalculateOffsets();
  });

  // Execute recalculation after short delay to let images load
  setTimeout(recalculateOffsets, 250);

  // Hook into Lenis scroll event
  lenis.on('scroll', () => {
    const scrollY = window.scrollY;

    // A. Center Image Clip-path & Scale & Opacity
    if (centerImage) {
      // clip1 goes from 25 to 0 as scroll goes from 0 to 1500
      const tClip = Math.min(Math.max(scrollY / SECTION_HEIGHT, 0), 1);
      const clip1 = 25 - (tClip * 25);
      const clip2 = 75 + (tClip * 25);
      
      centerImage.style.clipPath = `polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

      // backgroundSize goes from 170% to 100% as scroll goes from 0 to 2000
      const tSize = Math.min(Math.max(scrollY / (SECTION_HEIGHT + 500), 0), 1);
      const scaleValue = 1.7 - (tSize * 0.7);
      if (centerImageInner) {
        centerImageInner.style.transform = `scale(${scaleValue})`;
      }

      // opacity goes from 1 to 0 as scroll goes from SECTION_HEIGHT + IDLE_HEIGHT to + 500
      let opacity = 1;
      if (scrollY > SECTION_HEIGHT + IDLE_HEIGHT) {
        const tOpacity = Math.min(Math.max((scrollY - (SECTION_HEIGHT + IDLE_HEIGHT)) / 500, 0), 1);
        opacity = 1 - tOpacity;
      }
      centerImage.style.opacity = opacity;
    }

    // A2. Hero Overlay Text Opacity Fade Out (fades from 1 to 0 as scroll goes from 0 to 800)
    if (heroOverlayCard) {
      const tTextOpacity = Math.min(Math.max(scrollY / 800, 0), 1);
      heroOverlayCard.style.opacity = 1 - tTextOpacity;
      
      // Grab elements once for the exit animation
      if (!heroOverlayCard.dataset.initialized) {
        heroOverlayCard.dataset.initialized = 'true';
        heroOverlayCard._span = heroOverlayCard.querySelector('span');
        heroOverlayCard._h1 = heroOverlayCard.querySelector('h1');
        heroOverlayCard._p = heroOverlayCard.querySelector('p');
        heroOverlayCard._btn = heroOverlayCard.querySelector('.mt-4');
      }

      if (tTextOpacity > 0) {
        heroOverlayCard.dataset.hasScrolled = 'true';
      }

      // Exit animations (rewind entry) linked to scroll
      if (tTextOpacity > 0) {
        if (heroOverlayCard._span) {
          heroOverlayCard._span.style.animation = 'none';
          heroOverlayCard._span.style.transform = `translateY(${-30 * tTextOpacity}px)`;
        }
        if (heroOverlayCard._h1) {
          heroOverlayCard._h1.style.transform = `translateY(${20 * tTextOpacity}px)`;
          heroOverlayCard._h1.style.filter = `blur(${8 * tTextOpacity}px)`;
        }
        if (heroOverlayCard._p) {
          heroOverlayCard._p.style.animation = 'none';
          heroOverlayCard._p.style.transform = `translateX(${-30 * tTextOpacity}px)`;
        }
        if (heroOverlayCard._btn) {
          heroOverlayCard._btn.style.animation = 'none';
          heroOverlayCard._btn.style.transform = `translateY(${30 * tTextOpacity}px)`;
        }
      } else if (heroOverlayCard.dataset.hasScrolled) {
        // Reset to final resting state without re-triggering CSS animation
        if (heroOverlayCard._span) {
          heroOverlayCard._span.style.animation = 'none';
          heroOverlayCard._span.style.transform = `translateY(0)`;
        }
        if (heroOverlayCard._h1) {
          heroOverlayCard._h1.style.transform = `translateY(0)`;
          heroOverlayCard._h1.style.filter = `blur(0)`;
        }
        if (heroOverlayCard._p) {
          heroOverlayCard._p.style.animation = 'none';
          heroOverlayCard._p.style.transform = `translateX(0)`;
        }
        if (heroOverlayCard._btn) {
          heroOverlayCard._btn.style.animation = 'none';
          heroOverlayCard._btn.style.transform = `translateY(0)`;
        }
      }
    }

    // A3. Maximized Image text logic
    if (maximizedTextContainer && scrambleText && staggerSubtitle) {
      if (scrollY >= SECTION_HEIGHT) { // Fully expanded
        let textOpacity = 1;
        let exitProgress = 0;
        if (scrollY > SECTION_HEIGHT + IDLE_HEIGHT) {
           exitProgress = Math.min(Math.max((scrollY - (SECTION_HEIGHT + IDLE_HEIGHT)) / 500, 0), 1);
           textOpacity = 1 - exitProgress;
        }
        maximizedTextContainer.style.opacity = textOpacity;
        
        // Simple exit animation for the second part (slide up and scale down slightly)
        maximizedTextContainer.style.transform = `translateY(${-50 * exitProgress}px) scale(${1 - (0.05 * exitProgress)})`;
        
        if (!scrambleTriggered) {
          scrambleTriggered = true;
          scrambleText.scramble();
          
          staggerSubtitle.classList.remove('animate-text-stagger');
          void staggerSubtitle.offsetWidth;
          staggerSubtitle.classList.add('animate-text-stagger');

          startRandomGlitch();
        }
      } else {
        maximizedTextContainer.style.opacity = '0';
        scrambleTriggered = false;
        stopRandomGlitch();
        if (scrambleText.isAnimating) {
          clearInterval(scrambleText.interval);
          scrambleText.isAnimating = false;
          scrambleEl.textContent = '';
        }
      }
    }

    // A4. Bottom Gradient Fade 
    if (heroBottomFade) {
      // Começa a aparecer de SECTION_HEIGHT + IDLE_HEIGHT até + 300
      let fadeOpacity = 0;
      if (scrollY > SECTION_HEIGHT + IDLE_HEIGHT) {
        fadeOpacity = Math.min((scrollY - (SECTION_HEIGHT + IDLE_HEIGHT)) / 300, 1);
      }
      heroBottomFade.style.opacity = fadeOpacity;
    }

    // B. Parallax Floating Images
    parallaxImages.forEach(img => {
      const start = parseFloat(img.getAttribute('data-start') || '0');
      const end = parseFloat(img.getAttribute('data-end') || '0');
      
      const imgTop = parseFloat(img.dataset.offsetTop || '0');
      const imgHeight = img.offsetHeight || 300;

      if (imgTop === 0) return; // Wait for offset calculation

      // Define scroll window where element is active
      const startScroll = imgTop - viewportHeight + start;
      const endScroll = imgTop + imgHeight + Math.abs(end);
      const range = endScroll - startScroll;

      if (range > 0) {
        let progress = (scrollY - startScroll) / range;
        progress = Math.min(Math.max(progress, 0), 1);

        // y-translation formula
        const yVal = start + progress * (end - start);

        // opacity: fades from 1 to 0 in the last 25% of the progress
        let opacityVal = 1;
        if (progress > 0.75) {
          opacityVal = 1 - ((progress - 0.75) / 0.25);
        }

        // scale: shrinks from 1 to 0.85 in the last 25% of the progress
        let scaleVal = 1;
        if (progress > 0.75) {
          scaleVal = 1 - ((progress - 0.75) / 0.25) * 0.15;
        }

        img.style.transform = `translateY(${yVal}px) scale(${scaleVal})`;
        img.style.opacity = opacityVal;
      }
    });

    // C. Scroll Indicator timeout reset (only on meaningful scroll change)
    if (Math.abs(scrollY - lastScrollYForIdle) > 1) {
      lastScrollYForIdle = scrollY;
      resetIdleTimer();
    }
  });

  // Initialize indicator
  resetIdleTimer();

  // Force trigger scroll calculations immediately
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);

  // 2. Intersection Observer for Scroll-Reveal animations (Focos de Atuação items)
  const revealElements = document.querySelectorAll('.fade-up-on-enter');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('entered');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  // 3. Smooth Scroll to Specialties section from header button
  const ctaBtn = document.getElementById('scroll-to-specialties');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo('#specialties-section', { duration: 1.5 });
    });
  }
});
