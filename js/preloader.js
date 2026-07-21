// js/preloader.js

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  document.body.classList.remove('preloader-done');
  document.body.classList.add('overflow-hidden');

  const preloader = document.getElementById('preloader');
  const imageWrapper = document.getElementById('preloader-image-wrapper');
  const cleanImage = document.getElementById('preloader-clean-image');
  const scannerMask = document.getElementById('preloader-scanner-mask');
  const statusText = document.getElementById('preloader-status-text');
  const progressBar = document.getElementById('preloader-progress-bar');
  const counterEl = document.getElementById('preloader-counter');

  if (!preloader || !imageWrapper || !cleanImage || !scannerMask) return;

  let progress = 0;
  let isLoaded = false;
  let isFinished = false;

  window.addEventListener('load', () => {
    isLoaded = true;
  });

  if (document.readyState === 'complete') {
    isLoaded = true;
  }

  const updateProgress = () => {
    if (isFinished) return;

    const increment = isLoaded ? Math.random() * 8 + 6 : Math.random() * 4 + 2;
    progress = Math.min(progress + increment, 100);

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (counterEl) counterEl.textContent = `${Math.floor(progress)}%`;

    if (progress >= 100) {
      if (isLoaded) {
        finishPreloader();
      } else {
        setTimeout(updateProgress, 100);
      }
    } else {
      setTimeout(updateProgress, 40);
    }
  };

  const finishPreloader = () => {
    if (isFinished) return;
    isFinished = true;

    if (statusText) {
      statusText.textContent = 'ANÁLISE CONCLUÍDA — NARRATIVA PRONTA';
      statusText.classList.remove('animate-pulse');
      statusText.classList.add('text-brand-ice');
    }

    // 1. A imagem limpa surge no bloco preto após a conclusão do carregamento
    setTimeout(() => {
      cleanImage.style.opacity = '1';

      // 2. Os elementos de HUD/scanner desvanecem
      setTimeout(() => {
        scannerMask.style.opacity = '0';
        scannerMask.style.pointerEvents = 'none';

        // 3. O preloader como um todo esmaece suavemente revelando o conteúdo da hero
        setTimeout(() => {
          preloader.style.opacity = '0';
          document.body.classList.add('preloader-done');
          document.body.classList.remove('overflow-hidden');
          window.dispatchEvent(new CustomEvent('preloaderComplete'));

          setTimeout(() => {
            preloader.style.display = 'none';
          }, 700);
        }, 400);
      }, 500);
    }, 200);
  };

  updateProgress();
});
