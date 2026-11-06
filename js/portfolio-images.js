const PORTFOLIO_PATH = 'assets/images/portfolio/';
const PORTFOLIO_THUMBS_PATH = `${PORTFOLIO_PATH}thumbs/`;
const PORTFOLIO_LIGHTBOX_PATH = `${PORTFOLIO_PATH}lightbox/`;
const PORTFOLIO_LIGHTBOX_EDGES = [1600, 2560];

function portfolioThumb(imagePath) {
  return imagePath.replace(PORTFOLIO_PATH, PORTFOLIO_THUMBS_PATH);
}

function portfolioSrcset(thumbPath) {
  if (!thumbPath.startsWith(PORTFOLIO_THUMBS_PATH)) return '';
  return `${thumbPath.replace(/\.webp$/i, '-520w.webp')} 520w, ${thumbPath} 800w`;
}

function portfolioFull(imagePath) {
  if (!imagePath.startsWith(PORTFOLIO_PATH) || imagePath.startsWith(PORTFOLIO_THUMBS_PATH)) return imagePath;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const neededEdge = Math.max(Math.min(window.innerWidth * 0.9, 1024), window.innerHeight * 0.8) * dpr;
  const edge = PORTFOLIO_LIGHTBOX_EDGES.find((size) => size >= neededEdge) || PORTFOLIO_LIGHTBOX_EDGES[PORTFOLIO_LIGHTBOX_EDGES.length - 1];

  return imagePath
    .replace(PORTFOLIO_PATH, PORTFOLIO_LIGHTBOX_PATH)
    .replace(/\.webp$/i, `-${edge}.webp`);
}
