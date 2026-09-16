import type { Band } from "../bandplan";
import { getIaruDisplayRowsForPrivilege } from "./iaru/licence-filter";
import { getBandVisualModel } from "./visualization";

export const MODE_FILTERS = ["all", "cw", "ssb", "digi", "fm", "sat", "rep", "beacon"] as const;
export type ModeFilter = (typeof MODE_FILTERS)[number];

export const MODE_FILTER_LABELS: Record<ModeFilter, string> = {
  all: "All",
  cw: "CW",
  ssb: "SSB",
  digi: "DIGI",
  fm: "FM",
  sat: "SAT",
  rep: "REP",
  beacon: "BEACON",
};

export interface ModeVisualRange {
  from: number;
  to: number;
}

const UNIT_HZ: Record<string, number> = {
  hz: 1,
  khz: 1_000,
  mhz: 1_000_000,
  ghz: 1_000_000_000,
};

export function isModeFilter(value: string | null | undefined): value is ModeFilter {
  return Boolean(value && MODE_FILTERS.includes(value.toLowerCase() as ModeFilter));
}

export function rowMatchesMode(text: string, mode: ModeFilter): boolean {
  if (mode === "all") return true;

  const value = text.toLowerCase();

  switch (mode) {
    case "cw":
      return /\bcw\b|telegraph/.test(value);
    case "ssb":
      return /\bssb\b/.test(value);
    case "digi":
      return /\bmgm\b|digital|digimode|\bdata\b/.test(value);
    case "fm":
      return /\bfm\b|digital voice/.test(value);
    case "sat":
      return /satellite|space communication/.test(value);
    case "rep":
      return /repeater/.test(value);
    case "beacon":
      return /beacon/.test(value);
  }
}

export function bandAvailableForPrivilege(band: Band, priv: string): boolean {
  if (priv === "all") return true;
  return getBandVisualModel(band, priv).rows.length > 0;
}

export function getModeRowsForBand(band: Band, priv: string, mode: ModeFilter) {
  const rows = getIaruDisplayRowsForPrivilege(band, priv);
  if (mode === "all") return rows;
  return rows.filter((row) =>
    rowMatchesMode(`${row.description} ${row.note ?? ""}`, mode),
  );
}

export function getModeVisualRanges(
  band: Band,
  priv: string,
  mode: ModeFilter,
): ModeVisualRange[] {
  if (mode === "all") return [];

  const unit = UNIT_HZ[band.units.toLowerCase()];
  if (!unit) throw new Error(`Unknown frequency unit: ${band.units}`);

  return getModeRowsForBand(band, priv, mode).map((row) => ({
    from: row.fromHz / unit,
    to: row.toHz / unit,
  }));
}

export function bandMatchesMode(band: Band, priv: string, mode: ModeFilter): boolean {
  if (!bandAvailableForPrivilege(band, priv)) return false;
  if (mode === "all") return true;
  return getModeRowsForBand(band, priv, mode).length > 0;
}
