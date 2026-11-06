const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const PORTFOLIO_DIR = 'assets/images/portfolio';
const THUMBS_DIR = `${PORTFOLIO_DIR}/thumbs`;
const LIGHTBOX_DIR = `${PORTFOLIO_DIR}/lightbox`;
const LIGHTBOX_EDGES = [1600, 2560];
const LIGHTBOX_QUALITIES = [88, 82];
const LIGHTBOX_WEBP_OPTIONS = { effort: 6, smartSubsample: true };
const THUMB_WIDTH = 800;
const CARD_WIDTH = 520;
const WEBP_OPTIONS = { quality: 80, effort: 6 };
const VARIANT_PATTERN = /-\d+w\.webp$/i;

const STATIC_VARIANTS = {
  'assets/images/fotografia-servico.webp': [1080, 1920],
  'assets/images/gestao-redes-sociais-servico.webp': [1080, 1350],
  'assets/images/diferencial-cinema.webp': [768, 1024],
  'assets/images/diferencial-retencao.webp': [768, 1024],
  'assets/images/diferencial-estrategia.webp': [768, 1024],
  'assets/images/diferencial-direcao.webp': [768, 1024],
  'assets/images/briefing-como-trabalhos.webp': [512, 768],
  'assets/images/roteiro-como-trabalhos.webp': [512, 768],
  'assets/images/planejamento-como-trabalhos.webp': [512, 768],
  'assets/images/hero-main-image.webp': [512, 768],
  'assets/images/edicao-como-trabalhos.webp': [512, 768],
  'assets/images/aprovacao-como-trabalhos.webp': [512, 768],
  'assets/images/processo-finalizacao.webp': [512, 768],
  'assets/images/social-prove/ana-vitoria.webp': [640],
  'assets/images/social-prove/pedru-barber.webp': [640],
  'assets/images/social-prove/lucasa.webp': [640],
  'assets/images/social-prove/yasmim-cardoso.webp': [640],
  'assets/images/social-prove/gm-store.webp': [640]
};

const abs = (file) => path.join(ROOT, file);
const toPosix = (file) => file.split(path.sep).join('/');
const variantPath = (file, width) => file.replace(/\.webp$/i, `-${width}w.webp`);

function listWebp(dir, exclude = []) {
  const results = [];
  for (const entry of fs.readdirSync(abs(dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (!exclude.includes(rel)) results.push(...listWebp(rel, exclude));
    } else if (/\.webp$/i.test(entry.name) && !VARIANT_PATTERN.test(entry.name)) {
      results.push(rel);
    }
  }
  return results;
}

function isStale(source, output) {
  if (!fs.existsSync(abs(output))) return true;
  return fs.statSync(abs(source)).mtimeMs > fs.statSync(abs(output)).mtimeMs;
}

async function resize(source, output, width) {
  fs.mkdirSync(path.dirname(abs(output)), { recursive: true });
  await sharp(abs(source))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp(WEBP_OPTIONS)
    .toFile(abs(output));
  const kb = (fs.statSync(abs(output)).size / 1024).toFixed(0);
  console.log(`  ${toPosix(output)} (${kb} KB)`);
}

async function lightboxVariant(source, output, edge) {
  fs.mkdirSync(path.dirname(abs(output)), { recursive: true });
  const { width, height } = await sharp(abs(source)).metadata();

  if (Math.max(width, height) <= edge * 1.15) {
    fs.copyFileSync(abs(source), abs(output));
  } else {
    const sourceSize = fs.statSync(abs(source)).size;
    for (const quality of LIGHTBOX_QUALITIES) {
      await sharp(abs(source))
        .rotate()
        .resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
        .webp({ ...LIGHTBOX_WEBP_OPTIONS, quality })
        .toFile(abs(output));
      if (fs.statSync(abs(output)).size < sourceSize) break;
    }
  }

  const kb = (fs.statSync(abs(output)).size / 1024).toFixed(0);
  console.log(`  ${toPosix(output)} (${kb} KB)`);
}

async function run() {
  const originals = listWebp(PORTFOLIO_DIR, [THUMBS_DIR, LIGHTBOX_DIR]);

  console.log('Versões do lightbox');
  for (const original of originals) {
    for (const edge of LIGHTBOX_EDGES) {
      const output = original
        .replace(`${PORTFOLIO_DIR}/`, `${LIGHTBOX_DIR}/`)
        .replace(/\.webp$/i, `-${edge}.webp`);
      if (isStale(original, output)) await lightboxVariant(original, output, edge);
    }
  }

  console.log('Miniaturas do portfólio');
  for (const original of originals) {
    const thumb = original.replace(`${PORTFOLIO_DIR}/`, `${THUMBS_DIR}/`);
    if (!fs.existsSync(abs(thumb))) await resize(original, thumb, THUMB_WIDTH);
  }

  console.log('Capas responsivas dos cards');
  for (const thumb of listWebp(THUMBS_DIR)) {
    const original = thumb.replace(`${THUMBS_DIR}/`, `${PORTFOLIO_DIR}/`);
    const source = fs.existsSync(abs(original)) ? original : thumb;
    const output = variantPath(thumb, CARD_WIDTH);
    if (isStale(source, output)) await resize(source, output, CARD_WIDTH);
  }

  console.log('Imagens estáticas');
  for (const [source, widths] of Object.entries(STATIC_VARIANTS)) {
    for (const width of widths) {
      const output = variantPath(source, width);
      if (isStale(source, output)) await resize(source, output, width);
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
