const FONT_TEXTURE_URL = new URL('../../assets/textures/font/ascii.png', import.meta.url).href;
const FALLBACK_CHAR_CODE = 63;
const GLYPH_GRID_SIZE = 16;
const GLYPH_SOURCE_SIZE = 8;

interface BitmapTextOptions {
  className?: string;
  uppercase?: boolean;
  ariaLabel?: string;
  glyphGapEm?: number;
}

let atlasPromise: Promise<HTMLImageElement> | null = null;
const glyphDataUrlCache = new Map<number, string>();

const toGlyphCode = (char: string): number => {
  const code = char.charCodeAt(0);
  if (Number.isNaN(code) || code < 0 || code > 255) {
    return FALLBACK_CHAR_CODE;
  }
  return code;
};

const loadAtlas = (): Promise<HTMLImageElement> => {
  if (!atlasPromise) {
    atlasPromise = new Promise((resolve, reject) => {
      const atlas = new Image();
      atlas.decoding = 'async';
      atlas.onload = () => resolve(atlas);
      atlas.onerror = () => reject(new Error('Failed to load ascii font atlas.'));
      atlas.src = FONT_TEXTURE_URL;
    });
  }
  return atlasPromise;
};

const buildGlyphDataUrl = async (glyphCode: number): Promise<string> => {
  const cached = glyphDataUrlCache.get(glyphCode);
  if (cached) {
    return cached;
  }

  const atlas = await loadAtlas();
  const sx = (glyphCode % GLYPH_GRID_SIZE) * GLYPH_SOURCE_SIZE;
  const sy = Math.floor(glyphCode / GLYPH_GRID_SIZE) * GLYPH_SOURCE_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = GLYPH_SOURCE_SIZE;
  canvas.height = GLYPH_SOURCE_SIZE;
  const context = canvas.getContext('2d');
  if (!context) {
    return '';
  }
  context.imageSmoothingEnabled = false;
  context.drawImage(
    atlas,
    sx,
    sy,
    GLYPH_SOURCE_SIZE,
    GLYPH_SOURCE_SIZE,
    0,
    0,
    GLYPH_SOURCE_SIZE,
    GLYPH_SOURCE_SIZE,
  );

  const dataUrl = canvas.toDataURL('image/png');
  glyphDataUrlCache.set(glyphCode, dataUrl);
  return dataUrl;
};

const applyGlyphSprite = (element: HTMLElement, glyphCode: number): void => {
  const glyphKey = String(glyphCode);
  element.dataset.glyphCode = glyphKey;
  void buildGlyphDataUrl(glyphCode)
    .then((dataUrl) => {
      if (!dataUrl || element.dataset.glyphCode !== glyphKey) {
        return;
      }
      element.style.backgroundImage = `url("${dataUrl}")`;
    })
    .catch(() => {
      // Keep glyph empty if atlas cannot be decoded.
    });
};

const createGlyph = (char: string): HTMLElement => {
  const glyph = document.createElement('span');
  glyph.className = 'bitmap-glyph';

  if (char === ' ') {
    glyph.classList.add('space');
    return glyph;
  }

  applyGlyphSprite(glyph, toGlyphCode(char));
  return glyph;
};

export const createBitmapText = (text: string, options: BitmapTextOptions = {}): HTMLElement => {
  const root = document.createElement('span');
  root.className = 'bitmap-text';
  if (options.className) {
    root.className = `bitmap-text ${options.className}`;
  }
  if (typeof options.glyphGapEm === 'number') {
    root.style.setProperty('--glyph-gap', `${options.glyphGapEm}em`);
  }

  const rendered = (options.uppercase ? text.toUpperCase() : text).replace(/\r?\n/g, ' ');
  root.setAttribute('role', 'img');
  root.setAttribute('aria-label', options.ariaLabel ?? text);

  for (const char of rendered) {
    root.append(createGlyph(char));
  }

  return root;
};

void loadAtlas().catch(() => undefined);
