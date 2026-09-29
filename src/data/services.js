/**
 * Every price list on the Services page.
 *
 * GENERATED FILE - do not hand-edit. Run:
 *   node scripts/generate-services-data.mjs
 *
 * 8 categories, 39 slides, 44 tables, 219 rows.
 */

export const serviceCategories = [
  {
    id: "abyss",
    label: "Abyss and Theater",
    slides: [
      {
        title: "🌌 ABYSS - Per Cycle",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Floor Range","Price Per Floor","Total Price (USD)"],
            rows: [
              { cells: ["Floor 1 - 8","20 P = $0.40","160 P = $3.20"] },
              { cells: ["Floor 9 - 10","50 P = $1.00","100 P = $2.00"] },
              { cells: ["Floor 11","—","70 P = $1.40"] },
              { cells: ["Floor 12","—","90 P = $1.80"] },
              { cells: ["Total","—","250 P = $5.00"], total: true },
            ],
          },
        ],
      },
      {
        title: "🎭 IMAGINARIUM THEATER - Per Cycle",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Act Range","Price Per Act","Total Price (USD)"],
            rows: [
              { cells: ["Act 1 - 6","25 P = $0.50","150 P = $3.00"] },
              { cells: ["Act 7 - 8","35 P = $0.70","70 P = $1.40"] },
              { cells: ["Act 9 - 10","40 P = $0.80","80 P = $1.60"] },
              { cells: ["Total","—","300 P = $6.00"], total: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ascension",
    label: "Ascension",
    slides: [
      {
        title: "🧍 CHARACTER ASCENSION",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Phase","L. Mats","A. Boss","E. Drops","Price (USD)"],
            rows: [
              { cells: ["1","03","/","03 (Tier 1)","5 P = $0.10"] },
              { cells: ["2","10","02","15 (Tier 1)","15 P = $0.30"] },
              { cells: ["3","20","04","12 (Tier 2)","25 P = $0.50"] },
              { cells: ["4","30","08","18 (Tier 2)","40 P = $0.80"] },
              { cells: ["5","45","12","12 (Tier 3+)","60 P = $1.20"] },
              { cells: ["6","60","20","24 (Tier 3+)","80 P = $1.60"] },
              { cells: ["TOTAL","168","46","18/30/36","225 P = $4.50"], total: true },
            ],
          },
        ],
      },
      {
        title: "⚔️ WEAPON ASCENSION",
        tables: [
          {
            heading: null,
            note: "🔖 Note: Full leveling (1/40–90) can offer up to 10% discount on the total.",
            columns: ["Phase","D. Drops","E. Drops","C. Drops","Price (USD)"],
            rows: [
              { cells: ["1","05 (Tier 1)","05 (Tier 1)","03 (Tier 1)","10 P = $0.20"] },
              { cells: ["2","05 (Tier 2)","18 (Tier 1)","12 (Tier 1)","15 P = $0.30"] },
              { cells: ["3","09 (Tier 2)","09 (Tier 2)","09 (Tier 2)","20 P = $0.40"] },
              { cells: ["4","05 (Tier 3)","18 (Tier 2)","14 (Tier 2)","30 P = $0.60"] },
              { cells: ["5","09 (Tier 3)","14 (Tier 3)","09 (Tier 3)","45 P = $0.90"] },
              { cells: ["6","06 (Tier 4)","27 (Tier 3)","18 (Tier 3)","60 P = $1.20"] },
              { cells: ["TOTAL","34 (T1–T4)","91 (T1–T3)","65 (T1–T3)","180 P = $3.60"], total: true },
            ],
          },
        ],
      },
      {
        title: "📖 TALENT ASCENSION",
        tables: [
          {
            heading: null,
            note: "🔖 Note: Full leveling from 2–10 per talent skill can offer up to 15% discount on total.",
            columns: ["Level","D. Drops","E. Drops","W. Drops","Price (USD)"],
            rows: [
              { cells: ["1 → 2","03 (Tier 1)","06 (Tier 1)","/","5 P = $0.10"] },
              { cells: ["2 → 3","02 (Tier 2)","03 (Tier 2)","/","5 P = $0.10"] },
              { cells: ["3 → 4","04 (Tier 2)","04 (Tier 2)","/","10 P = $0.20"] },
              { cells: ["4 → 5","06 (Tier 2)","06 (Tier 2)","/","15 P = $0.30"] },
              { cells: ["5 → 6","09 (Tier 2)","09 (Tier 2)","/","20 P = $0.40"] },
              { cells: ["6 → 7","04 (Tier 3)","04 (Tier 3)","01","25 P = $0.50"] },
              { cells: ["7 → 8","06 (Tier 3)","06 (Tier 3)","01","30 P = $0.60"] },
              { cells: ["8 → 9","12 (Tier 3)","09 (Tier 3)","02","55 P = $1.10"] },
              { cells: ["9 → 10","16 (Tier 3)","12 (Tier 3)","02","70 P = $1.40"] },
              { cells: ["TOTAL","62 (T1–T3)","59 (T1–T3)","06","235 P = $4.70"], total: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "exploration",
    label: "Exploration",
    slides: [
      {
        title: "🍃 MONDSTADT",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Starfell Valley","200 P = $4.00","3 P = $0.06"] },
              { cells: ["Brightcrown Mountain","150 P = $3.00","3 P = $0.06"] },
              { cells: ["Windwail Highlands","150 P = $3.00","3 P = $0.06"] },
              { cells: ["Galesong Hill","100 P = $2.00","2 P = $0.04"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["All Mondstadt Areas","—","500 P = $10.00"] },
            ],
          },
        ],
      },
      {
        title: "❄️ DRAGONSPINE",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Dragonspine","300 P = $6.00","4 P = $0.08"] },
            ],
          },
        ],
      },
      {
        title: "🟡 LIYUE",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Lisha","150 P = $3.00","3 P = $0.06"] },
              { cells: ["Sea of Clouds","200 P = $4.00","3 P = $0.06"] },
              { cells: ["Qiongji Estuary","250 P = $5.00","3 P = $0.06"] },
              { cells: ["Bishui Plains","275 P = $5.50","4 P = $0.04"] },
              { cells: ["Minlin","300 P = $6.00","4 P = $0.08"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["All Liyue Areas","—","900 P = $18.00"] },
            ],
          },
        ],
      },
      {
        title: "⛏️ THE CHASM",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Chasm Surface","175 P = $3.50","3 P = $0.06"] },
              { cells: ["Chasm Underground","300 P = $6.00","4 P = $0.08"] },
            ],
          },
        ],
      },
      {
        title: "⚡ INAZUMA",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Narukami","250 P = $5.00","4 P = $0.08"] },
              { cells: ["Kannazuka","200 P = $4.00","3 P = $0.06"] },
              { cells: ["Yashiori","200 P = $4.00","3 P = $0.06"] },
              { cells: ["Seirai","275 P = $5.50","4 P = $0.06"] },
              { cells: ["Watasumi","200 P = $4.00","3 P = $0.06"] },
              { cells: ["Tsurumi","275 P = $5.50","4 P = $0.08"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["All Inazuma Areas w/ Quest","—","2450 P = $49.00"] },
            ],
          },
        ],
      },
      {
        title: "🌌 ENKANOMIYA",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Enkanomiya","500 P = $10.00","5 P = $0.10"] },
            ],
          },
        ],
      },
      {
        title: "🌳 SUMERU — Forest Region",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Lokapala Jungle","200 P = $4.00","3 P = $0.06"] },
              { cells: ["Visshudha Field","225 P = $4.50","3 P = $0.06"] },
              { cells: ["Avidya Forest","225 P = $4.50","3 P = $0.06"] },
              { cells: ["Ardavi Valley","275 P = $5.50","3 P = $0.06"] },
              { cells: ["Ashavan Realm","325 P = $6.50","4 P = $0.08"] },
              { cells: ["Varanara","100 P = $2.00","1 P = $0.02"] },
              { cells: ["Lost Nursery","50 P = $1.00","1 P = $0.02"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["All Sumeru Forest Areas w/ Quest","—","1900 P = $38.00"] },
            ],
          },
        ],
      },
      {
        title: "🏜️ SUMERU — Desert (v3.1)",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Land of Upper Setekh","250 P = $5.00","3 P = $0.06"] },
              { cells: ["Land of Lower Setekh","275 P = $5.50","3 P = $0.06"] },
              { cells: ["Hypostyle Desert","325 P = $6.50","4 P = $0.08"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["All Sumeru v3.1 Areas w/ Quest","—","1500 P = $30.00"] },
            ],
          },
        ],
      },
      {
        title: "🌪️ HADRAMAVETH",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Hadramaveth","500 P = $10.00","6 P = $0.12"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["Hadramaveth with quest","—","875 P = $17.50"] },
            ],
          },
        ],
      },
      {
        title: "🏝️ SUMERU — Desert (v3.6)",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Gavireh Lajavard","250 P = $5.00","3 P = $0.06"] },
              { cells: ["Realm of Farakhkert","225 P = $4.50","3 P = $0.06"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["All Sumeru v3.6 Areas w/ Quest","—","775 P = $15.50"] },
            ],
          },
        ],
      },
      {
        title: "🌊 FONTAINE",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Belleau Region","150 P = $3.00","3 P = $0.06"] },
              { cells: ["Beryl Region","225 P = $4.50","3 P = $0.06"] },
              { cells: ["Court of Fontaine","325 P = $6.50","4 P = $0.06"] },
              { cells: ["Liffey Region","200 P = $4.00","3 P = $0.06"] },
              { cells: ["Research Institute","275 P = $5.50","3 P = $0.06"] },
              { cells: ["Erinnyes Forest","175 P = $3.50","3 P = $0.06"] },
              { cells: ["Morte Region","275 P = $5.50","3 P = $0.06"] },
              { cells: ["Nostoi Region","100 P = $2.00","3 P = $0.06"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["All Fontaine Areas with Quest","—","3275 P = $65.50"] },
            ],
          },
        ],
      },
      {
        title: "🌊 SEA OF BYGONE ERAS",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Sea of Bygone Eras","300 P = $6.00","4 P = $0.08"] },
            ],
          },
        ],
      },
      {
        title: "🔥 NATLAN",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Toyac Springs","175 P = $3.50","2 P = $0.04"] },
              { cells: ["Tequemecan Valley","225 P = $4.50","3 P = $0.06"] },
              { cells: ["Basin of Unnumbered Flames","250 P = $5.00","3 P = $0.06"] },
              { cells: ["Coatepecan Mountain","250 P = $5.00","3 P = $0.06"] },
              { cells: ["Quahuacan Cliff","100 P = $2.00","2 P = $0.04"] },
              { cells: ["Tezcatepetonco Range","200 P = $4.00","3 P = $0.06"] },
              { cells: ["Ochkanatlan","300 P = $6.00","4 P = $0.08"] },
              { cells: ["Atocpan","300 P = $6.00","4 P = $0.08"] },
              { cells: ["Ancient Sacred Mountain","250 P = $5.00","4 P = $0.08"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["All Natlan Areas with Quest","—","3375 P = $67.50"] },
            ],
          },
        ],
      },
      {
        title: "🏔️ CHENYU VALE",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Area","By Area (Low %)","Per %"],
            rows: [
              { cells: ["Upper Valley","250 P = $5.00","3 P = $0.06"] },
              { cells: ["Southern Mountains","300 P = $6.00","4 P = $0.06"] },
              { cells: ["Mt. Laixin","50 P = $1.00","1 P = $0.02"] },
              { cells: ["Bundle","","Price"] },
              { cells: ["All Chenyu Vale Areas with Quest","—","750 P = $15.00"] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "farming",
    label: "Farming",
    slides: [
      {
        title: "🎯 PRIMOHUNT",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Type","Price"],
            rows: [
              { cells: ["Per Wish","30 P = $0.60"] },
              { cells: ["Bundle","Price"] },
              { cells: ["Per 10 Pulls","250 P = $5.00"] },
              { cells: ["Price may vary depending on source of primogems","250 P- 350 P = $5.00 - $7.00"] },
            ],
          },
        ],
      },
      {
        title: "🧪 MATERIAL FARMING",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Material Type","Tier","Unit Rate","Price (USD)"],
            rows: [
              { cells: ["Local Specialties","—","3 pc / 1 P","$0.02 / 3 pc"] },
              { cells: ["Enemy Drops","Tier 1","3 pc / 1 P","$0.02 / 3 pc"] },
              { cells: ["Enemy Drops","Tier 2","2 pc / 1 P","$0.02 / 2 pc"] },
              { cells: ["Enemy Drops","Tier 3","1 pc / 1 P","$0.02 / pc"] },
              { cells: ["Fishing","—","2 pc / 1 P","$0.02 / 2 pc"] },
              { cells: ["Crystal Cores","—","3 pc / 1 P","$0.02 / 3 pc"] },
              { cells: ["Wood","—","5 pc / 1 P","$0.02 / 5 pc"] },
            ],
          },
        ],
      },
      {
        title: "🎉 EVENTS",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Event Type","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Minor Event","80 P","$1.60"] },
              { cells: ["Major Event (no expl.)","200 P","$4.00"] },
              { cells: ["Exploration Event","2500 P","$50.00"] },
            ],
          },
        ],
      },
      {
        title: "🔍 SIGIL HUNT & OFFERINGS",
        tables: [
          {
            heading: "Basic Sigils",
            note: null,
            columns: ["Sigil Type","Price/Unit","Price (USD)"],
            rows: [
              { cells: ["Anemo Sigil","2 P / sigil","$0.04 / sigil"] },
              { cells: ["Geo Sigil","2 P / sigil","$0.04 / sigil"] },
            ],
          },
          {
            heading: "Sakura Tree",
            note: null,
            columns: ["Level Range","Price per Level","Price (USD)"],
            rows: [
              { cells: ["1–30","25 P / level","$0.50 / level"] },
              { cells: ["31–50","30 P / level","$0.60 / level"] },
            ],
          },
          {
            heading: "Fountain of Lucine",
            note: null,
            columns: ["Level Range","Price per Level","Price (USD)"],
            rows: [
              { cells: ["1–30","35 P / level","$0.70 / level"] },
              { cells: ["31–50","45 P / level","$0.90 / level"] },
            ],
          },
          {
            heading: "Tablet of Tona",
            note: null,
            columns: ["Level Range","Price per Level","Price (USD)"],
            rows: [
              { cells: ["1–30","35 P / level","$0.70 / level"] },
              { cells: ["31–50","45 P / level","$0.90 / level"] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    slides: [
      {
        title: "🛠 PATCH MAINTENANCE (42 Days)",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Task Type","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Only Commissions","350 P","$7.00"] },
              { cells: ["Only Resins Burn","375 P","$7.50"] },
              { cells: ["Commissions + Resins Burn","450 P","$9.00"] },
              { cells: ["Full Tasks (w/o Events)","500 P","$10.00"] },
              { cells: ["Full Tasks + Events","+850 P","+$17.00"] },
            ],
          },
        ],
      },
      {
        title: "🗓 1 DAY MAINTENANCE",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Task Type","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Only Commissions","10 P","$0.20"] },
              { cells: ["Full Day Tasks","20 P","$0.40"] },
            ],
          },
        ],
      },
      {
        title: "📅 WEEKLY MAINTENANCE (7 Days)",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Task Type","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Only Commissions","55 P","$1.10"] },
              { cells: ["Only Resins Burn","80 P","$1.60"] },
              { cells: ["Full Weekly Tasks (BP Base)","150 P","$3.00"] },
              { cells: ["Weekly Tasks + Events","150 P + event","$3.00 + event"] },
            ],
          },
        ],
      },
      {
        title: "📆 MONTHLY MAINTENANCE (30 Days)",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Task Type","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Only Commissions","200 P","$4.00"] },
              { cells: ["Only Resins Burn","250 P","$5.00"] },
              { cells: ["Commissions + Resins Burn","275 P","$5.50"] },
              { cells: ["Full Tasks (w/o Events)","350 P","$7.00"] },
              { cells: ["Full Tasks + Events","750 P","$15.00"] },
            ],
          },
        ],
      },
      {
        title: "🔥 RESIN BURN – BY DURATION",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Resin Burn Type","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Per Run","5 P","$0.10"] },
              { cells: ["Per Weekly Boss","10 P","$0.20"] },
              { cells: ["1 Day (4 runs)","20 P","$0.40"] },
              { cells: ["1 Week","80 P","$1.60"] },
              { cells: ["1 Month","250 P","$5.00"] },
              { cells: ["1 Patch (42 days)","350 P","$7.00"] },
            ],
          },
        ],
      },
      {
        title: "🚀 ADVENTURE RANK BOOSTING",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Level Range","AR Phase","Rate (P / Level)","Price (USD / Level)"],
            rows: [
              { cells: ["Level 01–25","AR 01","20 P","$0.40"] },
              { cells: ["Level 25–30","AR 02","30 P","$0.60"] },
              { cells: ["Level 30–35","AR 03","50 P","$1.00"] },
              { cells: ["Level 35–40","AR 04","80 P","$1.60"] },
              { cells: ["Level 40–45","AR 05","100 P","$2.00"] },
              { cells: ["Level 45–50","AR 06","120 P","$2.40"] },
              { cells: ["Level 50–55","AR 07","150 P","$3.00"] },
              { cells: ["Level 55+","AR 08/09","N/A","Contact for price"] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "map",
    label: "Map Unlocking & Refinement",
    slides: [
      {
        title: "🗺️ MAP UNLOCKING",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Type","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Waypoint","2 P / waypoint","$0.04"] },
              { cells: ["Domain (Puzzle Unlock)","5 P / domain","$0.10"] },
              { cells: ["Statue of The Seven","10 P / statue","$0.20"] },
            ],
          },
        ],
      },
      {
        title: "🎣 FISHED-WEAPON REFINEMENT",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Type","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Full R5 Weapon","180 P","$3.60"] },
              { cells: ["R1 Weapon Only","80 P","$1.60"] },
              { cells: ["Per Refinement Level (R2–R5)","25 P each","$0.50 / level"] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "oculi",
    label: "Oculi",
    slides: [
      {
        title: "🌬️ OCULI COLLECTION (By Piece / Whole Statue)",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Oculi Type","By Piece (P)","By Piece (USD)","Whole Statue (P)","Whole Statue (USD)"],
            rows: [
              { cells: ["Anemoculus","2 P","$0.04","100 P","$2.00"] },
              { cells: ["Geoculus","3 P","$0.06","250 P","$5.00"] },
              { cells: ["Electroculus","3 P","$0.06","400 P","$8.00"] },
              { cells: ["Dendroculus","4 P","$0.08","650 P","$13.00"] },
              { cells: ["Hydroculus","4 P","$0.08","650 P","$13.00"] },
              { cells: ["Pyroculus","3 P","$0.06","600 P","$12.00"] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "quest",
    label: "Quest",
    slides: [
      {
        title: "🏛️ ARCHON QUESTS",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Region","Acts Available","Per Act (USD)"],
            rows: [
              { cells: ["Mondstadt","Act I - IV","$0.70 (35 P)"] },
              { cells: ["Liyue","Act I - V","$0.80 (40 P)"] },
              { cells: ["Inazuma","Act I - V","$1.00 (50 P)"] },
              { cells: ["Sumeru","Act I - VI","$1.20 (60 P)"] },
              { cells: ["Fontaine","Act I - VI","$1.20 (60 P)"] },
              { cells: ["Natlan","Act I - V","$1.20 (60 P)"] },
            ],
          },
        ],
      },
      {
        title: "📚 OTHER QUESTS",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Quest Type","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Interlude Act I","50 P","$1.00"] },
              { cells: ["Interlude Act II & III","60 P","$1.20"] },
              { cells: ["Interlude Act IV","40 P","$0.80"] },
              { cells: ["Ascension Quest","50 P","$1.00"] },
              { cells: ["Story Quest","50 P","$1.00"] },
              { cells: ["Full Hangout Ending","50 P","$1.00"] },
              { cells: ["Per Hangout Ending","10 P","$0.20"] },
            ],
          },
        ],
      },
      {
        title: "🧭 SPECIAL WORLD QUESTS - INAZUMA",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Quest Name","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Sakura Cleansing Ritual","200 P","$4.00"] },
              { cells: ["Tatara Tales (7 Days)","100 P","$2.00"] },
              { cells: ["Orobashi's Legacy","200 P","$4.00"] },
              { cells: ["Moon-Bathed Deep","175 P","$3.50"] },
              { cells: ["Seirai Stormchasers","175 P","$3.50"] },
              { cells: ["Through the Mist","200 P","$4.00"] },
            ],
          },
        ],
      },
      {
        title: "🧭 SPECIAL WORLD QUESTS - ENKANOMIYA & CHASM",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Quest Name","Price (P)","Price (USD)"],
            rows: [
              { cells: ["From Dusk Till Dawn in Byakuyakoku","250 P","$5.00"] },
              { cells: ["Chasm Delvers","250 P","$5.00"] },
            ],
          },
          {
            heading: "CHENYU VALE",
            note: null,
            columns: ["Quest Name","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Blessing of Sunken Jade","200 P","$4.00"] },
            ],
          },
        ],
      },
      {
        title: "🧭 SPECIAL WORLD QUESTS - SUMERU",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Quest Name","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Aranyaka (4 Parts)","500 P","$10.00"] },
              { cells: ["Golden Slumber","250 P","$5.00"] },
              { cells: ["Duel Evidence","175 P","$3.50"] },
              { cells: ["Old Notes, New Friends","225 P","$4.50"] },
              { cells: ["The Dirge of Bilqis","225 P","$4.50"] },
              { cells: ["The Falcon Series","150 P","$3.00"] },
              { cells: ["Khvarena of Good and Evil","300 P","$6.00"] },
              { cells: ["Pale Fire","90 P","$1.80"] },
            ],
          },
        ],
      },
      {
        title: "🧭 SPECIAL WORLD QUESTS - FONTAINE",
        tables: [
          {
            heading: null,
            note: null,
            columns: ["Quest Name","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Aqueous Tidemarks","75 P","$1.50"] },
              { cells: ["Ann of Narssizenreuz","200 P","$4.00"] },
              { cells: ["Ancient Colors","150 P","$3.00"] },
              { cells: ["Unfinished Comedy","225 P","$4.50"] },
              { cells: ["Research Institute Chronicles","200 P","$4.00"] },
              { cells: ["Road to Singularity","50 P","$1.00"] },
              { cells: ["The Wild Fairy of Erinnyes","150 P","$3.00"] },
              { cells: ["In the Wake of Narcissus","250 P","$5.00"] },
              { cells: ["The Questioning Melusine & The Answering Machine","250 P","$5.00"] },
            ],
          },
        ],
      },
      {
        title: "🧭 SPECIAL WORLD QUESTS - OTHER REGIONS",
        tables: [
          {
            heading: "SEA OF BYGONE ERAS",
            note: null,
            columns: ["Quest Name","Price (P)","Price (USD)"],
            rows: [
              { cells: ["Canticles of Harmony","250 P","$5.00"] },
            ],
          },
          {
            heading: "NATLAN",
            note: null,
            columns: ["Quest Name","Price (P)","Price (USD)"],
            rows: [
              { cells: ["The Footsteps of the Chosen Dragon","200 P","$4.00"] },
              { cells: ["Shadows of the Mountains","150 P","$3.00"] },
              { cells: ["Tales of Dreams Plucked from Fire","100 P","$2.00"] },
              { cells: ["Between Pledge and Forgettance","150 P","$3.00"] },
              { cells: ["Ripe for Trouble","50 P","$1.00"] },
              { cells: ["The Mystery of Tecoloapan Beach","50 P","$1.00"] },
              { cells: ["Open Your Heart to Me","75 P","$1.50"] },
              { cells: ["Lost Traveler in the Ashen Realm","250 P","$5.00"] },
              { cells: ["Chronicler of the Crumbling City","300 P","$5.00"] },
            ],
          },
        ],
      },
    ],
  },
];

export default serviceCategories;