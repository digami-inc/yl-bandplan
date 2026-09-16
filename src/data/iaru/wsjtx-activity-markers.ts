import type { ActivityMarker } from "../types";

const SOURCE_ID = "wsjtx";
const SOURCE_REFERENCE = "WSJT-X v3.0.2 models/FrequencyList.cpp preferred/default working frequency";

function marker(
  bandId: string,
  mode: "FT4" | "FT8",
  frequencyHz: number,
): ActivityMarker {
  return {
    id: `activity-${bandId}-${mode.toLowerCase()}-wsjtx`,
    bandId,
    frequencyHz,
    name: mode,
    category: mode.toLowerCase(),
    sourceId: SOURCE_ID,
    sourceReference: SOURCE_REFERENCE,
  };
}

/**
 * WSJT-X v3.0.2 preferred/default dial frequencies.
 *
 * Only frequencies explicitly present as FT4/FT8 working frequencies in
 * WSJT-X are included. DXpedition alternatives and intercontinental-only
 * alternatives are intentionally excluded.
 */
export const wsjtxActivityMarkers: ActivityMarker[] = [
  marker("160m", "FT8", 1_840_000),

  marker("80m", "FT8", 3_573_000),
  marker("80m", "FT4", 3_575_000),

  marker("60m", "FT8", 5_357_000),
  marker("60m", "FT4", 5_357_000),

  marker("40m", "FT4", 7_047_500),
  marker("40m", "FT8", 7_074_000),

  marker("30m", "FT8", 10_136_000),
  marker("30m", "FT4", 10_140_000),

  marker("20m", "FT8", 14_074_000),
  marker("20m", "FT4", 14_080_000),

  marker("17m", "FT8", 18_100_000),
  marker("17m", "FT4", 18_104_000),

  marker("15m", "FT8", 21_074_000),
  marker("15m", "FT4", 21_140_000),

  marker("12m", "FT8", 24_915_000),
  marker("12m", "FT4", 24_919_000),

  marker("10m", "FT8", 28_074_000),
  marker("10m", "FT4", 28_180_000),

  marker("6m", "FT8", 50_313_000),
  marker("6m", "FT4", 50_318_000),

  marker("4m", "FT8", 70_154_000),

  marker("2m", "FT4", 144_170_000),
  marker("2m", "FT8", 144_174_000),

  marker("70cm", "FT8", 432_174_000),
  marker("23cm", "FT8", 1_296_174_000),
];
