import type { Band } from "../bandplan";
import type { LicenceClass } from "./types";
import { getIaruDisplayRows } from "./iaru/presentation";
import { legalRules } from "./lv/legal-rules";

const UNIT_HZ: Record<string, number> = {
  hz: 1,
  khz: 1_000,
  mhz: 1_000_000,
  ghz: 1_000_000_000,
};

const LICENCE_CLASSES: LicenceClass[] = ["A", "B", "C"];

export interface BandVisualRange {
  from: number;
  to: number;
}

export interface BandVisualSlice extends BandVisualRange {
  id: string;
  mode: string;
  text?: string;
  lane: "main" | "bottom";
  kind: "iaru" | "legal-restriction";
}

export interface BandVisualRow {
  name: string;
  classes: LicenceClass[];
  legalRanges: BandVisualRange[];
  slices: BandVisualSlice[];
}

export interface BandVisualModel {
  fromHz: number;
  toHz: number;
  from: number;
  to: number;
  units: string;
  rows: BandVisualRow[];
}

interface HzRange {
  fromHz: number;
  toHz: number;
}

interface HzSlice extends HzRange {
  id: string;
  mode: string;
  text?: string;
  lane: "main" | "bottom";
  kind: "iaru" | "legal-restriction";
}

function unitScale(unit: string): number {
  const scale = UNIT_HZ[unit.trim().toLowerCase()];
  if (!scale) throw new Error(`Unknown frequency unit: ${unit}`);
  return scale;
}

function toUnit(hz: number, unit: string): number {
  return hz / unitScale(unit);
}

