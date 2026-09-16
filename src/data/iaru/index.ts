import { bands } from "../../bandplan";
import type { ActivityMarker, IaruSegment } from "../types";

const UNIT_DECIMALS: Record<string, number> = {
  khz: 3,
  mhz: 6,
  ghz: 9,
};

const HF_BAND_IDS = new Set([
  "2200m",
  "630m",
  "160m",
  "80m",
  "60m",
  "40m",
  "30m",
  "20m",
  "17m",
  "15m",
  "12m",
  "10m",
]);

function decimalFrequencyToHz(value: string, unit: string): number {
  const decimals = UNIT_DECIMALS[unit.trim().toLowerCase()];

  if (decimals === undefined) {
    throw new Error(`Unknown frequency unit: ${unit}`);
  }

  const normalized = value.trim().replace(",", ".");
  const match = normalized.match(/^(\d+)(?:\.(\d+))?$/);

  if (!match) {
    throw new Error(`Invalid frequency value: ${value} ${unit}`);
  }

  const whole = match[1];
  const fraction = match[2] ?? "";

  if (fraction.length > decimals) {
    throw new Error(
      `Frequency has too many decimal places: ${value} ${unit}`,
    );
  }

  const hz =
    Number(whole) * 10 ** decimals +
    Number(fraction.padEnd(decimals, "0") || "0");

  if (!Number.isSafeInteger(hz)) {
    throw new Error(`Frequency is not a safe integer Hz value: ${value} ${unit}`);
  }

  return hz;
}

function isNoviSad2020WidebandSegment(segment: IaruSegment): boolean {
  return (
    segment.bandId === "10m" &&
    segment.fromHz >= 29_000_000 &&
    segment.toHz <= 29_510_000
  );
}

function normalizeLegacyIaruSegments(): IaruSegment[] {
  return bands.flatMap((band) =>
    band.iaru.map((legacy, index) => {
      const segment: IaruSegment = {
        id: `iaru-${band.route}-${String(index + 1).padStart(3, "0")}`,
        bandId: band.route,
        fromHz: decimalFrequencyToHz(legacy.from, band.iaruUnits),
        toHz: decimalFrequencyToHz(legacy.to, band.iaruUnits),
        modes: [legacy.desc],
        sourceId: HF_BAND_IDS.has(band.route)
          ? "iaru-r1-hf"
          : "original-bandplan",
        sourceReference: HF_BAND_IDS.has(band.route)
          ? `${band.name} — IARU Region 1 HF band plan; Novi Sad 2020 changes applied`
          : `${band.name} — legacy IARU data pending verification against current IARU Region 1 VHF+ bandplan`,
      };

      if (legacy.bw !== undefined && legacy.bw > 0) {
        segment.maxBandwidthHz = legacy.bw;
      }

      if (legacy.note?.trim()) {
        segment.notes = [legacy.note.trim()];
      }

      // Novi Sad 2020 C4 Recommendation 04 removed the old 6 kHz maximum
      // bandwidth restriction from 29000 to 29510 kHz.
      if (isNoviSad2020WidebandSegment(segment)) {
        delete segment.maxBandwidthHz;
        segment.sourceReference = "Novi Sad 2020 C4 Recommendation 04";
        segment.notes = [
          ...(segment.notes ?? []),
          "The former 6 kHz maximum-bandwidth restriction was removed. Experimental wide-bandwidth operation must be non-interfering to other stations, including the amateur-satellite service segment at 29300–29510 kHz.",
        ];
      }

      return segment;
    }),
  );
}

export const legacyNormalizedIaruSegments = normalizeLegacyIaruSegments();

const noviSad2020Satellite15m: IaruSegment = {
  id: "iaru-15m-satellite-2020",
  bandId: "15m",
  fromHz: 21_125_000,
  toHz: 21_450_000,
  modes: ["Amateur satellite"],
  usage: ["Non-exclusive amateur satellite use"],
  notes: [
    "Frequencies above 21400 kHz are clearly preferred for amateur-satellite use.",
  ],
  sourceId: "iaru-r1-hf",
  sourceReference: "Novi Sad 2020 C4 Recommendation 08",
};

/**
 * Canonical IARU data used by the new data layer.
 *
 * HF is based on the existing Region 1 table with the approved Novi Sad 2020
 * changes applied. VHF and above are normalized losslessly from the legacy
 * project but deliberately keep sourceId=original-bandplan until each band is
 * checked against the currently valid IARU Region 1 VHF+ bandplan.
 */
export const iaruSegments: IaruSegment[] = [
  ...legacyNormalizedIaruSegments,
  noviSad2020Satellite15m,
];

export const iaruActivityMarkers: ActivityMarker[] = bands.flatMap((band) =>
  (band.bookmarks ?? []).map((bookmark, index) => ({
    id: `activity-${band.route}-${String(index + 1).padStart(3, "0")}`,
    bandId: band.route,
    frequencyHz: decimalFrequencyToHz(bookmark.pos, band.iaruUnits),
    name: bookmark.name,
    category: "legacy-bookmark",
    sourceId: "original-bandplan",
    sourceReference: `${band.name} bookmark from original bandplan project`,
  })),
);

export const iaruMigrationStats = {
  legacySegments: legacyNormalizedIaruSegments.length,
  canonicalSegments: iaruSegments.length,
  verifiedHfSegments: iaruSegments.filter(
    (segment) => segment.sourceId === "iaru-r1-hf",
  ).length,
  pendingVhfUpSegments: iaruSegments.filter(
    (segment) => segment.sourceId === "original-bandplan",
  ).length,
  activityMarkers: iaruActivityMarkers.length,
} as const;
