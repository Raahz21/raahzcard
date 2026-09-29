/**
 * Generates src/data/services.js from the original services.html
 * (github.com/Raahz21/raahzcard, branch `legacy-html`).
 *
 * This is a ONE-TIME MIGRATION TOOL, not a build step. It reads a file that
 * does not live in this repo, so it is deliberately not part of the deploy
 * workflow. `src/data/services.js` is committed; regenerate it by hand only
 * when the legacy source changes:
 *
 *   git clone --depth 1 -b legacy-html https://github.com/Raahz21/raahzcard.git ..\raahzcard-original
 *   node scripts/generate-services-data.mjs
 *
 * The price tables are large and would be tedious (and error prone) to re-type,
 * so they are generated instead. The self-checks below make the script fail
 * loudly if the parse ever drops content.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const SRC = process.argv[2] || process.env.LEGACY_SERVICES_HTML || 'D:/Raahz21/raahzcard-original/services.html';
const OUT = new URL('../src/data/services.js', import.meta.url);

if (!existsSync(SRC)) {
  console.error(`Cannot find the legacy source file:\n  ${SRC}`);
  console.error(
    '\nThis generator needs services.html from the old plain-HTML site, which is not\n' +
      'part of this repository. Clone the legacy branch and pass the path:\n\n' +
      '  git clone --depth 1 -b legacy-html https://github.com/Raahz21/raahzcard.git ..\\raahzcard-original\n' +
      '  node scripts/generate-services-data.mjs ..\\raahzcard-original\\services.html\n\n' +
      'src/data/services.js is already committed, so this is only needed if the\n' +
      'legacy price tables change. It is not required to build or deploy.'
  );
  process.exit(1);
}

const html = readFileSync(SRC, 'utf8');

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

const strip = (s) => decode(s.replace(/<[^>]+>/g, ' '));

function parseTable(tableHtml) {
  const thead = tableHtml.match(/<thead>([\s\S]*?)<\/thead>/);
  const columns = thead
    ? [...thead[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((x) => strip(x[1]))
    : [];

  const tbody = tableHtml.match(/<tbody>([\s\S]*?)<\/tbody>/);
  const rows = [];
  if (tbody) {
    // Split on the next <tr> rather than pairing with </tr>: four rows in the
    // original markup are never closed, which would swallow the next row.
    const rowRe = /<tr\b([^>]*)>([\s\S]*?)(?=<tr\b|<\/tbody>|$)/g;
    for (const tr of tbody[1].matchAll(rowRe)) {
      // Some body rows use <th> instead of <td> for their cells.
      const cells = [...tr[2].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((x) =>
        strip(x[1])
      );
      if (cells.length > 0) {
        rows.push({ cells, total: /total-row/.test(tr[1]) });
      }
    }
  }
  return { columns, rows };
}

const BLOCK_RE =
  /<h3>([\s\S]*?)<\/h3>|<h4>([\s\S]*?)<\/h4>|<p class="note">([\s\S]*?)<\/p>|<table[^>]*>([\s\S]*?)<\/table>/g;

function parseSlide(slideHtml) {
  const tables = [];
  let title = null;
  let pendingHeading = null;
  let pendingNote = null;
  let m;
  BLOCK_RE.lastIndex = 0;

  while ((m = BLOCK_RE.exec(slideHtml))) {
    if (m[1] !== undefined) title = strip(m[1]);
    else if (m[2] !== undefined) pendingHeading = strip(m[2]);
    else if (m[3] !== undefined) pendingNote = strip(m[3]);
    else if (m[4] !== undefined) {
      tables.push({ heading: pendingHeading, note: pendingNote, ...parseTable(m[4]) });
      pendingHeading = null;
      pendingNote = null;
    }
  }
  return { title, tables };
}

const navBlock = html.match(/<div class="card-image-navbar">([\s\S]*?)<\/div>/);
const navItems = [...navBlock[1].matchAll(/<a href="#([^"]+)">([\s\S]*?)<\/a>/g)].map((m) => ({
  id: m[1],
  label: strip(m[2]),
}));

const categories = html
  .split(/<div class="carousel" id="/)
  .slice(1)
  .map((chunk) => {
    const id = chunk.slice(0, chunk.indexOf('"'));
    const body = chunk
      .slice(chunk.indexOf('<div class="carousel-inner">'))
      .split('<div class="carousel-nav">')[0];
    const nav = navItems.find((n) => n.id === id);

    return {
      id,
      label: nav ? nav.label : id,
      slides: body
        .split(/<div class="carousel-item[^"]*">/)
        .slice(1)
        .map(parseSlide),
    };
  });

// ------------------------------ self-checks ------------------------------
const all = (re) => (html.match(re) || []).length;
const bodyRows = (html.match(/<tbody>[\s\S]*?<\/tbody>/g) || []).reduce(
  (n, b) => n + (b.match(/<tr\b/g) || []).length,
  0
);
const sum = (fn) => categories.reduce((n, c) => n + c.slides.reduce(fn, 0), 0);
const slides = () => sum((n, s) => n + 1);

const checks = [
  ['table count', sum((n, s) => n + s.tables.length) === all(/<table class="price-table">/g)],
  ['slide count', slides() === all(/<div class="carousel-item[^"]*">/g)],
  ['row count', sum((n, s) => n + s.tables.reduce((j, t) => j + t.rows.length, 0)) === bodyRows],
  ['category count', categories.length === navItems.length],
  ['every slide titled', categories.every((c) => c.slides.every((s) => s.title))],
  ['no empty table', categories.every((c) => c.slides.every((s) => s.tables.every((t) => t.rows.length > 0)))],
  [
    'rows match columns',
    categories.every((c) => c.slides.every((s) => s.tables.every((t) => t.rows.every((r) => r.cells.length === t.columns.length)))),
  ],
  ['total rows kept', sum((n, s) => n + s.tables.reduce((j, t) => j + t.rows.filter((r) => r.total).length, 0)) === all(/<tr class="total-row">/g)],
];

for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
if (checks.some(([, ok]) => !ok)) {
  console.error('\nParse self-check failed - refusing to write services.js');
  process.exit(1);
}

// ------------------------------ emit module ------------------------------
const L = [];
L.push('/**');
L.push(' * Every price list on the Services page.');
L.push(' *');
L.push(' * GENERATED FILE - do not hand-edit. Run:');
L.push(' *   node scripts/generate-services-data.mjs');
L.push(' *');
L.push(
  ` * ${categories.length} categories, ${slides()} slides, ` +
    `${sum((n, s) => n + s.tables.length)} tables, ` +
    `${sum((n, s) => n + s.tables.reduce((j, t) => j + t.rows.length, 0))} rows.`
);
L.push(' */');
L.push('');
L.push('export const serviceCategories = [');

for (const c of categories) {
  L.push('  {');
  L.push(`    id: ${JSON.stringify(c.id)},`);
  L.push(`    label: ${JSON.stringify(c.label)},`);
  L.push('    slides: [');
  for (const s of c.slides) {
    L.push('      {');
    L.push(`        title: ${JSON.stringify(s.title)},`);
    L.push('        tables: [');
    for (const t of s.tables) {
      L.push('          {');
      L.push(`            heading: ${JSON.stringify(t.heading)},`);
      L.push(`            note: ${JSON.stringify(t.note)},`);
      L.push(`            columns: ${JSON.stringify(t.columns)},`);
      L.push('            rows: [');
      for (const r of t.rows) {
        L.push(
          `              { cells: ${JSON.stringify(r.cells)}${r.total ? ', total: true' : ''} },`
        );
      }
      L.push('            ],');
      L.push('          },');
    }
    L.push('        ],');
    L.push('      },');
  }
  L.push('    ],');
  L.push('  },');
}
L.push('];');
L.push('');
L.push('export default serviceCategories;');

writeFileSync(OUT, L.join('\n'));
console.log(`\nwrote ${L.length} lines to src/data/services.js`);