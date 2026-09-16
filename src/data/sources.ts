import type { DataSource } from "./types";

export const sources: Record<string, DataSource> = {
  mk257: {
    id: "mk257",
    title:
      "MK noteikumi Nr. 257 — Radioamatieru eksaminācijas apliecību un radioamatieru radiostacijas atļauju saņemšanas kārtība, kā arī radioamatieru radiostaciju lietošanas kārtība",
    url: "https://likumi.lv/ta/id/342127",
    revision: "2023-05-23",
    verifiedOn: "2026-09-16",
    notes: [
      "Primārais juridiskais avots A, B un C kategoriju raidīšanai atļautajām joslām, jaudām un papildu nosacījumiem.",
      "1. pielikums — A kategorija.",
      "2. pielikums — B kategorija.",
      "3. pielikums — C kategorija.",
    ],
  },

  nrfp: {
    id: "nrfp",
    title: "Nacionālais radiofrekvenču plāns",
    url: "https://likumi.lv/ta/id/338729",
    revision: "2025-12-05",
    verifiedOn: "2026-09-16",
    notes: [
      "Primārais juridiskais avots radiofrekvenču spektra sadalījumam Latvijā.",
      "Izmantojams, lai pārbaudītu radioamatieru dienesta primāro, ekskluzīvi primāro un sekundāro statusu un spektra robežas.",
    ],
  },

  iaruR1Hf: {
    id: "iaru-r1-hf",
    title: "IARU Region 1 HF Band Plan",
    url: "https://www.iaru-r1.org/about-us/committees-and-working-groups/hf-committee-c4/documents-hf/",
    revision: "Effective 2020-10-16",
    verifiedOn: "2026-09-16",
    notes: [
      "IARU Region 1 rekomendētais HF joslu lietojums.",
      "Pašreizējās HF bandplāna izmaiņas stājās spēkā 2020-10-16.",
      "Legacy HF tabula tiek normalizēta un papildināta ar Novi Sad 2020 apstiprinātajām izmaiņām.",
      "Nav Latvijas juridisko raidīšanas tiesību avots.",
    ],
  },

  iaruR1VhfUp: {
    id: "iaru-r1-vhf-up",
    title: "IARU Region 1 VHF/UHF/SHF/Microwave Band Plans",
    url: "https://www.iaru-r1.org/about-us/committees-and-working-groups/vhf-uhf-shf-committee-c5/vhf-up-bandplanning/",
    revision: "VHF+ Handbook 10.03, February 2026",
    verifiedOn: "2026-09-16",
    notes: [
      "IARU Region 1 pašlaik spēkā esošie bandplāni no 50 MHz līdz 250 GHz.",
      "VHF+ Handbook 10.03 pret 10.02 mainīja contest sadaļu; bandplāna tabulas netika pārskatītas šajā laidienā.",
      "Visas projektā izmantotās VHF+ joslas ir salīdzinātas ar pašlaik publicēto Handbook 10.03 / IARU bandplanning informāciju.",
      "430–440 MHz izmanto Zlatibor 2023 ZL23_C5_Rec_06 tabulu, nevis legacy projekta veco sadalījumu.",
      "1200–1300 MHz izmanto pašlaik publicēto 10.03 tabulu; pēc WRC-23/RNSS darba šis plāns nākotnē var tikt pārskatīts.",
      "Nav Latvijas juridisko raidīšanas tiesību avots.",
    ],
  },

  wsjtx: {
    id: "wsjtx",
    title: "WSJT-X v3.0.2 default working frequencies",
    url: "https://github.com/WSJTX/wsjtx/blob/v3.0.2/models/FrequencyList.cpp",
    revision: "v3.0.2",
    verifiedOn: "2026-09-16",
    notes: [
      "FT4 un FT8 grāmatzīmēm izmantotas WSJT-X preferred/default dial frekvences.",
      "DXpedition un intercontinental alternatīvās frekvences netiek izmantotas kā pamatgrāmatzīmes.",
      "Šis ir aktivitāšu frekvenču avots, nevis Latvijas juridisko raidīšanas tiesību avots.",
    ],
  },

  originalBandplan: {
    id: "original-bandplan",
    title: "Original bandplan.yl2.lv / bandplan.hex.id.lv project",
    url: "https://gitea.kecom.lv/enkrs/bandplan.yl2.lv",
    verifiedOn: "2026-09-16",
    notes: [
      "Izmantojams kā sākotnējā projekta un vizualizācijas atsauce.",
      "Netiek uzskatīts par autoritatīvu juridisko vai IARU datu avotu.",
    ],
  },

  lralBandplan: {
    id: "lral-bandplan",
    title: "Latvijas Radioamatieru līgas joslu plāns",
    url: "https://lral.lv/joslu-plans/",
    verifiedOn: "2026-09-16",
    notes: [
      "Sekundārs salīdzināšanas avots.",
      "Dati vienmēr jāpārbauda pret MK Nr.257, Nacionālo radiofrekvenču plānu un IARU Region 1 avotiem.",
    ],
  },
};
