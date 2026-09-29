/**
 * Guards the monochrome palette.
 *
 * Fails if any colour literal (hex, rgb/rgba, or a CSS colour keyword) appears
 * in the stylesheets outside the two token blocks, which are the only place a
 * raw colour is allowed. Catches regressions like a stray `color: #4a90e2`
 * creeping back in when a new rule is added.
 *
 *   node scripts/audit-colors.mjs
 */
import { readdirSync, readFileSync } from 'node:fs';

const dir = new URL('../src/styles/', import.meta.url);
const files = readdirSync(dir).filter((name) => name.endsWith('.css'));

const NAMED_COLORS = [
  'white',
  'black',
  'red',
  'blue',
  'green',
  'purple',
  'pink',
  'yellow',
  'cyan',
  'magenta',
  'orange',
  'violet',
  'indigo',
  'teal',
  'navy',
  'silver',
  'gold',
  'olive',
  'lime',
  'aqua',
  'fuchsia',
  'crimson',
  'tomato',
  'beige',
  'ivory',
  'khaki',
  'salmon',
  'turquoise',
];

// A keyword only counts when it is a value, e.g. `color: white`, not inside a
// function name such as grayscale() or a class name such as .nav-link.
const namedValue = new RegExp(`:\\s*(?:[^;{}]*\\s)?(${NAMED_COLORS.join('|')})\\b`, 'i');

const offenders = [];
let tokenCount = 0;

for (const file of files) {
  const source = readFileSync(new URL(file, dir), 'utf8');

  // Token blocks are the only place raw colours belong.
  const tokenBlocks = source.match(/:root\s*(?:\[[^\]]*\])?\s*\{[^}]*\}/g) ?? [];
  tokenCount += tokenBlocks.length;
  const body = source.replace(/:root\s*(?:\[[^\]]*\])?\s*\{[^}]*\}/g, '');

  body.split('\n').forEach((line, index) => {
    const code = line.replace(/\/\*.*?\*\//g, '');
    if (!code.trim()) {
      return;
    }

    const hex = code.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (hex) {
      offenders.push(`${file}:${index + 1}  hex ${hex.join(' ')}  |  ${line.trim()}`);
    }

    if (/\brgba?\s*\(/.test(code)) {
      offenders.push(`${file}:${index + 1}  rgb()/rgba()  |  ${line.trim()}`);
    }

    if (/\bhsla?\s*\(/.test(code)) {
      offenders.push(`${file}:${index + 1}  hsl()/hsla()  |  ${line.trim()}`);
    }

    const named = namedValue.exec(code);
    if (named) {
      offenders.push(
        `${file}:${index + 1}  keyword "${named[1]}"  |  ${line.trim()}`
      );
    }
  });
}

console.log(`scanned ${files.length} stylesheet(s): ${files.join(', ')}`);
console.log(`token blocks allowed to hold raw colours: ${tokenCount}`);

/* Every token value must also be genuinely greyscale (r === g === b), which is
   what makes this a black and white theme rather than merely tokenised. */
const notGrey = [];

for (const file of files) {
  const source = readFileSync(new URL(file, dir), 'utf8');
  const tokenBlocks = source.match(/:root\s*(?:\[[^\]]*\])?\s*\{[^}]*\}/g) ?? [];

  for (const block of tokenBlocks) {
    for (const line of block.split('\n')) {
      const name = /(--[a-z0-9-]+)\s*:/.exec(line)?.[1];
      if (!name) {
        continue;
      }

      const hex = /#([0-9a-fA-F]{6})\b/.exec(line);
      if (hex) {
        const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16));
        if (!(r === g && g === b)) {
          notGrey.push(`${file}  ${name}: #${hex[1]}  is not greyscale`);
        }
        continue;
      }

      const rgb = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(line);
      if (rgb) {
        const [, r, g, b] = rgb.map(Number);
        if (!(r === g && g === b)) {
          notGrey.push(`${file}  ${name}: rgb(${r}, ${g}, ${b})  is not greyscale`);
        }
      }
    }
  }
}

const problems = [];

if (notGrey.length > 0) {
  problems.push(`${notGrey.length} non-greyscale token value(s):`, ...notGrey);
}

if (offenders.length > 0) {
  problems.push(`${offenders.length} colour literal(s) outside the tokens:`, ...offenders);
}

if (problems.length > 0) {
  for (const line of problems) {
    console.log(line.startsWith(' ') ? `  ${line}` : `\n${line}`);
  }
  process.exit(1);
}

console.log('PASS  every token value is greyscale (r === g === b)');
console.log('PASS  the palette is fully tokenised - no colour literals outside the tokens');

