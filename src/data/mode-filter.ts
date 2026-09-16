import type { Band } from "../bandplan";
import { getBandVisualModel } from "./visualization";
import { getIaruDisplayRowsForPrivilege } from "./iaru/licence-filter";

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

export function isModeFilter(value: string | null | undefined): value is ModeFilter {
  return Boolean(value && MODE_FILTERS.includes(value.toLowerCase() as ModeFilter));
}

function containsAllMode(text: string): boolean {
  return /\ball[ -]?modes?\b/.test(text);
}

function rowMatchesMode(text: string, mode: ModeFilter): boolean {
  if (mode === "all") return true;

  const value = text.toLowerCase();
  const allMode = containsAllMode(value);

  switch (mode) {
    case "cw":
      return allMode || /\bcw\b|telegraph/.test(value);
    case "ssb":
      return allMode || /\bssb\b/.test(value);
    case "digi":
      return allMode || /\bmgm\b|digital|digimode|\bdata\b/.test(value);
    case "fm":
      return allMode || /\bfm\b|digital voice/.test(value);
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

export function bandMatchesMode(band: Band, priv: string, mode: ModeFilter): boolean {
  if (mode === "all") return bandAvailableForPrivilege(band, priv);
  if (!bandAvailableForPrivilege(band, priv)) return false;

  const rows = getIaruDisplayRowsForPrivilege(band, priv);
  return rows.some((row) =>
    rowMatchesMode(`${row.description} ${row.note ?? ""}`, mode),
  );
}
