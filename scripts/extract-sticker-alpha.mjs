/**
 * Build-time alpha extraction for the one sticker that is a JPEG.
 *
 * `Raahz GITP sticker.jpg` has its black background baked into the pixels, so no
 * CSS can remove it and `mix-blend-mode: screen` can only ever hide it against
 * a known-dark backdrop. This script rebuilds the alpha channel properly and
 * writes a real transparent PNG, which lets the stylesheet drop the blend
 * entirely and render all three stickers the same way.
 *
 * How the key works
 * -----------------
 * Sampling the source showed the background is *pure* black - every border pixel
 * measured luma 0, and 49.3% of all pixels fall in the 0-15 luma bucket. The
 * remaining pixels form a wide empty valley (only ~0.5% spread across luma
 * 16-79) before the artwork starts around luma 80. That valley is what makes a
 * clean key possible: the ramp below sits entirely inside it, so no artwork
 * tone is clipped and the dark teal in the star survives intact.
 *
 * A hard threshold would alias the artwork's edge, so alpha is ramped smoothly
 * across the valley. Partially transparent pixels are then un-premultiplied
 * (colour divided by alpha) to remove the black that JPEG compression mixed
 * into the edge, which is what stops a dark halo from appearing once the PNG is
 * no longer on black.
 *
 * Like the price generator, this refuses to write output that looks wrong
 * rather than silently producing a broken asset.
 */

import sharp from 'sharp';
import { writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

/*
 * The source JPEG lives in `assets/source/`, NOT in `public/`. Vite copies
 * everything under `public/` into the build verbatim, so keeping the source
 * there would deploy ~144 kB of black-backgrounded original that the UI never
 * loads. Only the keyed PNG is published.
 */
const SOURCE = join(root, 'assets', 'source', 'Raahz GITP sticker.jpg');
const TARGET = join(root, 'public', 'stickers', 'Raahz GITP sticker.png');

/**
 * The keying ramp, in 0-255 luma. Both ends sit inside the measured empty
 * valley (16-79) rather than on its edges: LOW is above the JPEG's black noise
 * floor, HIGH is well below the artwork's darkest real tone.
 */
const LOW = 8;
const HIGH = 56;

/** Guard rails, so a re-encoded or re-edited source cannot pass unnoticed. */
const MIN_ARTWORK_COVERAGE = 0.15;
const MAX_BACKGROUND_COVERAGE = 0.9;

/**
 * Longest edge of the emitted PNG, in pixels. The card shows this sticker at
 * 144 CSS px, so 512 keeps it crisp on high-DPI screens (and the panel can grow)
 * without carrying the source's full 1732px into the bundle.
 */
const MAX_EDGE = 512;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** Smoothstep, for a ramp with no visible banding at the alpha edges. */
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

const fail = (message) => {
  console.error(`FAIL  ${message}`);
  process.exitCode = 1;
};

const pass = (message) => console.log(`PASS  ${message}`);

async function main() {
  const { data, info } = await sharp(SOURCE)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  if (channels !== 3) {
    fail(`expected a 3-channel JPEG, got ${channels} channels`);
    return;
  }

  // RGBA out, so the alpha channel can be written alongside the colour.
  const out = Buffer.alloc(width * height * 4);

  let transparent = 0;
  let partial = 0;
  let opaque = 0;

  for (let i = 0; i < width * height; i += 1) {
    const src = i * channels;
    const dst = i * 4;

    const r = data[src];
    const g = data[src + 1];
    const b = data[src + 2];
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    const alpha = smoothstep(LOW, HIGH, luma);

    if (alpha === 0) {
      transparent += 1;
      out[dst] = 0;
      out[dst + 1] = 0;
      out[dst + 2] = 0;
      out[dst + 3] = 0;
      continue;
    }

    if (alpha >= 1) {
      opaque += 1;
      out[dst] = r;
      out[dst + 1] = g;
      out[dst + 2] = b;
      out[dst + 3] = 255;
      continue;
    }

    partial += 1;
    /*
     * Un-premultiply. The source is artwork-on-black, so a pixel at alpha `a`
     * had roughly `a * colour` recorded. Dividing recovers the intended colour
     * and removes the black JPEG ringing along the edge. Guarded, because
     * dividing by a tiny alpha would amplify noise into saturated speckle.
     */
    const boost = 1 / Math.max(alpha, 0.35);
    out[dst] = clamp(Math.round(r * boost), 0, 255);
    out[dst + 1] = clamp(Math.round(g * boost), 0, 255);
    out[dst + 2] = clamp(Math.round(b * boost), 0, 255);
    out[dst + 3] = Math.round(alpha * 255);
  }



  const total = width * height;
  const backgroundShare = transparent / total;
  const artworkShare = (opaque + partial) / total;

  // Report before writing, so a bad key is explained rather than just rejected.
  console.log(`source      ${SOURCE.replace(root, '.')}`);
  console.log(`dimensions  ${width}x${height}`);
  console.log(`alpha ramp  luma ${LOW} -> ${HIGH}`);
  console.log(
    `coverage    transparent ${(backgroundShare * 100).toFixed(1)}%, ` +
      `partial ${((partial / total) * 100).toFixed(2)}%, ` +
      `opaque ${((opaque / total) * 100).toFixed(1)}%`
  );
  console.log('');

  if (backgroundShare > MAX_BACKGROUND_COVERAGE) {
    fail(
      `only ${(backgroundShare * 100).toFixed(1)}% keyed as background - the ` +
        'ramp is too high and is eating the artwork'
    );
    return;
  }

  if (artworkShare < MIN_ARTWORK_COVERAGE) {
    fail(
      `only ${(artworkShare * 100).toFixed(1)}% survived as artwork - the ` +
        'ramp is too aggressive or the source is not black-backed'
    );
    return;
  }

  /*
   * The keying pass runs at full 1732x1732 resolution, because the ramp has to
   * be evaluated against the original pixels. Only the finished RGBA buffer is
   * then trimmed and downscaled.
   *
   * `trim` drops the fully-transparent border the keying just created, and
   * `resize` caps the long edge. The card renders this sticker at 144 CSS px, so
   * 512 is still ~3.5x for high-DPI screens while cutting what would otherwise
   * be a ~1.9 MB download for one thumbnail.
   */
  const png = await sharp(out, {
    raw: { width, height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();

  await writeFile(TARGET, png);

  const { size } = await stat(TARGET);
  const { size: sourceSize } = await stat(SOURCE);

  pass('source is a black-backed JPEG');
  pass(`background keyed within the empty luma valley (${LOW}-${HIGH})`);
  pass('partial pixels un-premultiplied to avoid a dark halo');
  pass(`artwork coverage plausible (${(artworkShare * 100).toFixed(1)}%)`);
  pass(
    `wrote ${TARGET.replace(root, '.')} (${(size / 1024).toFixed(0)} kB, ` +
      `source was ${(sourceSize / 1024).toFixed(0)} kB)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
