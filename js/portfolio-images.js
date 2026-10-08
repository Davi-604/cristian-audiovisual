const PORTFOLIO_PATH = 'assets/images/portfolio/';
const PORTFOLIO_THUMBS_PATH = `${PORTFOLIO_PATH}thumbs/`;

function portfolioThumb(imagePath) {
  return imagePath.replace(PORTFOLIO_PATH, PORTFOLIO_THUMBS_PATH);
}

function portfolioSrcset(thumbPath) {
  if (!thumbPath.startsWith(PORTFOLIO_THUMBS_PATH)) return '';
  return `${thumbPath.replace(/\.webp$/i, '-520w.webp')} 520w, ${thumbPath} 800w`;
}