function overlaps(a: HzRange, b: HzRange): boolean {
  return a.fromHz < b.toHz && a.toHz > b.fromHz;
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

function subtractRanges(range: HzRange, covers: HzRange[]): HzRange[] {
  let pending: HzRange[] = [{ ...range }];

  for (const cover of covers) {
    const next: HzRange[] = [];

    for (const part of pending) {
      if (!overlaps(part, cover)) {
        next.push(part);
        continue;
      }

      if (cover.fromHz > part.fromHz) {
        next.push({ fromHz: part.fromHz, toHz: Math.min(cover.fromHz, part.toHz) });
      }
      if (cover.toHz < part.toHz) {
        next.push({ fromHz: Math.max(cover.toHz, part.fromHz), toHz: part.toHz });
      }
    }

    pending = next.filter((part) => part.fromHz < part.toHz);
  }

  return pending;
}

function visualLabel(description: string, note?: string): string {
  const text = `${description} ${note ?? ""}`.toLowerCase();

  if (text.includes("satellite")) return "sat";
  if (text.includes("beacon")) return "beacon";
  if (text.includes("guard")) return "guard";
  if (text.includes("repeater")) return "rep";
  if (text.includes("fm")) return "fm";
  if (text.includes("mgm") || text.includes("digital") || text.includes("digimode")) {
    return "digi";
  }
  if (text.includes("cw") || text.includes("telegraph")) return "cw";
  return "all";
}

function restrictionLabel(rule: (typeof legalRules)[number]): string {
  if (rule.allowedModes?.length) return rule.allowedModes.join("/");
  if (rule.emissionClasses?.length) return rule.emissionClasses.join("/");
  return "ierobežots";
}

function mergeSlices(slices: HzSlice[]): HzSlice[] {
  const sorted = [...slices].sort((a, b) => {
    if (a.lane !== b.lane) return a.lane === "main" ? -1 : 1;
    if (a.kind !== b.kind) return a.kind === "iaru" ? -1 : 1;
    return a.fromHz - b.fromHz || a.toHz - b.toHz;
  });

  const merged: HzSlice[] = [];

  for (const slice of sorted) {
    const previous = merged.at(-1);
    if (
      previous &&
      previous.toHz === slice.fromHz &&
      previous.mode === slice.mode &&
      previous.text === slice.text &&
      previous.lane === slice.lane &&
      previous.kind === slice.kind
    ) {
      previous.toHz = slice.toHz;
      previous.id = `${previous.id}+${slice.id}`;
      continue;
    }

    merged.push({ ...slice });
  }

  return merged;
}

function sameRow(a: BandVisualRow, b: BandVisualRow): boolean {
  const normalize = (row: BandVisualRow) =>
    JSON.stringify({ legalRanges: row.legalRanges, slices: row.slices.map(({ id: _id, ...slice }) => slice) });
  return normalize(a) === normalize(b);
}

export function getBandVisualModel(band: Band, priv: string): BandVisualModel {
  const iaruRows = getIaruDisplayRows(band).sort(
    (a, b) => a.fromHz - b.fromHz || a.toHz - b.toHz,
  );

  if (iaruRows.length === 0) {
    const scale = unitScale(band.units);
    const from = Number(band.from);
    const to = Number(band.to);
    return {
      fromHz: from * scale,
      toHz: to * scale,
      from,
      to,
      units: band.units,
      rows: [],
    };
  }

  const fromHz = Math.min(...iaruRows.map((row) => row.fromHz));
  const toHz = Math.max(...iaruRows.map((row) => row.toHz));
  const bandRange: HzRange = { fromHz, toHz };

  const requestedClasses =
    priv === "all"
      ? LICENCE_CLASSES
      : LICENCE_CLASSES.filter((licenceClass) => licenceClass === priv.toUpperCase());

  const classRows: BandVisualRow[] = [];

  for (const licenceClass of requestedClasses) {
    const classRules = legalRules.filter(
      (rule) => rule.licenceClass === licenceClass && overlaps(rule, bandRange),
    );

    if (classRules.length === 0) continue;

    const legalRangesHz = mergeRanges(
      classRules.map((rule) => ({
        fromHz: Math.max(rule.fromHz, fromHz),
        toHz: Math.min(rule.toHz, toHz),
      })),
    );

    const iaruSlices: HzSlice[] = [];

    for (let index = 0; index < iaruRows.length; index += 1) {
      const row = iaruRows[index];
      const hasEarlierOverlap = iaruRows
        .slice(0, index)
        .some((previous) => overlaps(previous, row));

      for (const legalRange of legalRangesHz) {
        const sliceFromHz = Math.max(row.fromHz, legalRange.fromHz);
        const sliceToHz = Math.min(row.toHz, legalRange.toHz);
        if (sliceFromHz >= sliceToHz) continue;

        iaruSlices.push({
          id: `${licenceClass}-${row.id}-${sliceFromHz}-${sliceToHz}`,
          fromHz: sliceFromHz,
          toHz: sliceToHz,
          mode: row.colorClass,
          text: visualLabel(row.description, row.note),
          lane: hasEarlierOverlap ? "bottom" : "main",
          kind: "iaru",
        });
      }
    }

    const unrestrictedCoverage = mergeRanges(
      classRules
        .filter((rule) => !rule.allowedModes?.length && !rule.emissionClasses?.length)
        .map((rule) => ({
          fromHz: Math.max(rule.fromHz, fromHz),
          toHz: Math.min(rule.toHz, toHz),
        })),
    );

    const restrictionSlices: HzSlice[] = [];

    for (const rule of classRules.filter(
      (candidate) => candidate.allowedModes?.length || candidate.emissionClasses?.length,
    )) {
      const restrictedRange: HzRange = {
        fromHz: Math.max(rule.fromHz, fromHz),
        toHz: Math.min(rule.toHz, toHz),
      };

      for (const remaining of subtractRanges(restrictedRange, unrestrictedCoverage)) {
        restrictionSlices.push({
          id: `${licenceClass}-${rule.id}-restriction-${remaining.fromHz}-${remaining.toHz}`,
          fromHz: remaining.fromHz,
          toHz: remaining.toHz,
          mode: "purple",
          text: restrictionLabel(rule),
          lane: "bottom",
          kind: "legal-restriction",
        });
      }
    }

    const slices = mergeSlices([...iaruSlices, ...restrictionSlices]).map((slice) => ({
      id: slice.id,
      from: toUnit(slice.fromHz, band.units),
      to: toUnit(slice.toHz, band.units),
      mode: slice.mode,
      text: slice.text,
      lane: slice.lane,
      kind: slice.kind,
    }));

    classRows.push({
      name: licenceClass,
      classes: [licenceClass],
      legalRanges: legalRangesHz.map((range) => ({
        from: toUnit(range.fromHz, band.units),
        to: toUnit(range.toHz, band.units),
      })),
      slices,
    });
  }

  const groupedRows: BandVisualRow[] = [];

  for (const row of classRows) {
    const existing = groupedRows.find((candidate) => sameRow(candidate, row));
    if (existing) {
      existing.classes.push(...row.classes);
      existing.name = existing.classes.join(", ");
    } else {
      groupedRows.push({
        ...row,
        classes: [...row.classes],
      });
    }
  }

  return {
    fromHz,
    toHz,
    from: toUnit(fromHz, band.units),
    to: toUnit(toHz, band.units),
    units: band.units,
    rows: groupedRows,
  };
}
