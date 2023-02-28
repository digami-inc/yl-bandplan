interface Privilege {
  name: string;
  route: string;
  description: string;
}

export const privileges: Privilege[] = [
  { name: "A", route: "a", description: "A klasses stacijas" },
  { name: "B", route: "b", description: "B klasses stacijas" },
  { name: "C", route: "c", description: "C klasses stacijas" },
];

export interface BandPrivilege {
  name: string;
  classes: string[];
  slices: {
    from: string;
    to: string;
    text?: string;
    mode: string;
    show?: string;
    startText?: number;
    endText?: number;
  }[];
}

export interface Band {
  route: string;
  name: string;
  from: string;
  to: string;
  units: string;
  rules: {
    class: string;
    band: string;
    cat: string;
    pwr: string;
    notes?: string;
  }[];
  privileges: BandPrivilege[];
  iaruUnits: string;
  iaruNotes?: string[];
  iaru: {
    from: string;
    to: string;
    bw?: number;
    mode: string;
    desc: string;
    note?: string;
  }[];
  bookmarks?: {
    pos: string;
    name: string;
  }[];
}

export const bands: Band[] = [
  {
    route: "2200m",
    name: "2 200 m",
    from: "135.7",
    to: "137.8",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "135.7", to: "137.8", text: "cw", mode: "yellow" },
          { from: "135.7", to: "137.8", text: "digi", mode: "orange", show: "bottom", },
        ],
      },
    ],
    rules: [
      { class: "A", band: "135.7-137.8 kHz", cat: "sek", pwr: "pZ ≤ 1 W e.i.r.p.", notes: "Atļauti izstarojumi ar joslas platumu līdz 200 Hz", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "135.7", to: "137.8", bw: 200, mode: "yellow", desc: "CW, QRSS and narrow band digital modes", },
    ],
  },
  {
    route: "630m",
    name: "630 m",
    from: "472",
    to: "479",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "472", to: "479", text: "cw", mode: "yellow" },
          { from: "475", to: "479", text: "digi", mode: "orange", show: "bottom", startText: 1, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "472-479 kHz", cat: "sek", pwr: "pX ≤ 1 W e.i.r.p.", notes: "Stājas spēkā pēc atbilstošiem grozījumiem Nacionālajā radiofrekvenču plānā. Atļauti izstarojumi ar joslas platumu līdz 800 Hz", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "472", to: "475", bw: 200, mode: "yellow", desc: "CW" },
      { from: "475", to: "479", bw: 0, mode: "yellow", desc: "CW, digimodes", note: "maximum bandwidth not specified, 500 Hz suggested", },
    ],
    iaruNotes: [
      'Details shown in band plan above should be understood as "proposed usage"  (VA14_C4_Rec_02)',
      "If a frequency is to be selected, particular attention must be paid to still existing Non Directional Beacons (NDB) of the radionavigaton service!",
    ],
  },
  {
    route: "160m",
    name: "160 m",
    from: "1810",
    to: "2000",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "1810", to: "1840", text: "cw", mode: "yellow" },
          { from: "1840", to: "2000", text: "all, lsb", mode: "blue", startText: 2, },
          { from: "1838", to: "1843", text: "digi", show: "bottom", startText: -1, endText: 1, mode: "orange", },
        ],
      },
    ],
    rules: [
      { class: "A", band: "1810-1850 kHz", cat: "PRIM", pwr: "pX ≤ 1000 W", },
      { class: "A", band: "1850-2000 kHz", cat: "sek", pwr: "pX ≤ 10 W", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "1810", to: "1838", bw: 200, mode: "yellow", desc: "CW" },
      { from: "1838", to: "1840", bw: 500, mode: "orange", desc: "CW, Digimodes" },
      { from: "1840", to: "1843", bw: 2700, mode: "blue", desc: "All modes, digimodes", note: "* Lowest dial setting for LSB Voice mode: 1843", },
      { from: "1843", to: "2000", bw: 2700, mode: "blue", desc: "All modes" },
    ],
    bookmarks: [{ pos: "1836", name: "CW QRP aktivitāšu centrs" }],
  },
  {
    route: "80m",
    name: "80 m",
    from: "3500",
    to: "3800",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "3500", to: "3570", text: "cw", mode: "yellow", endText: -1 },
          { from: "3570", to: "3600", text: "digi", mode: "orange" },
          { from: "3600", to: "3800", text: "all, lsb", mode: "blue", startText: 2, },
          { from: "3600", to: "3620", text: "digi", show: "bottom", mode: "blue", endText: 1, },
        ],
      },
      {
        name: "B",
        classes: ["b"],
        slices: [
          { from: "3510", to: "3570", text: "cw", mode: "yellow", startText: 1, endText: -2, },
          { from: "3570", to: "3600", text: "digi", mode: "orange" },
          { from: "3600", to: "3750", text: "all, lsb", mode: "blue", startText: 2, endText: 1, },
          { from: "3600", to: "3620", text: "digi", show: "bottom", mode: "blue", endText: 1, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "3500-3800 kHz", cat: "PRIM", pwr: "pX ≤ 1000 W" },
      { class: "B", band: "3510-3750 kHz", cat: "PRIM", pwr: "pX ≤ 100 W" },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "3500", to: "3510", bw: 200, mode: "yellow", desc: "CW, priority for intercontinental operation", },
      { from: "3510", to: "3560", bw: 200, mode: "yellow", desc: "CW, contest preferred", },
      { from: "3560", to: "3570", bw: 200, mode: "yellow", desc: "CW" },
      { from: "3570", to: "3580", bw: 200, mode: "yellow", desc: "Narrow band modes - digimodes", },
      { from: "3580", to: "3590", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes", },
      { from: "3590", to: "3600", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "3600", to: "3620", bw: 2700, mode: "blue", desc: "All modes - digimodes, automatically controlled data station (unattended)", note: "* Lowest dial setting for LSB Voice mode: 3603", },
      { from: "3600", to: "3650", bw: 2700, mode: "blue", desc: "All modes, SSB contest preferred", note: "* Lowest dial setting for LSB Voice mode: 3603", },
      { from: "3650", to: "3700", bw: 2700, mode: "blue", desc: "All modes" },
      { from: "3700", to: "3775", bw: 2700, mode: "blue", desc: "All modes, SSB contest preferred", },
      { from: "3775", to: "3800", bw: 2700, mode: "blue", desc: "All modes, SSB contest preferred, priority for intercontinental operation", },
    ],
    bookmarks: [
      { pos: "3555", name: "CW QRS aktivitāšu centrs" },
      { pos: "3560", name: "CW QRP aktivitāšu centrs" },
      { pos: "3573", name: "FT8" },
      { pos: "3630", name: "Digitālās balss aktivitāšu centrs" },
      { pos: "3677", name: "YL Apaļais galds (sestdienu rītos 9:00 pēc Latvijas laika)", },
      { pos: "3690", name: "SSB QRP aktivitāšu centrs" },
      { pos: "3735", name: "Attēlu aktivitāšu centrs" },
      { pos: "3760", name: "Region 1 emergency aktivitāšu centrs" },
    ],
  },
  {
    route: "60m",
    name: "60 m",
    from: "5351.5",
    to: "5366.5",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "5351.5", to: "5354", text: "cw", mode: "yellow", startText: 2 },
          { from: "5354", to: "5366", text: "all, usb", mode: "blue", startText: 1, },
          { from: "5366", to: "5366.5", text: "digi", mode: "yellow", startText: -1, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "5351.5-5366.5 kHz", cat: "sek", pwr: "pX ≤ 15 W e.i.r.p.", notes: "Stājas spēkā pēc atbilstošiem grozījumiem Nacionālajā radiofrekvenču plānā. Atļauti izstarojumi ar joslas platumu līdz 800 Hz", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "5351.5", to: "5354", bw: 200, mode: "yellow", desc: "CW, Narrow band modes", },
      { from: "5354", to: "5366", bw: 2700, mode: "blue", desc: "All modes, USB recommended for voice operation", },
      { from: "5366", to: "5366.5", bw: 20, mode: "yellow", desc: "Weak signal narrow band modes", },
    ],
  },
  {
    route: "40m",
    name: "40 m",
    from: "7000",
    to: "7200",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "7000", to: "7040", text: "cw", mode: "yellow", endText: -1 },
          { from: "7040", to: "7060", text: "digi", mode: "orange" },
          { from: "7060", to: "7200", text: "all, lsb", mode: "blue", startText: 1, endText: -1, },
        ],
      },
      {
        name: "B",
        classes: ["b"],
        slices: [
          { from: "7010", to: "7040", bw: 200, text: "cw", mode: "yellow", startText: 1, endText: 1, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "7000-7200 kHz", cat: "PRIM", pwr: "pX ≤ 1000 W" },
      { class: "B", band: "7010-7040 kHz", cat: "PRIM", pwr: "pX ≤ 100 W", notes: "Atļauta izstarojuma klase A1A – Morzes kods uztveršanai ar dzirdi", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "7000", to: "7040", bw: 200, mode: "yellow", desc: "CW" },
      { from: "7040", to: "7047", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes", },
      { from: "7047", to: "7050", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "7050", to: "7053", bw: 2700, mode: "blue", desc: "All modes - digimodes, automatically controlled data stations (unattended)", note: "* Lowest dial setting for LSB Voice mode: 7053", },
      { from: "7053", to: "7060", bw: 2700, mode: "blue", desc: "All modes - digimodes", },
      { from: "7060", to: "7100", bw: 2700, mode: "blue", desc: "All modes, SSB contest preferred", },
      { from: "7100", to: "7130", bw: 2700, mode: "blue", desc: "All modes" },
      { from: "7130", to: "7175", bw: 2700, mode: "blue", desc: "All modes, SSB contest preferred", },
      { from: "7175", to: "7200", bw: 2700, mode: "blue", desc: "All modes, SSB contest preferred, priority for intercontinental activity", },
    ],
    bookmarks: [
      { pos: "7030", name: "CW QRP aktivitāšu centrs" },
      { pos: "7047.5", name: "FT8" },
      { pos: "7070", name: "Digitālās balss aktivitāšu centrs" },
      { pos: "7090", name: "SSB QRP aktivitāšu centrs" },
      { pos: "7110", name: "Region 1 Emergency aktivitāšu centrs" },
      { pos: "7165", name: "Attēlu aktivitāšu centrs" },
    ],
  },
  {
    route: "30m",
    name: "30 m",
    from: "10100",
    to: "10150",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "10100", to: "10130", text: "cw", mode: "yellow", endText: -1 },
          { from: "10130", to: "10150", text: "digi", mode: "orange" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "10100-10150 kHz", cat: "sek", pwr: "pX ≤ 1000 W", notes: "Atļauti izstarojumi ar joslas platumu līdz 500 Hz", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "10100", to: "10130", bw: 200, mode: "yellow", desc: "CW" },
      { from: "10130", to: "10150", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes", },
    ],
    bookmarks: [
      { pos: "10116", name: "CW QRP aktivitāšu centrs" },
      { pos: "10140", name: "FT8" },
    ],
  },
  {
    route: "20m",
    name: "20 m",
    from: "14000",
    to: "14350",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "14000", to: "14070", text: "cw", mode: "yellow", endText: -1 },
          { from: "14070", to: "14112", text: "digi", mode: "orange" },
          { from: "14099", to: "14101", mode: "red" },
          { from: "14112", to: "14350", text: "all, usb", mode: "blue", startText: 1, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "14000-14250 kHz", cat: "PRIMeks", pwr: "pX ≤ 1000 W", },
      { class: "A", band: "14250-14350 kHz", cat: "PRIM", pwr: "pX ≤ 1000 W", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "14000", to: "14060", bw: 200, mode: "yellow", desc: "CW, contest preferred", },
      { from: "14060", to: "14070", bw: 200, mode: "yellow", desc: "CW" },
      { from: "14070", to: "14089", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes", },
      { from: "14089", to: "14099", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "14099", to: "14101", bw: 0, mode: "red", desc: "International beacon project - beacons exclusively", },
      { from: "14101", to: "14112", bw: 2700, mode: "blue", desc: "All modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "14112", to: "14125", bw: 2700, mode: "blue", desc: "All modes" },
      { from: "14125", to: "14190", bw: 2700, mode: "blue", desc: "All modes, SSB contest preferred", },
      { from: "14190", to: "14200", bw: 2700, mode: "blue", desc: "All modes, priority for DX-peditions", },
      { from: "14200", to: "14300", bw: 2700, mode: "blue", desc: "All modes, SSB contest preferred", },
      { from: "14300", to: "14350", bw: 2700, mode: "blue", desc: "All modes", note: "* Highest dial setting for USB voice mode: 14347", },
    ],
    bookmarks: [
      { pos: "14055", name: "CW QRS aktivitāšu centrs" },
      { pos: "14060", name: "CW QRP aktivitāšu centrs" },
      { pos: "14080", name: "FT8" },
      { pos: "14130", name: "Digitālās balss aktivitāšu centrs" },
      { pos: "14230", name: "Attēlu aktivitāšu centrs" },
      { pos: "14285", name: "SSB QRP aktivitāšu centrs" },
      { pos: "14300", name: "Global emergency aktivitāšu centrs" },
    ],
  },
  {
    route: "17m",
    name: "17 m",
    from: "18068",
    to: "18168",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "18068", to: "18095", text: "cw", mode: "yellow", endText: -1 },
          { from: "18095", to: "18120", text: "digi", mode: "orange" },
          { from: "18109", to: "18111", mode: "red" },
          { from: "18120", to: "18168", text: "all, usb", mode: "blue", startText: 1, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "18068-18168 kHz", cat: "PRIM", pwr: "pX ≤ 1000 W", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "18068", to: "18095", bw: 200, mode: "yellow", desc: "CW" },
      { from: "18095", to: "18105", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes", },
      { from: "18105", to: "18109", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "18109", to: "18111", bw: 0, mode: "red", desc: "International beacon project - beacons exclusively", },
      { from: "18111", to: "18120", bw: 2700, mode: "blue", desc: "All modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "18120", to: "18168", bw: 2700, mode: "blue", desc: "All modes", note: "* Highest dial setting for USB voice mode: 18165", },
    ],
    bookmarks: [
      { pos: "18086", name: "CW QRP aktivitāšu centrs" },
      { pos: "18104", name: "FT8" },
      { pos: "18130", name: "SSB QRP aktivitāšu centrs" },
      { pos: "18150", name: "Digitālās balss aktivitāšu centrs" },
      { pos: "18160", name: "Emergency aktivitāšu centrs" },
    ],
  },
  {
    route: "15m",
    name: "15 m",
    from: "21000",
    to: "21450",
    units: "kHz",
    privileges: [
      {
        name: "A, B",
        classes: ["a", "b"],
        slices: [
          { from: "21000", to: "21070", text: "cw", mode: "yellow", endText: -1 },
          { from: "21070", to: "21151", text: "digi", mode: "orange" },
          { from: "21149", to: "21151", mode: "red" },
          { from: "21151", to: "21450", text: "all, usb", mode: "blue", startText: 1, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "21000-21450 kHz", cat: "PRIMeks", pwr: "pX ≤ 1000 W", },
      { class: "B", band: "21000-21450 kHz", cat: "PRIMeks", pwr: "pX ≤ 100 W", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "21000", to: "21070", bw: 200, mode: "yellow", desc: "CW" },
      { from: "21070", to: "21090", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes", },
      { from: "21090", to: "21110", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "21110", to: "21120", bw: 2700, mode: "blue", desc: "All modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "21120", to: "21149", bw: 500, mode: "orange", desc: "Narrow band modes", },
      { from: "21149", to: "21151", bw: 0, mode: "red", desc: "International beacon project - beacons exclusively", },
      { from: "21151", to: "21450", bw: 2700, mode: "blue", desc: "All modes", note: "* Highest dial setting for USB voice mode: 21447", },
    ],
    bookmarks: [
      { pos: "21055", name: "CW QRS aktivitāšu centrs" },
      { pos: "21060", name: "CW QRP aktivitāšu centrs" },
      { pos: "21140", name: "FT8" },
      { pos: "21180", name: "Digitālās balss aktivitāšu centrs" },
      { pos: "21285", name: "SSB QRP aktivitāšu centrs" },
      { pos: "21340", name: "Attēlu aktivitāšu centrs" },
      { pos: "21360", name: "Global emergency aktivitāšu centrs" },
    ],
  },
  {
    route: "12m",
    name: "12 m",
    from: "24890",
    to: "24990",
    units: "kHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "24890", to: "24915", text: "cw", mode: "yellow", endText: -1 },
          { from: "24915", to: "24940", text: "digi", mode: "orange" },
          { from: "24929", to: "24931", mode: "red" },
          { from: "24940", to: "24990", text: "all, usb", mode: "blue", startText: -1, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "24890-24990 kHz", cat: "PRIMeks", pwr: "pX ≤ 1000 W", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "24890", to: "24915", bw: 200, mode: "yellow", desc: "CW" },
      { from: "24915", to: "24925", bw: 500, mode: "orange", desc: "Narrow band modes", },
      { from: "24925", to: "24929", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "24929", to: "24931", bw: 0, mode: "red", desc: "International beacon project - beacons exclusively", },
      { from: "24931", to: "24940", bw: 2700, mode: "blue", desc: "All modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "24940", to: "24990", bw: 2700, mode: "blue", desc: "All modes", note: "* Highest dial setting for USB voice mode: 24987", },
    ],
    bookmarks: [
      { pos: "24906", name: "CW QRP aktivitāšu centrs" },
      { pos: "24919", name: "FT8" },
      { pos: "24950", name: "SSB QRP aktivitāšu centrs" },
      { pos: "24960", name: "Digitālās balss aktivitāšu centrs" },
    ],
  },
  {
    route: "10m",
    name: "10 m",
    from: "28",
    to: "29.7",
    units: "MHz",
    privileges: [
      {
        name: "A, B",
        classes: ["a", "b"],
        slices: [
          { from: "28.0", to: "28.07", text: "cw", mode: "yellow", endText: 2 },
          { from: "28.07", to: "28.32", text: "digi", mode: "orange" },
          { from: "28.19", to: "28.225", mode: "red" },
          { from: "28.32", to: "29.1", text: "all, usb", mode: "blue", startText: 1, },
          { from: "29.0", to: "29.1", mode: "green" },
          { from: "29.1", to: "29.7", text: "all, fm", mode: "green", startText: -1, },
          { from: "29.3", to: "29.52", mode: "red", startText: 1, endText: 1 },
        ],
      },
    ],
    rules: [
      { class: "A", band: "28000-29700 kHz", cat: "PRIMeks", pwr: "pX ≤ 1000 W", },
      { class: "B", band: "28000-29700 kHz", cat: "PRIMeks", pwr: "pX ≤ 100 W", },
    ],
    iaruUnits: "kHz",
    iaru: [
      { from: "28000", to: "28070", bw: 200, mode: "yellow", desc: "CW" },
      { from: "28070", to: "28120", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes", },
      { from: "28120", to: "28150", bw: 500, mode: "orange", desc: "Narrow band modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "28150", to: "28190", bw: 500, mode: "orange", desc: "Narrow band modes", },
      { from: "28190", to: "28199", bw: 0, mode: "red", desc: "International beacon project - regional time shared beacons, exclusively", },
      { from: "28199", to: "28201", bw: 0, mode: "red", desc: "International beacon project - worldwide time shared beacons, exclusively", },
      { from: "28201", to: "28225", bw: 0, mode: "red", desc: "International beacon project - continuous duty beacons, exclusively", },
      { from: "28225", to: "28300", bw: 2700, mode: "blue", desc: "All modes - beacons", },
      { from: "28300", to: "28320", bw: 2700, mode: "blue", desc: "All modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "28320", to: "29000", bw: 2700, mode: "blue", desc: "All modes" },
      { from: "29000", to: "29100", bw: 6000, mode: "green", desc: "All modes" },
      { from: "29100", to: "29200", bw: 6000, mode: "green", desc: "All modes - FM simplex, 10 kHz channels", },
      { from: "29200", to: "29300", bw: 6000, mode: "green", desc: "All modes - digimodes, automatically controlled data stations (unattended)", },
      { from: "29300", to: "29510", bw: 6000, mode: "green", desc: "Satellite links", },
      { from: "29510", to: "29520", bw: 0, mode: "red", desc: "Guard channel" },
      { from: "29520", to: "29590", bw: 6000, mode: "green", desc: "All modes - FM repeater input (RH1-RH8)", },
      { from: "29590", to: "29610", bw: 6000, mode: "green", desc: "All modes - FM calling channel", },
      { from: "29610", to: "29620", bw: 6000, mode: "green", desc: "All modes - FM simplex-repeater (parrot, input+output)", },
      { from: "29620", to: "29700", bw: 6000, mode: "green", desc: "All modes - FM repeater output (RH1-RH8)", },
    ],
    bookmarks: [
      { pos: "28055", name: "CW QRS aktivitāšu centrs" },
      { pos: "28060", name: "CW QRP aktivitāšu centrs" },
      { pos: "28180", name: "FT8" },
      { pos: "28330", name: "Digitālās balss aktivitāšu centrs" },
      { pos: "28360", name: "SSB QRP aktivitāšu centrs" },
      { pos: "28680", name: "Attēlu aktivitāšu centrs" },
      { pos: "29600", name: "FM CQ kanāls" },
    ],
  },
  {
    route: "6m",
    name: "6 m",
    from: "50",
    to: "52",
    units: "MHz",
    privileges: [
      {
        name: "A, B",
        classes: ["a", "b"],
        slices: [
          { from: "50", to: "50.03", mode: "red" },
          { from: "50.03", to: "50.3", text: "cw", mode: "yellow", startText: 2 },
          { from: "50.1", to: "50.3", show: "bottom", text: "usb", mode: "blue", startText: 1, },
          { from: "50.3", to: "50.5", text: "digi", mode: "orange", startText: 2 },
          { from: "50.5", to: "52", text: "all", mode: "green", startText: 1 },
        ],
      },
    ],
    rules: [
      { class: "A", band: "50-52 MHz", cat: "sek", pwr: "pX ≤ 800 W" },
      { class: "B", band: "50-52 MHz", cat: "sek", pwr: "pX ≤ 100 W" },
    ],
    iaruUnits: "KHz",
    iaru: [
      { from: "50000", to: "50030", bw: 0, mode: "red", desc: "Coordinated Beacon Project", note: "000 - 010 Region 1, 010-020 Region 2, 020-030 Region 3", },
      { from: "50030", to: "50100", bw: 500, mode: "yellow", desc: "Telegraphy" },
      { from: "50100", to: "50130", bw: 2700, mode: "blue", desc: "SSB & Telegraphy, Intercontinental", },
      { from: "50130", to: "50200", bw: 2700, mode: "blue", desc: "SSB & Telegraphy, International", },
      { from: "50200", to: "50300", bw: 2700, mode: "blue", desc: "SSB & Telegraphy", },
      { from: "50300", to: "50400", bw: 2700, mode: "blue", desc: "Narrow band modes, MGM", },
      { from: "50400", to: "50500", bw: 1000, mode: "orange", desc: "MGM & Telegraphy", note: "Beacons exclusive (50.401 MHz +/- 500Hz WSPR Beacons", },
      { from: "50500", to: "52000", bw: 12000, mode: "green", desc: "All mode" },
    ],
  },
  {
    route: "4m",
    name: "4 m",
    from: "70",
    to: "70.5",
    units: "MHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "70.0", to: "70.25", text: "cw", mode: "yellow", endText: -1 },
          { from: "70.1", to: "70.25", show: "bottom", text: "usb", mode: "blue", startText: 1, },
          { from: "70.25", to: "70.294", text: "am, fm", mode: "green", startText: 2, },
          { from: "70.294", to: "70.5", text: "fm", mode: "green", startText: 1 },
        ],
      },
    ],
    rules: [
      { class: "A", band: "70-70.5 MHz", cat: "sek", pwr: "pX ≤ 100 W", notes: "Nav atļauts raidīt to Latvijas un kaimiņvalstu robežu virzienā frekvenču joslās, kas kaimiņvalstīs nav piešķirtas amatieru dienestam", },
    ],
    iaruUnits: "KHz",
    iaru: [
      { from: "70000", to: "70090", bw: 500, mode: "yellow", desc: "MGM & Telegraphy - Coordinated beacons", },
      { from: "70090", to: "70100", bw: 500, mode: "yellow", desc: "MGM & Telegraphy - Temporary and personal beacons", note: "70.091 Personal WSPR beacons", },
      { from: "70100", to: "70250", bw: 2700, mode: "blue", desc: "SSB, Telegraphy, MGM", },
      { from: "70250", to: "70294", bw: 12000, mode: "green", desc: "AM, FM" },
      { from: "70294", to: "70500", bw: 12000, mode: "green", desc: "FM Channels 12.5 KHz spacing", },
    ],
  },
  {
    route: "2m",
    name: "2 m",
    from: "144",
    to: "146",
    units: "MHz",
    privileges: [
      {
        name: "A, B",
        classes: ["a", "b"],
        slices: [
          { from: "144.0", to: "144.025", mode: "red", startText: 0, endText: 0 },
          { from: "144.025", to: "144.4", text: "cw", mode: "yellow", startText: 2, endText: 0, },
          { from: "144.15", to: "144.4", show: "bottom", text: "usb", mode: "blue", startText: 1, endText: 0, },
          { from: "144.4", to: "144.5", mode: "red", startText: 2, endText: 0 },
          { from: "144.5", to: "144.794", text: "all", mode: "purple", startText: 0, endText: 0, },
          { from: "144.794", to: "144.975", text: "digi", mode: "orange", startText: 0, endText: 0, },
          { from: "144.975", to: "145.806", text: "fm", mode: "green", startText: 0, endText: 0, },
          { from: "144.975", to: "145.206", show: "bottom", text: "in", mode: "green", startText: 0, endText: 2, },
          { from: "145.5625", to: "145.793", show: "bottom", text: "out", mode: "green", startText: 1, endText: 0, },
          { from: "145.806", to: "146.0", text: "sat", mode: "red", startText: 0, endText: 0, },
        ],
      },
      {
        name: "C",
        classes: ["c"],
        slices: [
          { from: "144.0", to: "144.025", mode: "red", startText: 0, endText: 0 },
          { from: "144.4", to: "144.5", mode: "red", startText: 0, endText: 0 },
          { from: "144.5", to: "144.794", text: "fm", mode: "green", startText: -1, endText: -2, },
          { from: "144.975", to: "145.806", text: "fm", mode: "green", startText: 0, endText: 0, },
          { from: "144.975", to: "145.206", show: "bottom", text: "in", mode: "green", startText: 0, endText: 2, },
          { from: "145.5625", to: "145.793", show: "bottom", text: "out", mode: "green", startText: 1, endText: 0, },
          { from: "145.806", to: "146.0", text: "fm", mode: "red", startText: 0, endText: 0, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "144-146 MHz", cat: "PRIMeks", pwr: "pX ≤ 100 W" },
      { class: "A", band: "144-144.400 MHz", cat: "PRIMeks", pwr: "pX ≤ 1000 W", notes: "EME, MS sakari, darbs starptautiskās sacensībās, darba veidi CW, SSB, MGM", },
      { class: "B", band: "144-146 MHz", cat: "PRIMeks", pwr: "pX ≤ 50 W" },
      { class: "C", band: "144-146 MHz", cat: "PRIMeks", pwr: "pZ ≤ 10 W", notes: "Izstarojuma klase F3E, G3E", },
    ],
    iaruUnits: "MHz",
    iaru: [
      { from: "144", to: "144.025", bw: 2700, mode: "red", desc: "All mode, Satelite downlink only", },
      { from: "144.025", to: "144.1", bw: 500, mode: "orange", desc: "Telegraphy" },
      { from: "144.1", to: "144.15", bw: 500, mode: "orange", desc: "MGM & Telegraphy", },
      { from: "144.15", to: "144.4", bw: 2700, mode: "blue", desc: "SSB, Telegraphy, MGM", },
      { from: "144.4", to: "144.49", bw: 500, mode: "red", desc: "Telegrapy & MGM, Beacons only", },
      { from: "144.491", to: "144.493", bw: 500, mode: "red", desc: "Experimental MGM", },
      { from: "144.5", to: "144.794", bw: 20000, mode: "purple", desc: "All Mode" },
      { from: "144.794", to: "144.9625", bw: 12000, mode: "green", desc: "MGM, Digital communication", },
      { from: "144.975", to: "145.194", bw: 12000, mode: "green", desc: "FM / DIgital Voice, Repeater input exclusive", },
      { from: "145.194", to: "145.206", bw: 12000, mode: "green", desc: "FM / Digital Voice, Space communication", },
      { from: "145.206", to: "145.5625", bw: 12000, mode: "green", desc: "FM / Digital Voice", },
      { from: "145.575", to: "145.7935", bw: 12000, mode: "green", desc: "FM / Digital Voice, Repeater output exclusive", },
      { from: "145.794", to: "145.806", bw: 12000, mode: "green", desc: "FM / DIgital Voice, Space communication", },
      { from: "145.806", to: "146", bw: 12000, mode: "green", desc: "All Mode, Satellite exclusive", },
    ],
    bookmarks: [{ pos: "145.5", name: "FM CQ kanāls" }],
  },
  {
    route: "70cm",
    name: "70 cm",
    from: "430",
    to: "440",
    units: "MHz",
    privileges: [
      {
        name: "A, B",
        classes: ["a", "b"],
        slices: [
          { from: "430.0", to: "431.975", text: "all", mode: "purple" },
          { from: "431.975", to: "432.4", text: "cw", mode: "yellow", startText: -1, endText: 0, },
          { from: "432.1", to: "432.4", text: "usb", mode: "blue", show: "bottom", startText: -2, endText: 1, },
          { from: "432.4", to: "432.5", mode: "red", startText: 0, endText: 0 },
          { from: "432.5", to: "435.0", text: "all", mode: "green" },
          { from: "433.0", to: "433.4", text: "rep", show: "bottom", mode: "green", startText: 0, },
          { from: "433.4", to: "433.6", text: "fm", show: "bottom", mode: "green", startText: 0, endText: 0, },
          { from: "435.0", to: "438.0", text: "sat", mode: "purple", startText: 0, endText: 0, },
          { from: "438.0", to: "440.0", text: "all", mode: "purple", startText: 0, endText: 0, },
        ],
      },
      {
        name: "C",
        classes: ["c"],
        slices: [
          { from: "430.0", to: "431.975", text: "fm", mode: "green", endText: 0 },
          { from: "432.4", to: "432.5", mode: "red", startText: 0, endText: 0 },
          { from: "432.5", to: "435.0", text: "fm", mode: "green", endText: 0 },
          { from: "433.0", to: "433.4", text: "rep", show: "bottom", mode: "green", startText: 0, },
          { from: "433.4", to: "433.6", text: "fm", show: "bottom", mode: "green", startText: 2, endText: 1, },
          { from: "438.0", to: "440.0", text: "fm", mode: "green", startText: 0, endText: 0, },
        ],
      },
    ],
    rules: [
      { class: "A", band: "430-440 MHz", cat: "PRIM", pwr: "pX ≤ 100 W" },
      { class: "A", band: "432-432.400 MHz", cat: "PRIM", pwr: "pX ≤ 1000 W", notes: "EME, MS sakari, darbs starptautiskās sacensībās, darba veidi CW, SSB, MGM", },
      { class: "B", band: "430-440 MHz", cat: "PRIM", pwr: "pX ≤ 20 W" },
      { class: "C", band: "430-440 MHz", cat: "PRIM", pwr: "pZ ≤ 10 W", notes: "Izstarojuma klase F3E, G3E", },
    ],
    iaruUnits: "MHz",
    iaru: [
      { from: "430", to: "431.975", bw: 20000, mode: "purple", desc: "All mode" },
      { from: "431.975", to: "432.1", bw: 500, mode: "orange", desc: "MGM & Telegraphy", },
      { from: "432.1", to: "432.4", bw: 2700, mode: "blue", desc: "MGM, Telegraphy & SSB", },
      { from: "432.4", to: "432.49", bw: 500, mode: "red", desc: "MGM & Telegraphy, beacons exclusive", },
      { from: "432.491", to: "432.493", bw: 500, mode: "red", desc: "Experimental MGM", },
      { from: "432.5", to: "432.975", bw: 12000, mode: "green", desc: "All mode" },
      { from: "433.0", to: "433.375", bw: 12000, mode: "green", desc: "FM / Digital voice repeaters", },
      { from: "433.4", to: "433.575", bw: 12000, mode: "green", desc: "FM / Digital voice", },
      { from: "433.6", to: "434.0", bw: 20000, mode: "purple", desc: "All mode" },
      { from: "434.0", to: "434.594", bw: 12000, mode: "green", desc: "All mode, ATV", },
      { from: "434.594", to: "434.981", bw: 12000, mode: "green", desc: "All mode", },
      { from: "435.0", to: "438.0", bw: 20000, mode: "purple", desc: "Satellite service & ATV", },
      { from: "438.0", to: "440.0", bw: 20000, mode: "purple", desc: "All mode" },
    ],
    bookmarks: [{ pos: "433.5", name: "FM CQ kanāls" }],
  },
  {
    route: "23cm",
    name: "23 cm",
    from: "1.240",
    to: "1.300",
    units: "GHz",
    privileges: [
      {
        name: "A, B",
        classes: ["a", "b"],
        slices: [{ from: "1.240", to: "1.300", mode: "green" }],
      },
    ],
    rules: [
      { class: "A", band: "1240-1300 MHz", cat: "sek", pwr: "pX ≤ 100 W" },
      { class: "A", band: "1296-1296.400 MHz", cat: "sek", pwr: "pX ≤ 300 W", notes: "EME, MS sakari, darbs starptautiskās sacensībās, darba veidi CW, SSB, MGM", },
      { class: "B", band: "1240-1300 MHz", cat: "sek", pwr: "pX ≤ 10 W" },
    ],
    iaruUnits: "MHz",
    iaru: [
      { from: "1240.0", to: "1240.5", bw: 2700, mode: "red", desc: "Reserved for the future", },
      { from: "1240.5", to: "1240.75", bw: 500, mode: "red", desc: "MGM & Telegraphy beacons (reserved for the future)", },
      { from: "1240.75", to: "1241.0", bw: 20000, mode: "green", desc: "FM/Digital Voice (reserved for the future)", },
      { from: "1241.0", to: "1243.25", bw: 20000, mode: "green", desc: "All modes", },
      { from: "1243.25", to: "1260.0", mode: "green", desc: "(D)ATV" },
      { from: "1260.0", to: "1270.0", mode: "green", desc: "Satellite service", },
      { from: "1270.0", to: "1272.0", bw: 20000, mode: "green", desc: "All modes" },
      { from: "1272.0", to: "1290.994", mode: "green", desc: "(D)ATV" },
      { from: "1290.994", to: "1291.481", bw: 20000, mode: "green", desc: "FM/Digital Voice", },
    ],
    bookmarks: [],
  },
  {
    route: "13cm",
    name: "13 cm",
    from: "2.300",
    to: "2.450",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "2.300", to: "2.450", mode: "green" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "2300–2450 MHz", cat: "sek", pwr: "pX ≤ 50 W", },
    ],
    iaruUnits: "MHz",
    iaru: [
      { from: "2300.000", to: "2320.000", bw: 20000, mode: "green", desc: "all modes", },
      { from: "2320.000", to: "2320.800", mode: "blue", desc: "all modes", },
      { from: "2320.800", to: "2321.000", mode: "red", desc: "MGM & Telegraphy", note: "Beacons exclusive", },
      { from: "2321.000", to: "2322.000", mode: "green", bw: 20000, desc: "FM / Digital Voice", note: "Voice simplex and repeaters", },
      { from: "2322.000", to: "2400.000", mode: "blue", desc: "all modes", },
      { from: "2400.000", to: "2450.000", mode: "blue", desc: "amateur sattelite service", },
    ],
  },
  {
    route: "9cm",
    name: "9 cm",
    from: "3.400",
    to: "3.410",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "3.400", to: "3.410", mode: "green" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "3400–3410 MHz", cat: "sek", pwr: "pX ≤ 50 W", notes: "Stājas spēkā pēc atbilstošiem grozījumiem Nacionālajā radiofrekvenču plānā", },
    ],
    iaruUnits: "MHz",
    iaru: [
      { from: "3400.000", to: "3400.800", bw: 500, mode: "orange", desc: "MGM & Telegraphy", },
      { from: "3400.800", to: "3400.995", bw: 500, mode: "red", desc: "MGM & Telegraphy", note: "Beacons only" },
      { from: "3401.000", to: "3402.000", bw: 2700, mode: "yellow", desc: "all modes", },
      { from: "3402.000", to: "3410.000", mode: "blue", desc: "all modes", note: "satellite downlinks", },
      { from: "3410.000", to: "3475.000", mode: "red", desc: "N/A", note: "YL stacijām šī IARU diapazona daļa nav atļauta", },
    ],
  },
  {
    route: "6cm",
    name: "6 cm",
    from: "5.650",
    to: "5.850",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "5.650", to: "5.850", mode: "green" },
        ],
      },
    ],
    rules: [
      {
        class: "A",
        band: "5650-5850 MHz",
        cat: "sek",
        pwr: "pX ≤ 50 W",
      },
    ],
    iaruUnits: "MHz",
    iaru: [
      { from: "5650.000", to: "5668.000", bw: 2700, mode: "yellow", desc: "all modes", },
      { from: "5668.000", to: "5670.000", bw: 2700, mode: "yellow", desc: "all modes", },
      { from: "5670.000", to: "5700.000", mode: "blue", desc: "MGM", },
      { from: "5700.000", to: "5760.000", mode: "blue", desc: "all modes", },
      { from: "5760.000", to: "5760.800", bw: 2700, mode: "yellow", desc: "all modes", },
      { from: "5760.800", to: "5760.990", mode: "red", desc: "MGM & Telegraphy", note: "Beacons only", },
      { from: "5761.000", to: "5762.000", bw: 2700, mode: "yellow", desc: "all modes", },
      { from: "5762.000", to: "5790.000", mode: "blue", desc: "all modes", },
      { from: "5790.000", to: "5850.000", mode: "red", desc: "all modes", note: "Amateur Satellite service (down link)", },
    ],
  },
  {
    route: "3cm",
    name: "3 cm",
    from: "10.000",
    to: "10.500",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "10.000", to: "10.500", mode: "green" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "10.000-10.500 GHz", cat: "sek", pwr: "pX ≤ 50 W", },
    ],
    iaruUnits: "MHz",
    iaru: [
      { from: "10000.000", to: "10150.000", bw: 0, mode: "blue", desc: "MGM", },
      { from: "10150.000", to: "10250.000", bw: 0, mode: "blue", desc: "all modes", },
      { from: "10250.000", to: "10350.000", bw: 0, mode: "blue", desc: "MGM", },
      { from: "10350.000", to: "10368.000", bw: 0, mode: "blue", desc: "all modes", },
      { from: "10368.000", to: "10368.800", bw: 2700, mode: "yellow", desc: "all modes", },
      { from: "10368.800", to: "10368.990", bw: 0, mode: "red", desc: "Beacons only", },
      { from: "10370.000", to: "10450.000", bw: 2700, mode: "yellow", desc: "all modes", },
      { from: "10450.000", to: "10500.000", bw: 0, mode: "blue", desc: "all modes", note: "AMATEUR SATELLITE SERVICE"},
    ],
  },
  {
    route: "12mm",
    name: "12 mm",
    from: "24.000",
    to: "24.050",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "24", to: "24.05", mode: "green" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "24-24.05 GHz", cat: "PRIM", pwr: "pX ≤ 50 W", },
      { class: "A", band: "24.05-24.25 GHz", cat: "sek", pwr: "pX ≤ 50 W", },
    ],
    iaruUnits: "MHz",
    iaru: [
      { from: "24000.000", to: "24048.000", bw: 0, mode: "blue", desc: "All modes", },
      { from: "24048.000", to: "24048.800", bw: 2700, mode: "yellow", desc: "All modes", note: "Amateur Satellite service, Narrow band modes" },
      { from: "24048.800", to: "24048.995", bw: 0, mode: "red", desc: "All modes", note: "Beacons only", },
      { from: "24049.000", to: "24050.000", bw: 2700, mode: "yellow", desc: "All modes", note: "Amateur Satellite service, Narrow band modes" },
      { from: "24050.000", to: "24250.000", bw: 0, mode: "blue", desc: "All modes", },
    ],
  },
  {
    route: "6mm",
    name: "6 mm",
    from: "47.000",
    to: "47.200",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "47", to: "47.2", mode: "green" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "47-47.2 GHz", cat: "PRIMeks", pwr: "pX ≤ 50 W", },
    ],
    iaruUnits: "GHz",
    iaru: [
      { from: "47.000", to: "47.088", bw: 0, mode: "blue", desc: "All modes", },
      { from: "47.088", to: "47.090", bw: 2700, mode: "yellow", desc: "All modes", },
      { from: "47.090", to: "47.200", bw: 0, mode: "blue", desc: "All modes", },
    ],
  },
  {
    route: "4mm",
    name: "4 mm",
    from: "76.000",
    to: "81.100",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "76", to: "81.1", mode: "green" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "76-77.5 GHz", cat: "sek", pwr: "pX ≤ 50 W", },
      { class: "A", band: "77.5-78 GHz", cat: "PRIM", pwr: "pX ≤ 50 W", },
      { class: "A", band: "78-81.5 GHz", cat: "sek", pwr: "pX ≤ 50 W", },
    ],
    iaruUnits: "GHz",
    iaru: [
      { from: "75.500", to: "76.000", bw: 2700, mode: "red", desc: "All modes", note: "YL stacijām šī IARU diapazona daļa nav atļauta / AMATEUR SATELLITE SERVICE (Preferred) " },
      { from: "76.000", to: "77.500", mode: "blue", desc: "All modes", },
      { from: "77.500", to: "77.501", bw: 2700, mode: "yellow", desc: "All modes", note: "AMATEUR SATELLITE SERVICE"},
      { from: "77.501", to: "78.000", mode: "blue", desc: "All modes", note: "preferred segment" },
      { from: "78.000", to: "81.500", mode: "blue", desc: "All modes", note: "Not preferred segment" },
    ],
  },
  {
    route: "122G",
    name: "122 GHz",
    from: "122.250",
    to: "123.000",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "122.250", to: "123.000", mode: "green" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "122.25-123 GHz", cat: "sek", pwr: "pX ≤ 50 W", },
    ],
    iaruUnits: "GHz",
    iaru: [
      { from: "122.250", to: "122.251", bw: 2700, mode: "yellow", desc: "All modes", note: "Narrow band modes"},
      { from: "122.251", to: "123.000", mode: "blue", desc: "All modes" },
    ],
  },
  {
    route: "134G",
    name: "134 GHz",
    from: "134",
    to: "141",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "134", to: "141", mode: "green" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "134-136 GHz", cat: "PRIM", pwr: "pX ≤ 50 W", },
      { class: "A", band: "136-141 GHz", cat: "sek", pwr: "pX ≤ 50 W", },
    ],
    iaruUnits: "GHz",
    iaru: [
      { from: "134.000", to: "134.928", mode: "blue", desc: "All modes", note: "AMATEUR SATELLITE SERVICE" },
      { from: "134.928", to: "134.930", bw: 2700, mode: "yellow", desc: "All modes", note: "Narrow band modes"},
      { from: "134.930", to: "136.000", mode: "blue", desc: "All modes" },
      { from: "136.000", to: "141.000", mode: "blue", desc: "All modes", note: "Not preferred segment" },
    ],
  },
  {
    route: "241G",
    name: "241 GHz",
    from: "241",
    to: "250",
    units: "GHz",
    privileges: [
      {
        name: "A",
        classes: ["a"],
        slices: [
          { from: "241", to: "250", mode: "green" },
        ],
      },
    ],
    rules: [
      { class: "A", band: "241-248 GHz", cat: "sek", pwr: "pX ≤ 50 W", },
      { class: "A", band: "248-250 GHz", cat: "PRIM", pwr: "pX ≤ 50 W", },
    ],
    iaruUnits: "GHz",
    iaru: [
      { from: "241.000", to: "248.000", mode: "blue", desc: "All modes", note: "Not preferred segment" },
      { from: "248.000", to: "248.100", mode: "blue", desc: "All modes", note: "AMATEUR SATELLITE SERVICE & NARROW BAND MODES" },
      { from: "248.100", to: "250.000", mode: "blue", desc: "All modes", note: "preferred segment" },
    ],
  },
];
