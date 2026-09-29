/**
 * Regions added after services.js was generated: Nodkrai and Snezhnaya.
 *
 * services.js is a generated file (see scripts/generate-services-data.mjs) and
 * regenerating it would drop these, so they live here and are merged by
 * serviceCatalog.js. That keeps the generated file purely generated.
 *
 * Source: "Aprilverse Group Minimum Pricelist [Genshin Impact].xlsx"
 *   - sheet "Exploration"  rows 80-92 (Nodkrai), 94-103 (Snezhnaya)
 *   - sheet "Archon Quests" rows 50-61 (Song of the Welkin Moon), 63-68 (Snezhnaya)
 *   - sheet "Special W.Quests" rows 76-85 (Nod-Krai), 86-98 (Snezhnaya)
 *
 * The spreadsheet quotes primogems only. The site quotes both, at the same rate
 * the rest of the catalogue uses: 50 P = $1.00. Every figure below was read from
 * the sheet and converted; none were invented.
 */

/* 50 P = $1.00, matching every existing price on the site. */
const usd = (primogems) => `$${(primogems / 50).toFixed(2)}`;
const both = (primogems) => `${primogems} P = ${usd(primogems)}`;

/* ------------------------------- exploration ----------------------------- */

const nodkraiExploration = {
  title: '🌑 NODKRAI',
  tables: [
    {
      heading: null,
      note: null,
      columns: ['Area', 'By Area (Low %)', 'Per %'],
      rows: [
        // Hiisi Island through Ashveil Peak are one block in the sheet, subtotal
        // 1175 P. The subtotal is a sheet-internal cross-check, not a saleable
        // bundle, so it is not carried across.
        { cells: ['Hiisi Island', both(150), '1.75 P = $0.04'] },
        { cells: ['Paha Isle', both(200), '2.5 P = $0.05'] },
        { cells: ['Lempo Isle', both(300), '3.5 P = $0.07'] },
        { cells: ['Voidsea Outlook', both(175), '2 P = $0.04'] },
        { cells: ['Wavechaser Plain', both(200), '2.5 P = $0.05'] },
        { cells: ['Ashveil Peak', both(150), '1.75 P = $0.04'] },
        { cells: ['Dunanna Pit', both(50), '1 P = $0.02'] },
        { cells: ['Lunar Highlands', both(550), '6 P = $0.12'] },
        { cells: ['Moontide Sea', both(350), '4 P = $0.08'] },
        { cells: ['Dark Side of the Moon', both(200), '2.5 P = $0.05'] },
      ],
    },
  ],
};

const snezhnayaExploration = {
  title: '❄️ SNEZHNAYA',
  tables: [
    {
      heading: null,
      // Every Snezhnaya row is marked "To be updated" in the source sheet, so
      // the note says so rather than implying these are final.
      note: 'Prices for Snezhnaya exploration are provisional and under review.',
      columns: ['Area', 'By Area (Low %)', 'Per %'],
      rows: [
        { cells: ['Volkodka Tundra', both(255), '3 P = $0.06'] },
        { cells: ['Everfrozen Earth', both(315), '3.5 P = $0.07'] },
        { cells: ['Fellfrost Peak', both(325), '3.5 P = $0.07'] },
        { cells: ['Flamefeather Valley', both(200), '2.5 P = $0.05'] },
        { cells: ['White Birch Snowgrave', both(225), '2.5 P = $0.05'] },
        { cells: ['Bundle', '', 'Price'] },
        { cells: ['100% exploration with world quests', '—', both(2000)] },
      ],
    },
  ],
};

/* --------------------------------- quests -------------------------------- */

const nodkraiQuests = {
  title: '🧭 SPECIAL WORLD QUESTS - NOD-KRAI',
  tables: [
    {
      heading: null,
      note: null,
      columns: ['Quest Name', 'Price (P)', 'Price (USD)'],
      rows: [
        { cells: ["Polkka Beneath the Moon's Oracle", '200 P', usd(200)] },
        { cells: ['Colors of Emptiness', '45 P', usd(45)] },
        { cells: ['East of the Moon, West of the Sun', '200 P', usd(200)] },
        { cells: ["Nightingale's Song", '250 P', usd(250)] },
        { cells: ['Return to Sender', '75 P', usd(75)] },
        { cells: ['Meeting Point quests (6 quests)', '15 P each', usd(15)] },
      ],
    },
  ],
};

