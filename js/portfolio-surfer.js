document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.getElementById('collection-surfer-viewport');
  const track = document.getElementById('surfer-track');
  if (!viewport || !track) return;

  // 1. Featured Collection Items Data
  const surferItems = [
    {
      id: 1,
      title: 'HERITAGE OPERACIONAL',
      category: 'Resgate & Ação',
      image: 'assets/images/portfolio/bombeiro-bigode.webp'
    },
    {
      id: 2,
      title: 'CAVALARIA PMMG',
      category: 'Institucional',
      image: 'assets/images/portfolio/cavalaria-pmmg.webp'
    },
    {
      id: 3,
      title: 'DRIFT UBERLÂNDIA',
      category: 'Automotivo High Speed',
      image: 'assets/images/portfolio/drift-uberlandia.webp'
    },
    {
      id: 4,
      title: 'TEMPLO DA NATUREZA',
      category: 'Estética Cinematográfica',
      image: 'assets/images/portfolio/templo-natureza.webp'
    },
    {
      id: 5,
      title: 'PELÍCULAS BRASIL',
      category: 'Superesportivos',
      image: 'assets/images/portfolio/carro-branco-faixada-peliculas-brasil.webp'
    },
    {
      id: 6,
      title: 'ZEUS EVOLUTION',
      category: 'Campanha Comercial',
      image: 'assets/images/portfolio/zeus-evolution.webp'
    },
    {
      id: 7,
      title: 'RETRATO BEAUTY',
      category: 'Posicionamento de Marca',
      image: 'assets/images/portfolio/retrato-mulher-maquiadora-3.webp'
    },
    {
      id: 8,
      title: 'PMMG',
      category: 'Documental & Eventos',
      image: 'assets/images/portfolio/turma-militar.webp'
    }
  ];

  // 2. Base metrics
  const countBadge = document.getElementById('surfer-items-count');
  if (countBadge) {
    countBadge.textContent = `(${surferItems.length})`;
  }

  // 3. Step vectors configuration (Glued / Layered Effect)
  function getStepVectors() {
    const isMobile = window.innerWidth < 768;
    return {
      stepX: isMobile ? 140 : 220,   // Ajustado para sobreposição elegante com largura menor
      stepY: isMobile ? -35 : -55,  // Inclinação V-shape suave e elegante
      stepZ: isMobile ? -140 : -200 // Profundidade 3D suave
    };
  }

  let { stepX, stepY, stepZ } = getStepVectors();

  // Scroll sensitivity & Distance metrics
  const renderItems = [...surferItems, ...surferItems, ...surferItems];
  const scrollPerItem = 600;
  const loopDistance = renderItems.length * scrollPerItem;

  // 4. Render card elements into the 3D Track
  const cardElements = [];
  let hoveredCardCount = 0;

  function openSurferModal(item) {
    let photoObj = null;

    if (typeof portfolioPhotos !== 'undefined' && Array.isArray(portfolioPhotos)) {
      photoObj = portfolioPhotos.find(p => p.image === item.image || (p.gallery && p.gallery.includes(item.image)));
    }

    if (!photoObj) {
      photoObj = {
        title: item.title,
        category: item.category,
        image: item.image,
        gallery: [item.image]
      };
    }

    if (typeof window.openPortfolioPhotoModal === 'function') {
      window.openPortfolioPhotoModal(photoObj);
    }
  }

  renderItems.forEach((item, i) => {
    const card = document.createElement('div');
    const displayIndex = String((i % surferItems.length) + 1).padStart(2, '0');

    card.className = 'surfer-card surfer-card-size absolute bg-brand-deep/90 border border-white/10 rounded-2xl overflow-hidden transition-colors duration-500 ease-out group cursor-pointer select-none pointer-events-auto';
    card.style.willChange = 'transform, opacity';

    card.setAttribute('data-index', i);

    const thumbUrl = item.image.replace('assets/images/portfolio/', 'assets/images/portfolio/thumbs/');

    card.innerHTML = `
      <div class="absolute top-3 left-3 z-20 text-brand-ice font-mono text-xs md:text-sm font-bold tracking-wider opacity-60 group-hover:opacity-100 transition-opacity drop-shadow">
        ${displayIndex}
      </div>

      <div class="surfer-card-media absolute inset-0 transition-all duration-500">
        <img src="${thumbUrl}" alt="${item.title}" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none">
      </div>

      <div class="absolute inset-0 bg-gradient-to-t from-brand-abyss/90 via-transparent to-black/20 pointer-events-none"></div>

      <div class="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col gap-1 pointer-events-none transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span class="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-brand-soft/80 group-hover:text-brand-ice transition-colors">
          ${item.category}
        </span>
        <h4 class="font-corpline text-xs sm:text-sm md:text-base font-bold text-white leading-snug drop-shadow-md group-hover:text-brand-white">
          ${item.title}
        </h4>
      </div>
    `;

    track.appendChild(card);

    let pointerStartX = 0;
    let pointerStartY = 0;

    card.addEventListener('pointerdown', (e) => {
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
    });

    card.addEventListener('click', (e) => {
      const dist = Math.hypot(e.clientX - pointerStartX, e.clientY - pointerStartY);
      if (dist > 12) return;
      openSurferModal(item);
    });

    const cardObj = {
      el: card,
      index: i,
      scale: 1,
      targetScale: 1,
      isHovered: false
    };

    card.addEventListener('mouseenter', () => {
      hoveredCardCount++;
      cardObj.isHovered = true;
      startLoop();
    });
    card.addEventListener('mouseleave', () => {
      hoveredCardCount = Math.max(0, hoveredCardCount - 1);
      cardObj.isHovered = false;
      startLoop();
    });

    cardElements.push(cardObj);
  });

  // 5. Animation & Interaction State
  let targetProgress = 0;
  let currentProgress = 0;
  let velocity = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startProgress = 0;
  let lastDragTime = 0;
  let autoSurfing = true;

  // 6. Event Handlers (Drag, Touch, Wheel)
  
  // Dragging support
  const onPointerDown = (clientX, clientY) => {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    startProgress = targetProgress;
    velocity = 0;
    lastDragTime = performance.now();
    startLoop();
  };

  const onPointerMove = (clientX, clientY) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    const totalDelta = deltaX - deltaY;

    const now = performance.now();
    const dt = Math.max(1, now - lastDragTime);
    const isMobile = window.innerWidth < 768;
    
    // Increased velocity sensitivity for mobile
    const velocityMultiplier = isMobile ? 3.0 : 1.5;
    velocity = (-totalDelta * velocityMultiplier) / dt;
    lastDragTime = now;

    // Increased drag sensitivity for mobile
    const dragSensitivity = isMobile ? 4 : 2;
    targetProgress = startProgress - totalDelta * dragSensitivity;
    startLoop();
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    
    const isMobile = window.innerWidth < 768;
    const inertiaMultiplier = isMobile ? 35 : 20;
    
    // Apply inertia velocity
    targetProgress += velocity * inertiaMultiplier;
    startLoop();
  };

  // Mouse drag listeners
  viewport.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    onPointerDown(e.clientX, e.clientY);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) onPointerMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', () => {
    onPointerUp();
  });

  // Touch drag listeners
  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    onPointerUp();
  });

  // Wheel scroll interaction
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
    const isMobile = window.innerWidth < 768;
    const wheelSensitivity = isMobile ? 1.5 : 0.8;
    targetProgress += delta * wheelSensitivity;
    startLoop();
  }, { passive: false });

  // Navigation Buttons (Next / Prev)
  const prevBtn = document.getElementById('surfer-prev-btn');
  const nextBtn = document.getElementById('surfer-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      targetProgress -= scrollPerItem;
      startLoop();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      targetProgress += scrollPerItem;
      startLoop();
    });
  }

  // Auto-play Toggle Button
  const autoBtn = document.getElementById('surfer-autoplay-btn');
  if (autoBtn) {
    autoBtn.addEventListener('click', () => {
      autoSurfing = !autoSurfing;
      autoBtn.classList.toggle('text-brand-ice', autoSurfing);
      autoBtn.classList.toggle('text-brand-muted', !autoSurfing);
      startLoop();
    });
  }

  // Responsive resize handler
  window.addEventListener('resize', () => {
    const vectors = getStepVectors();
    stepX = vectors.stepX;
    stepY = vectors.stepY;
    stepZ = vectors.stepZ;
    startLoop();
  });

  // 7. Animation Loop (60fps LERP physics)
  function renderLoop() {
    // Auto drift when idle and not hovering any card
    if (autoSurfing && !isDragging && hoveredCardCount === 0) {
      targetProgress += 0.8;
    }

    // Smooth LERP interpolation for track progress
    currentProgress += (targetProgress - currentProgress) * 0.05; // Heavier/slower ease out

    // Track stays fixed, we move the individual cards instead for a perfect infinite loop
    track.style.transform = `translate3d(0px, 0px, 0px)`;

    // SECOND PASS: Math & Writes
    cardElements.forEach((item) => {
      const i = item.index;
      
      // Infinite Per-Card Wrapping Math
      const virtualPosition = i * scrollPerItem - currentProgress;
      const normalized = ((virtualPosition + loopDistance/2) % loopDistance + loopDistance) % loopDistance - loopDistance/2;
      const offsetIndex = normalized / scrollPerItem;
      
      const baseX = offsetIndex * stepX;
      
      // Mirror Y and Z on both sides for the 'V' shape
      const targetZOffset = item.isHovered ? (Math.abs(offsetIndex) * Math.abs(stepZ) + 180) : 0;
      item.zOffset = (item.zOffset || 0) + (targetZOffset - (item.zOffset || 0)) * 0.12;

      const baseY = Math.abs(offsetIndex) * stepY;
      const baseZ = Math.abs(offsetIndex) * stepZ + item.zOffset;

      // Mirror rotation for left and right cards
      const targetRotationY = Math.max(-38, Math.min(38, -offsetIndex * 38));

      // Hover scale logic
      item.targetScale = item.isHovered ? 1.15 : 1.0;

      // Smooth card scale interpolation
      item.scale += (item.targetScale - item.scale) * 0.12;
      
      // Cards are 100% visible while on screen
      let cardOpacity = 1;

      // Visibility & Pointer-Events Culling
      const isVisible = Math.abs(offsetIndex) <= 10;
      
      const newPointerEvents = isVisible ? 'auto' : 'none';
      const newVisibility = isVisible ? 'visible' : 'hidden';
      const newOpacity = cardOpacity.toFixed(3);
      const newZ = (item.isHovered ? 20000 : 10000) - Math.round(Math.abs(offsetIndex) * 100);
      const newTransform = `translateX(-50%) translate3d(${baseX.toFixed(2)}px, ${baseY.toFixed(2)}px, ${baseZ.toFixed(2)}px) rotateY(${targetRotationY.toFixed(1)}deg) scale(${item.scale.toFixed(3)})`;

      // Only write to DOM if changed (performance optimization)
      if (item.lastPointerEvents !== newPointerEvents) {
        item.el.style.pointerEvents = newPointerEvents;
        item.lastPointerEvents = newPointerEvents;
      }
      if (item.lastVisibility !== newVisibility) {
        item.el.style.visibility = newVisibility;
        item.lastVisibility = newVisibility;
      }
      if (item.lastOpacity !== newOpacity) {
        item.el.style.opacity = newOpacity;
        item.lastOpacity = newOpacity;
      }
      if (item.lastZ !== newZ) {
        item.el.style.zIndex = newZ;
        item.lastZ = newZ;
      }
      if (item.lastTransform !== newTransform) {
        item.el.style.transform = newTransform;
        item.lastTransform = newTransform;
      }
    });

    const isMoving = 
      isDragging || 
      Math.abs(targetProgress - currentProgress) > 0.05 ||
      (autoSurfing && hoveredCardCount === 0);

    if (isPortfolioVisible && isMoving) {
      requestAnimationFrame(renderLoop);
    } else {
      isLoopRunning = false;
      // Se parou de mover mas ainda está visível, garante o alinhamento final preciso
      if (isPortfolioVisible && Math.abs(targetProgress - currentProgress) <= 0.05) {
        currentProgress = targetProgress;
      }
    }
  }

  let isPortfolioVisible = true;
  let isLoopRunning = false;

  function startLoop() {
    if (!isLoopRunning) {
      isLoopRunning = true;
      requestAnimationFrame(renderLoop);
    }
  }

  function stopLoop() {
    isLoopRunning = false;
  }

  // Auto-start loop initially
  startLoop();

  // Trigger startLoop on user interaction
  viewport.addEventListener('mouseenter', startLoop);
  viewport.addEventListener('pointerdown', startLoop);

  if (typeof IntersectionObserver !== 'undefined' && viewport) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isPortfolioVisible = entry.isIntersecting;
        if (isPortfolioVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      });
    }, { rootMargin: '300px 0px' });

    observer.observe(viewport);
  }
});
