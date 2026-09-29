/**
 * Bakes the greyscale treatment into the character artwork at build time.
 *
 * Why this exists
 * ---------------
 * The palette is monochrome, so every piece of character art was desaturated
 * with a CSS `filter: grayscale(1) contrast(1.05)`. On the services page there
 * are sixteen of these images, and they are all animating forever (the float
 * keyframes). A filter and a transform animation on the same element is the
 * expensive combination: the filter has to be re-evaluated as the element
 * moves, on the main thread, every frame. That is what made the page feel
 * laggy and busy even when nothing was happening.
 *
 * The filter is a fixed, known transform of the source pixels, so it does not
 * need to run in the browser at all. Doing it once here produces a plain
 * greyscale PNG, the stylesheet drops the filter, and the animations become
 * pure compositor-friendly transforms.
 *
 * The originals in assets/source/img are never modified, so this is safe to
 * re-run and the treatment can be changed without going back to the art.
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../assets/source/img/', import.meta.url));
const OUT = fileURLToPath(new URL('../public/img/', import.meta.url));

/* Kept in step with the filter this replaces: grayscale, then a slight contrast
   lift so the mid-greys do not look washed out against the card. */
const GREY = sharp().grayscale().linear(1.05, -2);

const files = (await readdir(SRC)).filter((name) => name.endsWith('.png'));

if (files.length === 0) {
  console.error(`No PNGs found in ${SRC} - nothing to generate.`);
  process.exit(1);
}

for (const name of files) {
  const outPath = OUT + name;
  const buffer = await sharp(SRC + name).pipe(GREY.clone()).png({ compressionLevel: 9 }).toBuffer();
  await sharp(buffer).toFile(outPath);

  const [before, after] = await Promise.all([
    stat(SRC + name),
    stat(outPath),
  ]);

  const kb = (bytes) => `${Math.round(bytes / 1024)} kB`;
  console.log(
    `  ${name.padEnd(20)} ${kb(before.size).padStart(8)} -> ${kb(after.size).padStart(8)}  (greyscale baked in)`
  );
}

console.log(`\nPASS  ${files.length} image(s) baked to greyscale - the CSS filter is no longer needed`);