const snezhnayaQuests = {
  title: '🧭 SPECIAL WORLD QUESTS - SNEZHNAYA',
  tables: [
    {
      heading: null,
      note: null,
      columns: ['Quest Name', 'Price (P)', 'Price (USD)'],
      rows: [
        { cells: ['Hesperides of Love and Hate', '160 P', usd(160)] },
        { cells: ['In the Dwelling of Life', '245 P', usd(245)] },
        { cells: ['Her Palace Collapses Into the Blizzard', '45 P', usd(45)] },
        { cells: ['On One Side a Palace, On the Other a Tomb', '85 P', usd(85)] },
        { cells: ['Mean Streets of the Despicable', '50 P', usd(50)] },
        { cells: ['For an Ice Mirror Fragment', '20 P', usd(20)] },
        { cells: ['Small Jack Frost, Big Problems', '30 P', usd(30)] },
      ],
    },
    {
      // The sheet lists these three separately under one Meeting Point heading.
      heading: 'MEETING POINT QUESTS',
      note: null,
      columns: ['Quest Name', 'Price (P)', 'Price (USD)'],
      rows: [
        { cells: ['The Korolevskiy Theater', '15 P', usd(15)] },
        { cells: ['Tidesong Cavern', '15 P', usd(15)] },
        { cells: ["Huntman's Cabin", '15 P', usd(15)] },
      ],
    },
  ],
};

export const newExplorationSlides = [nodkraiExploration, snezhnayaExploration];
export const newQuestSlides = [nodkraiQuests, snezhnayaQuests];

/* --------------------------- exploration patches -------------------------- */
/* Individual rows added to regions that already exist in the generated data.
   Kept here rather than edited into services.js, which is generated and would
   lose the change on the next run. */

/* Easybreeze Holiday Resort is the tenth Natlan area. The source sheet's
   Exploration tab prices it at 350 P, 4 P per %, and lists it at 90% of the
   region, but the generated table on the site carried only the other nine - so
   the area silently could not be commissioned at all.

   Checked against the sheet: with this row the ten areas sum to 2235 P, which is
   exactly the subtotal that Natlan block carries. */
export const natlanExtraAreas = [
  {
    after: 'Ancient Sacred Mountain',
    cells: ['Easybreeze Holiday Resort', '350 P = $7.00', '4 P = $0.08'],
  },
];

/* "The World is Your Canvas (full part)" is the eleventh Natlan world quest.
   The generated table on the site stops at nine and is missing two of the
   sheet's entries: this one, and "To the Night, What is the Night's" /
   "The Way Into the Mountain" are all absent. This adds only the one that was
   asked for; the others are reported rather than added silently. */
export const natlanExtraQuests = [
  {
    name: 'The World is Your Canvas (full part)',
    cells: ['The World is Your Canvas (full part)', '150 P', '$3.00'],
  },
];

/* Bundle price for the Natlan exploration slide ("All Natlan Areas with
   Quest").

   This is a stated figure, not a sum of the rows above it, so it is written as a
   literal on purpose. An earlier version computed it as
   exploration + world quests; that produced 3390 P, which was not the intended
   price and has been corrected to 3850 P = $77.00.

   `explorationP` and `questsP` are kept only as the sheet's own subtotals for
   reference. They deliberately do not add up to `bundleP` - the bundle is priced
   as a package, so do not "fix" it by summing the two again. */
export const natlanBundle = {
  /* Sheet subtotals, for reference only. */
  explorationP: 2235,
  questsP: 1155,
  /* The real bundle price. */
  bundleP: 3850,
};

export default {
  newExplorationSlides,
  newQuestSlides,
  natlanExtraAreas,
  natlanExtraQuests,
  natlanBundle,
};
