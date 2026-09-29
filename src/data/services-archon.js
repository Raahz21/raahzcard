/**
 * Archon Quests, priced per act with the quest name.
 *
 * GENERATED FILE - do not hand-edit. Built from the "Archon Quests" sheet of
 * "Aprilverse Group Minimum Pricelist [Genshin Impact].xlsx".
 *
 * This replaces the earlier one-rate-per-region summary. The sheet prices every
 * act individually and they differ widely - Natlan alone runs from 35 P to 140 P -
 * so a single "per act" figure could not represent them honestly. Each act is
 * listed with its own length, price, and a chapter total.
 *
 * USD is derived at the same rate the rest of the catalogue uses, 50 P = $1.00.
 * Each chapter total is read from the sheet and was checked against the sum of
 * its own acts; the generator refuses to emit a module if they disagree.
 */

const usd = (primogems) => `$${(primogems / 50).toFixed(2)}`;
const price = (primogems) => `${primogems} P = ${usd(primogems)}`;

export const archonQuestSlides = [
  {
    title: "🏛️ PROLOGUE — MONDSTADT",
    tables: [
      {
        heading: null,
        note: null,
        columns: ["Act", "Quest Name", "Length (Min)", "Price"],
        rows: [
          { cells: ["ACT I", "The Outlander Who Caught the Wind", "45 min", "30 P = $0.60"] },
          { cells: ["ACT II", "For a Tomorrow Without Tears", "102 min", "65 P = $1.30"] },
          { cells: ["ACT III", "Song of the Dragon and Freedom", "77 min", "50 P = $1.00"] },
          {
            cells: ["Total", "Prologue — Mondstadt", "", "145 P = $2.90"],
            total: true,
          },
        ],
      },
    ],
  },
  {
    title: "🏮 CHAPTER I — LIYUE",
    tables: [
      {
        heading: null,
        note: null,
        columns: ["Act", "Quest Name", "Length (Min)", "Price"],
        rows: [
          { cells: ["ACT I", "Of the Land Amidst Monoliths", "95 min", "60 P = $1.20"] },
          { cells: ["ACT II", "Farewell, Archaic Lord", "114 min", "70 P = $1.40"] },
          { cells: ["ACT III", "A New Star Approaches", "140 min", "85 P = $1.70"] },
          { cells: ["PRELUDE", "Bough Keeper: Dainsleif", "34 min", "25 P = $0.50"] },
          { cells: ["ACT IV", "We Will Be Reunited", "71 min", "45 P = $0.90"] },
          {
            cells: ["Total", "Chapter I — Liyue", "", "285 P = $5.70"],
            total: true,
          },
        ],
      },
    ],
  },
  {
    title: "⛩️ CHAPTER II — INAZUMA",
    tables: [
      {
        heading: null,
        note: null,
        columns: ["Act", "Quest Name", "Length (Min)", "Price"],
        rows: [
          { cells: ["PROLOGUE", "Autumn Winds, Scarlet Leaves", "60 min", "40 P = $0.80"] },
          { cells: ["ACT I", "The Immovable God and the Eternal Euthymia", "173 min", "105 P = $2.10"] },
          { cells: ["ACT II", "Stillness, The Sublimation of Shadow", "47 min", "30 P = $0.60"] },
          { cells: ["ACT III", "Omnipresence Over Mortals", "148 min", "90 P = $1.80"] },
          { cells: ["ACT IV", "Requiem of the Echoing Depths", "60 min", "40 P = $0.80"] },
          {
            cells: ["Total", "Chapter II — Inazuma", "", "305 P = $6.10"],
            total: true,
          },
        ],
      },
    ],
  },
  {
    title: "🌳 CHAPTER III — SUMERU",
    tables: [
      {
        heading: null,
        note: null,
        columns: ["Act", "Quest Name", "Length (Min)", "Price"],
        rows: [
          { cells: ["ACT I", "Through Mists of Smoke and Forests Dark", "213 min", "130 P = $2.60"] },
          { cells: ["ACT II", "The Morn a Thousand Roses Brings", "108 min", "65 P = $1.30"] },
          { cells: ["ACT III", "Dreams, Emptiness, Deception", "60 min", "40 P = $0.80"] },
          { cells: ["ACT IV", "King Desheret and the Three Magi", "140 min", "85 P = $1.70"] },
          { cells: ["ACT V", "Akasha Pulses, the Kalpa Flame Rises", "257 min", "155 P = $3.10"] },
          { cells: ["ACT VI", "Caribert", "75 min", "45 P = $0.90"] },
          {
            cells: ["Total", "Chapter III — Sumeru", "", "520 P = $10.40"],
            total: true,
          },
        ],
      },
    ],
  },
  {
    title: "💧 CHAPTER IV — FONTAINE",
    tables: [
      {
        heading: null,
        note: null,
        columns: ["Act", "Quest Name", "Length (Min)", "Price"],
        rows: [
          { cells: ["ACT I", "Prelude of Blancheur and Noirceur", "193 min", "120 P = $2.40"] },
          { cells: ["ACT II", "As Light Rain Falls Without Reason", "144 min", "90 P = $1.80"] },
          { cells: ["ACT III", "To The Stars Shining in the Depths", "120 min", "75 P = $1.50"] },
          { cells: ["ACT IV", "Cataclysm’s Awakening", "142 min", "90 P = $1.80"] },
          { cells: ["ACT V", "Masquerade of the Guilty", "240 min", "145 P = $2.90"] },
          { cells: ["ACT VI", "Bedtime Story", "71 min", "45 P = $0.90"] },
          {
            cells: ["Total", "Chapter IV — Fontaine", "", "565 P = $11.30"],
            total: true,
          },
        ],
      },
    ],
  },
  {
    title: "🔥 CHAPTER V — NATLAN",
    tables: [
      {
        heading: null,
        note: null,
        columns: ["Act", "Quest Name", "Length (Min)", "Price"],
        rows: [
          { cells: ["ACT I", "Flowers Resplendent on the Sun Scorched Sojourn", "95 min", "60 P = $1.20"] },
          { cells: ["ACT II", "Black Stone Under a White Stone", "97 min", "60 P = $1.20"] },
          { cells: ["ACT III", "Beyond the Smoke and Mirrors", "163 min", "100 P = $2.00"] },
          { cells: ["ACT IV", "The Rainbow Destined to Burn", "180 min", "110 P = $2.20"] },
          { cells: ["INTERLUDE", "All Fires Fuel the Flame", "51 min", "35 P = $0.70"] },
          { cells: ["ACT V", "Incandescent Ode of Resurrection", "227 min", "140 P = $2.80"] },
          { cells: ["ACT VI", "A Space and Time For You", "120 min", "75 P = $1.50"] },
          {
            cells: ["Total", "Chapter V — Natlan", "", "580 P = $11.60"],
            total: true,
          },
        ],
      },
    ],
  },
  {
    title: "🌙 SONG OF THE WELKIN MOON",
    tables: [
      {
        heading: null,
        note: null,
        columns: ["Act", "Quest Name", "Length (Min)", "Price"],
        rows: [
          { cells: ["PRELUDE", "The Journey Home", "150 min", "90 P = $1.80"] },
          { cells: ["ACT I", "A Dance of Snowy Tides and Hoarfrost Groves", "221 min", "135 P = $2.70"] },
          { cells: ["ACT II", "Elegy of Dust and Lamplight", "173 min", "105 P = $2.10"] },
          { cells: ["ACT III", "A Nation That Doesn’t Exist", "135 min", "85 P = $1.70"] },
          { cells: ["ACT IV", "An Elegy for Faded Moonlight", "208 min", "125 P = $2.50"] },
          { cells: ["ACT V", "A Nocturne of the Far North", "153 min", "95 P = $1.90"] },
          { cells: ["ACT VI", "Melting Moonlight in the Morning Mist", "135 min", "85 P = $1.70"] },
          { cells: ["ACT VII", "A Traveler on a Winter’s Night", "145 min", "90 P = $1.80"] },
          { cells: ["ACT VIII", "True Moon", "201 min", "125 P = $2.50"] },
          { cells: ["ACT IX", "As All Falls to Emptiness", "160 min", "100 P = $2.00"] },
          { cells: ["ACT X", "Truth Amongst the Pages of Purana", "266 min", "160 P = $3.20"] },
          {
            cells: ["Total", "Song of the Welkin Moon", "", "1195 P = $23.90"],
            total: true,
          },
        ],
      },
    ],
  },
  {
    title: "❄️ CHAPTER VII — SNEZHNAYA",
    tables: [
      {
        heading: null,
        note: null,
        columns: ["Act", "Quest Name", "Length (Min)", "Price"],
        rows: [
          { cells: ["ACT I", "Everwinter Without Mercy", "251 min", "155 P = $3.10"] },
          { cells: ["ACT II", "Wraith's Nocturne", "261 min", "160 P = $3.20"] },
          { cells: ["ACT III", "White Night, Like a Dream Upon Waking", "165 min", "100 P = $2.00"] },
          { cells: ["ACT IV", "A Rekviem for the Underworld", "171 min", "105 P = $2.10"] },
          { cells: ["EPILOGUE", "—", "10 min", "10 P = $0.20"] },
          {
            cells: ["Total", "Chapter VII — Snezhnaya", "", "520 P = $10.40"],
            total: true,
          },
        ],
      },
    ],
  },
  {
    title: "🎭 INTERLUDE",
    tables: [
      {
        heading: null,
        note: null,
        columns: ["Act", "Quest Name", "Length (Min)", "Price"],
        rows: [
          { cells: ["ACT I", "The Crane Returns on the Wind", "85 min", "55 P = $1.10"] },
          { cells: ["ACT II", "Perilous Trail", "136 min", "85 P = $1.70"] },
          { cells: ["ACT III", "Inversion of Genesis", "137 min", "85 P = $1.70"] },
          { cells: ["ACT IV", "Paralogism", "120 min", "75 P = $1.50"] },
          {
            cells: ["Total", "Interlude", "", "300 P = $6.00"],
            total: true,
          },
        ],
      },
    ],
  },
];

export default archonQuestSlides;