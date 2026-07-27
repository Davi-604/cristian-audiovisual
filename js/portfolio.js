document.addEventListener('DOMContentLoaded', () => {
  const videoGrid = document.getElementById('portfolio-grid-audiovisual');
  const photoGrid = document.getElementById('portfolio-grid-fotografia');

  if (!videoGrid || !photoGrid) return;

  if (typeof portfolioVideos === 'undefined' || typeof portfolioPhotos === 'undefined') {
    console.warn('portfolioVideos ou portfolioPhotos não encontrados.');
    return;
  }

  // Active Lightbox State
  let activeModal = null;
  let activeIframe = null;

  // Intersection Observer para Lazy Loading avançado
  const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px 0px', // Inicia o download 100px antes da imagem aparecer na tela
    threshold: 0.01
  });

  // 1. Render Video Cards (Audiovisual)
  function renderVideos() {
    videoGrid.innerHTML = '';
    portfolioVideos.forEach((video) => {
      const thumbUrl = video.isLocal ? video.thumbnail : `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
      const highResUrl = video.isLocal ? video.thumbnail : `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
      const spanClass = video.span || 'col-span-1';
      const videoCard = document.createElement('div');
      videoCard.className = `portfolio-card relative group rounded-2xl overflow-hidden cursor-pointer bg-brand-deep/80 border border-white/10 hover:border-brand-soft/40 transition-all duration-500 shadow-xl h-full min-h-[250px] md:min-h-[300px] ${spanClass}`;
      videoCard.setAttribute('data-video-id', video.videoId || video.id);
      videoCard.setAttribute('data-aspect', video.aspectRatio);

      videoCard.innerHTML = `
        <div class="thumbnail-container absolute inset-0 z-0 bg-[#060D1E] portfolio-skeleton-shimmer overflow-hidden">
          <img data-src="${thumbUrl}" data-high-res="${highResUrl}" alt="${video.title}" decoding="async" loading="lazy"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-0 lazy-portfolio-img">
          <!-- Sombra que some no hover -->
          <div class="absolute inset-0 bg-black/20 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
          <!-- Gradiente sutil para manter o texto legível -->
          <div class="absolute inset-0 bg-gradient-to-t from-[#030816]/90 via-[#030816]/20 to-transparent pointer-events-none"></div>
        </div>

        <div class="absolute inset-0 z-10 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
          <div class="flex justify-between items-start">
            <span class="px-3 py-1 rounded-full bg-brand-navy/70 backdrop-blur-md border border-brand-soft/20 text-[10px] font-bold text-brand-ice uppercase tracking-widest">
              ${video.badge || video.category}
            </span>
          </div>

          <div class="flex items-end justify-between gap-3">
            <div class="max-w-[80%]">
              <h3 class="font-corpline text-base sm:text-lg md:text-xl font-bold text-white leading-tight drop-shadow-md group-hover:text-brand-ice transition-colors">
                ${video.title}
              </h3>
            </div>
            <div class="play-btn-glow w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-ice/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0 text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="translate-x-[1px]">
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
      `;

      // Image Load Handler
      const img = videoCard.querySelector('.lazy-portfolio-img');
      if (img) {
        lazyImageObserver.observe(img);

        img.onload = () => {
          img.classList.remove('opacity-0');
          img.closest('.thumbnail-container')?.classList.remove('portfolio-skeleton-shimmer');
        };
        if (img.complete && img.src && img.src !== window.location.href) {
          img.classList.remove('opacity-0');
          img.closest('.thumbnail-container')?.classList.remove('portfolio-skeleton-shimmer');
        }
      }

      // Restore High Quality on Hover
      videoCard.addEventListener('mouseenter', () => {
        if (img && img.src !== img.dataset.highRes) {
          img.src = img.dataset.highRes;
        }
      });

      // Handle Click Event
      // Click to open video lightbox
      videoCard.addEventListener('click', () => {
        openVideoModal(video);
      });

      videoGrid.appendChild(videoCard);
    });
  }

  // 2. Render Photo Cards (Fotografia)
  function renderPhotos(filterCategory = 'Destaques') {
    photoGrid.innerHTML = '';
    
    let filtered = [];
    if (filterCategory === 'Destaques') {
      filtered = portfolioPhotos.filter(p => p.isDestaque);
    } else {
      filtered = portfolioPhotos.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());
    }

    filtered.forEach((photo) => {
      const spanClass = photo.span || 'col-span-1';
      const photoCard = document.createElement('div');
      photoCard.className = `portfolio-card relative group rounded-2xl overflow-hidden cursor-pointer bg-brand-deep/80 border border-white/10 hover:border-brand-soft/40 transition-all duration-500 shadow-xl h-full min-h-[250px] md:min-h-[300px] ${spanClass}`;

      photoCard.innerHTML = `
        <div class="thumbnail-container absolute inset-0 z-0 bg-[#060D1E] portfolio-skeleton-shimmer overflow-hidden">
          <img data-src="${photo.image}" alt="${photo.title}" decoding="async" loading="lazy"
            class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-0 lazy-portfolio-img">
          <!-- Sombra que some no hover -->
          <div class="absolute inset-0 bg-black/20 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
          <!-- Gradiente sutil para manter o texto legível -->
          <div class="absolute inset-0 bg-gradient-to-t from-[#030816]/90 via-[#030816]/20 to-transparent pointer-events-none"></div>
        </div>

        <div class="absolute inset-0 z-10 p-5 flex flex-col justify-between pointer-events-none">
          <div class="flex justify-between items-start">
            <span class="px-3 py-1 rounded-full bg-brand-navy/70 backdrop-blur-md border border-brand-soft/20 text-[10px] font-bold text-brand-ice uppercase tracking-widest">
              ${photo.category}
            </span>
          </div>

          <div>
            <h3 class="font-corpline text-base sm:text-lg font-bold text-white leading-tight drop-shadow-md group-hover:text-brand-ice transition-colors">
              ${photo.title}
            </h3>
          </div>
        </div>
      `;

      const img = photoCard.querySelector('.lazy-portfolio-img');
      if (img) {
        lazyImageObserver.observe(img);

        img.onload = () => {
          img.classList.remove('opacity-0');
          img.closest('.thumbnail-container')?.classList.remove('portfolio-skeleton-shimmer');
        };
        if (img.complete && img.src && img.src !== window.location.href) {
          img.classList.remove('opacity-0');
          img.closest('.thumbnail-container')?.classList.remove('portfolio-skeleton-shimmer');
        }
      }

      photoCard.addEventListener('click', () => {
        openPhotoModal(photo);
      });

      photoGrid.appendChild(photoCard);
    });
  }

  // 3. Photo Filter Buttons Logic
  const filterButtons = document.querySelectorAll('#portfolio-photo-filters .portfolio-filter-btn');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-brand-ice/30', 'text-white', 'border-brand-ice/60');
        b.classList.add('bg-brand-deep/90', 'border-white/20', 'text-brand-soft');
      });
      btn.classList.remove('bg-brand-deep/90', 'border-white/20', 'text-brand-soft');
      btn.classList.add('active', 'bg-brand-ice/30', 'text-white', 'border-brand-ice/60');

      const filter = btn.getAttribute('data-filter');
      renderPhotos(filter);
    });
  });

  // 4. Modal Lightbox Logic
  function closeActiveModal() {
    if (!activeModal) return;

    activeModal.classList.remove('lightbox-enter-active');
    if (activeIframe) {
      if (activeIframe.tagName === 'VIDEO') {
        activeIframe.pause();
        activeIframe.removeAttribute('src');
        activeIframe.load();
      } else {
        activeIframe.src = '';
      }
    }

    const modalToRemove = activeModal;
    setTimeout(() => {
      if (document.body.contains(modalToRemove)) {
        document.body.removeChild(modalToRemove);
      }
      document.body.style.overflow = '';
    }, 300);

    activeModal = null;
    activeIframe = null;
  }

  // Listen for browser back button hash
  window.addEventListener('hashchange', () => {
    if (window.location.hash !== '#lightbox' && activeModal) {
      closeActiveModal();
    }
  });

  // Handle ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      if (window.location.hash === '#lightbox') {
        window.history.back();
      } else {
        closeActiveModal();
      }
    }
  });

  function createModalBase() {
    if (activeModal) closeActiveModal();

    if (window.location.hash !== '#lightbox') {
      window.history.pushState(null, '', window.location.pathname + window.location.search + '#lightbox');
    }

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[99999] flex flex-col items-center justify-center portfolio-lightbox-overlay lightbox-enter p-4 md:p-8 touch-none select-none';

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Fechar Modal');
    closeBtn.className = 'absolute top-5 right-5 sm:top-8 sm:right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-brand-blue hover:scale-110 transition-all duration-300 z-[100000] text-white cursor-pointer';
    closeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.location.hash === '#lightbox') {
        window.history.back();
      } else {
        closeActiveModal();
      }
    });

    modal.appendChild(closeBtn);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (window.location.hash === '#lightbox') {
          window.history.back();
        } else {
          closeActiveModal();
        }
      }
    });

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      modal.classList.add('lightbox-enter-active');
    });

    activeModal = modal;
    return modal;
  }

  // Open Video Lightbox
  function openVideoModal(video) {
    const modal = createModalBase();

    const isVertical = video.aspectRatio === '9:16';
    const container = document.createElement('div');
    container.className = 'relative w-full max-w-5xl rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl flex flex-col items-center justify-center';
    
    if (isVertical) {
      container.style.width = 'min(90vw, 420px)';
      container.style.height = 'min(85vh, 750px)';
    } else {
      container.style.width = 'min(92vw, 1000px)';
      container.style.aspectRatio = '16/9';
    }

    if (video.isLocal) {
      container.innerHTML = `
        <div class="absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-300" id="video-loader">
          <svg class="animate-spin h-12 w-12 text-brand-ice drop-shadow-[0_0_15px_rgba(206,229,242,0.8)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <video class="w-full h-full object-cover" controls preload="none" poster="${video.thumbnail}">
          <source src="${video.videoUrl}" type="video/webm">
          <source src="${video.videoUrl.replace('.webm', '.mp4')}" type="video/mp4">
          Seu navegador não suporta o elemento de vídeo.
        </video>
      `;
      const videoElement = container.querySelector('video');
      const loader = container.querySelector('#video-loader');
      
      videoElement.addEventListener('canplay', () => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 300);
      });
      videoElement.addEventListener('playing', () => {
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 300);
      });
      videoElement.addEventListener('waiting', () => {
        loader.style.display = 'flex';
        // force reflow
        void loader.offsetWidth;
        loader.style.opacity = '1';
      });

      // Attempt autoplay
      videoElement.load();
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log('Auto-play prevented', e);
          // If prevented, we might want to hide the loader since the user needs to press play
          loader.style.opacity = '0';
          setTimeout(() => { loader.style.display = 'none'; }, 300);
        });
      }
      activeIframe = videoElement;
    } else {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`;
      iframe.className = 'w-full h-full border-0';
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');

      container.appendChild(iframe);
      activeIframe = iframe;
    }

    modal.appendChild(container);
  }

  // Open Photo Lightbox
  function openPhotoModal(photoObj) {
    const modal = createModalBase();

    const container = document.createElement('div');
    container.className = 'relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center w-full';

    let currentGallery = photoObj.gallery && photoObj.gallery.length > 0 ? photoObj.gallery : [photoObj.image];
    let currentIndex = currentGallery.indexOf(photoObj.image);
    if (currentIndex === -1) currentIndex = 0;

    const imgContainer = document.createElement('div');
    imgContainer.className = 'relative flex items-center justify-center w-full';

    const img = document.createElement('img');
    img.src = currentGallery[currentIndex];
    img.alt = photoObj.title;
    img.className = 'max-w-[90vw] max-h-[80vh] object-contain rounded-2xl border border-white/15 shadow-2xl transition-opacity duration-300';

    imgContainer.appendChild(img);

    // Navigation arrows
    if (currentGallery.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-brand-blue text-white rounded-full flex items-center justify-center backdrop-blur transition-colors z-50';
      prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-brand-blue text-white rounded-full flex items-center justify-center backdrop-blur transition-colors z-50';
      nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';

      const updateImage = (index) => {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = currentGallery[index];
          img.onload = () => { img.style.opacity = '1'; };
          const indicator = container.querySelector('.gallery-indicator');
          if (indicator) {
            indicator.textContent = `${index + 1} / ${currentGallery.length}`;
          }
        }, 150);
      };

      prevBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentGallery.length - 1;
        updateImage(currentIndex);
      };

      nextBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex < currentGallery.length - 1) ? currentIndex + 1 : 0;
        updateImage(currentIndex);
      };

      imgContainer.appendChild(prevBtn);
      imgContainer.appendChild(nextBtn);
    }

    const caption = document.createElement('div');
    caption.className = 'mt-4 text-center';
    
    let indicatorHtml = '';
    if (currentGallery.length > 1) {
      indicatorHtml = `<span class="gallery-indicator font-Supreme text-xs text-brand-muted block mt-2">${currentIndex + 1} / ${currentGallery.length}</span>`;
    }

    caption.innerHTML = `
      <span class="text-xs uppercase tracking-widest text-brand-soft font-bold block mb-1">${photoObj.category}</span>
      <h3 class="font-corpline text-lg md:text-xl text-white font-bold">${photoObj.title}</h3>
      ${indicatorHtml}
    `;

    container.appendChild(imgContainer);
    container.appendChild(caption);
    modal.appendChild(container);
  }

  // Initial Run
  renderVideos();
  renderPhotos('Destaques');
});
