/**
 * The service catalogue the page renders.
 *
 * services.js is generated from the old plain-HTML site and is left exactly as
 * generated. Three things are newer than that source and live alongside it:
 *
 *   services-new-regions.js  Nodkrai and Snezhnaya exploration and world quests
 *   services-archon.js       every Archon Quest chapter, priced per act
 *
 * They are merged in here, and this is the single place the halves are combined,
 * so nothing downstream has to know which file a slide came from.
 */
import { serviceCategories as generated } from './services';
import {
  newExplorationSlides,
  newQuestSlides,
  natlanExtraAreas,
  natlanExtraQuests,
  natlanBundle,
} from './services-new-regions';
import { archonQuestSlides } from './services-archon';

/* Appends a slide to a category, creating the category if it is missing.
   Appended rather than inserted so the existing regional order - which follows
   release order - is preserved. */
function addSlides(categories, categoryId, slides) {
  const found = categories.find((category) => category.id === categoryId);

  if (!found) {
    categories.push({ id: categoryId, label: categoryId, slides: [...slides] });
    return;
  }

  found.slides = [...found.slides, ...slides];
  return undefined;
}

/* Inserts extra area rows into a region table that already exists in the
   generated data, so a newly released area can be added without editing the
   generated file. The row goes after the anchor it names, so a later edit to
   the generated ordering cannot silently drop the patch at the end of the list. */
function patchExplorationAreas(categories, patch) {
  const exploration = categories.find((category) => category.id === 'exploration');
  if (!exploration) return;

  for (const entry of patch) {
    const slide = exploration.slides.find((s) => /NATLAN/.test(s.title));
    const table = slide?.tables?.[0];
    if (!table) continue;

    /* Already applied - guard against the patch running twice. */
    if (table.rows.some((row) => row.cells[0] === entry.cells[0])) continue;

    const anchor = table.rows.findIndex((row) => row.cells[0] === entry.after);
    const bundle = table.rows.findIndex((row) => row.cells[0] === 'Bundle');

    /* Prefer the named anchor; fall back to just above the bundle divider. */
    const at = anchor !== -1 ? anchor + 1 : bundle === -1 ? table.rows.length : bundle;

    table.rows = [
      ...table.rows.slice(0, at),
      { cells: entry.cells },
      ...table.rows.slice(at),
    ];
  }
}

/* Adds missing world quests to a region table that already exists in the
   generated data, and re-derives that region's bundle price from the source
   sheet. Appended to the end of the quest list, which is the order the sheet
   itself uses for the newer entries. */
function patchQuestsAndBundle(categories, extraQuests, bundle) {
  const quest = categories.find((category) => category.id === 'quest');
  if (!quest) return;

  for (const entry of extraQuests) {
    const slide = quest.slides.find((s) => /OTHER REGIONS/.test(s.title));
    const table = slide?.tables?.find((t) => /NATLAN/.test(t.heading || ''));
    if (!table) continue;

    if (table.rows.some((row) => row.cells[0] === entry.cells[0])) continue;

    table.rows = [...table.rows, { cells: entry.cells }];
  }

  /* The Natlan bundle sits on the exploration slide as "All Natlan Areas with
     Quest". Its old figure predates the current sheet, so it is recomputed
     rather than carried over. */
  if (!bundle) return;

  const exploration = categories.find((category) => category.id === 'exploration');
  const natlan = exploration?.slides.find((s) => /NATLAN/.test(s.title));
  const areas = natlan?.tables?.[0];
  if (!areas) return;

  const bundleRow = areas.rows.find((r) => /^All Natlan/.test(r.cells[0]));
  if (!bundleRow) return;

  areas.rows = areas.rows.map((r) =>
    r === bundleRow
      ? {
          ...r,
          cells: [
            r.cells[0],
            '—',
            `${bundle.bundleP} P = $${(bundle.bundleP / 50).toFixed(2)}`,
          ],
        }
      : r
  );
}

/* The Archon summary used to be a single table of one flat rate per region. The
   source sheet prices every act individually and they differ widely, so the
   summary is replaced wholesale by the per-chapter tables in services-archon.js.
   The two summary rows added for the newer regions are no longer needed - those
   regions now have their own full chapter listings. */
function replaceArchonSlides(categories) {
  const quest = categories.find((category) => category.id === 'quest');
  if (!quest) return;

  const firstArchon = quest.slides.findIndex((slide) =>
    slide.title.includes('ARCHON QUESTS')
  );

  if (firstArchon === -1) {
    quest.slides = [...quest.slides, ...archonQuestSlides];
    return;
  }

  quest.slides = [
    ...quest.slides.slice(0, firstArchon),
    ...archonQuestSlides,
    ...quest.slides.slice(firstArchon + 1),
  ];
}

const serviceCategories = generated.map((category) => ({
  ...category,
  slides: category.slides.map((slide) => ({ ...slide })),
}));

addSlides(serviceCategories, 'exploration', newExplorationSlides);
addSlides(serviceCategories, 'quest', newQuestSlides);
patchExplorationAreas(serviceCategories, natlanExtraAreas);
patchQuestsAndBundle(serviceCategories, natlanExtraQuests, natlanBundle);
replaceArchonSlides(serviceCategories);

export { serviceCategories };
export default serviceCategories;
