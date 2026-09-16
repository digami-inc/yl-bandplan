export type GlossaryCategory =
  | "allocation"
  | "power"
  | "mode"
  | "propagation"
  | "emission";

export interface GlossaryEntry {
  id: string;
  term: string;
  category: GlossaryCategory;
  short: string;
  description: string;
  aliases?: string[];
  sourceId?: string;
  sourceReference?: string;
}

export const glossary = [
  {
    id: "sek",
    term: "sek",
    category: "allocation",
    short: "Sekundārs radioamatieru dienests",
    description:
      "Radioamatieru dienests ir sekundārs. Radiostacija nedrīkst radīt kaitīgus traucējumus primārajiem dienestiem un citiem sekundārajiem dienestiem.",
    sourceId: "mk257",
    sourceReference: "1. pielikuma piezīme 1.1; 2. pielikuma piezīme 1.1",
  },
  {
    id: "PRIM",
    term: "PRIM",
    category: "allocation",
    short: "Primārs radioamatieru dienests",
    description:
      "Radioamatieru dienests ir primārs. Radiostacija nedrīkst radīt kaitīgus traucējumus citiem primārajiem dienestiem.",
    sourceId: "mk257",
    sourceReference:
      "1. pielikuma piezīme 1.2; 2. pielikuma piezīme 1.2; 3. pielikuma piezīme 1.1",
  },
  {
    id: "PRIMeks",
    term: "PRIMeks",
    category: "allocation",
    short: "Ekskluzīvi primārs radioamatieru dienests",
    description:
      "Radioamatieru dienests ir ekskluzīvi primārs — joslā atļauti tikai radioamatieru dienesta radiostaciju raidījumi.",
    sourceId: "mk257",
    sourceReference:
      "1. pielikuma piezīme 1.3; 2. pielikuma piezīme 1.3; 3. pielikuma piezīme 1.2",
  },
  {
    id: "pX",
    term: "pX",
    category: "power",
    short: "Radioraidītāja galotnes jauda",
    description:
      "Vidējā jauda, ko raidītājs pievada antenas fīderam viena radiofrekvences perioda laikā modulācijas apliecējas maksimumā normālos darba apstākļos.",
    sourceId: "mk257",
    sourceReference: "1. pielikuma piezīme 2.2; 2. pielikuma piezīme 2",
  },
  {
    id: "pZ",
    term: "pZ",
    category: "power",
    short: "Radioraidītāja nesēja jauda",
    description:
      "Vidējā jauda, ko raidītājs pievada antenas fīderam viena radiofrekvences perioda laikā apstākļos bez modulācijas.",
    sourceId: "mk257",
    sourceReference: "1. pielikuma piezīme 2.3; 3. pielikuma piezīme 2",
  },
  {
    id: "eirp",
    term: "e.i.r.p.",
    category: "power",
    short: "Ekvivalentā izotropiski izstarotā jauda",
    description:
      "Antenai pievadītās jaudas reizinājums ar antenas pastiprinājumu dotajā virzienā attiecībā pret izotropisku antenu.",
    aliases: ["EIRP", "e.i.r.p"],
    sourceId: "mk257",
    sourceReference: "1. pielikuma piezīme 2.1",
  },
  {
    id: "CW",
    term: "CW",
    category: "mode",
    short: "Continuous Wave",
    description:
      "Nepārtraukta nesēja darba veids, ko radioamatieru sakaros galvenokārt izmanto telegrāfijai un Morzes kodam.",
  },
  {
    id: "SSB",
    term: "SSB",
    category: "mode",
    short: "Single Sideband",
    description:
      "Vienas sānjoslas modulācija; radioamatieru sakaros plaši izmantots balss sakaru darba veids.",
    sourceId: "mk257",
    sourceReference: "4. pielikuma piezīme 1",
  },
  {
    id: "MGM",
    term: "MGM",
    category: "mode",
    short: "Machine Generated Modes",
    description:
      "Mašīngenerēti darba veidi, kuros radiosakaru signāla ģenerēšanā un apstrādē izmanto datoru vai citu digitālu sistēmu.",
  },
  {
    id: "EME",
    term: "EME",
    category: "propagation",
    short: "Earth–Moon–Earth",
    description:
      "Radiosakari, kuros signāls tiek raidīts uz Mēnesi un uztverts pēc tā atstarošanās no Mēness virsmas.",
    aliases: ["Moonbounce"],
  },
  {
    id: "MS",
    term: "MS",
    category: "propagation",
    short: "Meteor Scatter",
    description:
      "Radiosakari, kuros izmanto radioviļņu izkliedi vai atstarošanos meteoru radītajās jonizētajās pēdās.",
  },
  {
    id: "F3E",
    term: "F3E",
    category: "emission",
    short: "Frekvences modulācijas telefonija",
    description:
      "Izstarojuma klase: frekvences modulācija, viens analogās informācijas kanāls, telefonija.",
    sourceId: "mk257",
    sourceReference: "3. pielikuma 1. un 2. punkts",
  },
  {
    id: "G3E",
    term: "G3E",
    category: "emission",
    short: "Fāzes modulācijas telefonija",
    description:
      "Izstarojuma klase: fāzes modulācija, viens analogās informācijas kanāls, telefonija.",
    sourceId: "mk257",
    sourceReference: "3. pielikuma 1. un 2. punkts",
  },
  {
    id: "FXW",
    term: "FXW",
    category: "emission",
    short: "Frekvences modulācijas kombinēts izstarojums",
    description:
      "Izstarojuma klases apzīmējums: F — frekvences modulācija, X — klasifikācijā citādi neaptverts signāla veids, W — vairāku informācijas veidu kombinācija.",
    sourceId: "mk257",
    sourceReference: "3. pielikuma 1. un 2. punkts",
  },
] as const satisfies readonly GlossaryEntry[];

export type GlossaryId = (typeof glossary)[number]["id"];

export const glossaryById = Object.fromEntries(
  glossary.map((entry) => [entry.id, entry]),
) as Record<GlossaryId, (typeof glossary)[number]>;

export function getGlossaryEntries(
  ids: readonly GlossaryId[],
): GlossaryEntry[] {
  return ids.map((id) => glossaryById[id]);
}
