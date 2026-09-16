import type { Band } from "../../bandplan";
import { getBandVisualModel } from "../visualization";
import {
  formatHzInUnit,
  getIaruDisplayRows,
  type IaruDisplayRow,
} from "./presentation";

const UNIT_HZ: Record<string, number> = {
  hz: 1,
  khz: 1_000,
  mhz: 1_000_000,
  ghz: 1_000_000_000,
};

interface HzRange {
  fromHz: number;
  toHz: number;
}

function unitScale(unit: string): number {
  const scale = UNIT_HZ[unit.trim().toLowerCase()];
  if (!scale) throw new Error(`Unknown frequency unit: ${unit}`);
  return scale;
}

function mergeRanges(ranges: HzRange[]): HzRange[] {
  const sorted = ranges
    .filter((range) => range.fromHz < range.toHz)
    .sort((a, b) => a.fromHz - b.fromHz || a.toHz - b.toHz);

  const merged: HzRange[] = [];
  for (const range of sorted) {
    const previous = merged.at(-1);
    if (!previous || range.fromHz > previous.toHz) {
      merged.push({ ...range });
      continue;
    }
    previous.toHz = Math.max(previous.toHz, range.toHz);
  }
  return merged;
}

function visualRangesForPrivilege(band: Band, priv: string): HzRange[] {
  const model = getBandVisualModel(band, priv);
  const row = model.rows[0];
  if (!row) return [];

  const scale = unitScale(band.units);
  const restrictedSlices = row.slices.filter(
    (slice) => slice.kind === "legal-restriction",
  );

  const sourceRanges = restrictedSlices.length > 0
    ? restrictedSlices.map((slice) => ({ from: slice.from, to: slice.to }))
    : row.legalRanges;

  return mergeRanges(
    sourceRanges.map((range) => ({
      fromHz: Math.round(range.from * scale),
      toHz: Math.round(range.to * scale),
    })),
  );
}

export function getIaruDisplayRowsForPrivilege(
  band: Band,
  priv: string,
): IaruDisplayRow[] {
  const rows = getIaruDisplayRows(band);
  if (priv === "all") return rows;

  const allowedRanges = visualRangesForPrivilege(band, priv);
  if (allowedRanges.length === 0) return [];

  const filtered: IaruDisplayRow[] = [];

  for (const row of rows) {
    const intersections = mergeRanges(
      allowedRanges
        .map((range) => ({
          fromHz: Math.max(row.fromHz, range.fromHz),
          toHz: Math.min(row.toHz, range.toHz),
        }))
        .filter((range) => range.fromHz < range.toHz),
    );

    intersections.forEach((range, index) => {
      filtered.push({
        ...row,
        id: `${row.id}-${priv}-${index}-${range.fromHz}-${range.toHz}`,
        fromHz: range.fromHz,
        toHz: range.toHz,
        from: formatHzInUnit(range.fromHz, band.iaruUnits),
        to: formatHzInUnit(range.toHz, band.iaruUnits),
      });
    });
  }

  return filtered;
}
