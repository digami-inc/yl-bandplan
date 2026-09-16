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

type LegacyPrivilege = Band["privileges"][number];
type LegacySlice = LegacyPrivilege["slices"][number];

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
  startText?: number;
  endText?: number;
  startLabel?: string;
  endLabel?: string;
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

function toHz(value: string | number, unit: string): number {
  return Number(value) * unitScale(unit);
}

function overlaps(a: HzRange, b: HzRange): boolean {
  return a.fromHz < b.toHz && a.toHz > b.fromHz;
}

function sameFrequency(a: number, b: number): boolean {
  return Math.abs(a - b) <= Math.max(1, Math.abs(a), Math.abs(b)) * 1e-10;
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

function legacyPrivilegeForClass(
  band: Band,
  licenceClass: LicenceClass,
): LegacyPrivilege | undefined {
  const legacyClass = licenceClass.toLowerCase();
  return band.privileges.find((privilege) => privilege.classes.includes(legacyClass));
}

function legacyPresentationSlice(
  privilege: LegacyPrivilege | undefined,
  fromHz: number,
  toHzValue: number,
  band: Band,
  preferredMode?: string,
): LegacySlice | undefined {
  if (!privilege) return undefined;

  const midpointHz = fromHz + (toHzValue - fromHz) / 2;
  const candidates = privilege.slices.filter((slice) => {
    const sliceFromHz = toHz(slice.from, band.units);
    const sliceToHz = toHz(slice.to, band.units);
    return midpointHz >= sliceFromHz && midpointHz < sliceToHz && Boolean(slice.text);
  });

  return (
    candidates.find(
      (slice) => slice.mode === preferredMode && slice.show !== "bottom",
    ) ??
    candidates.find((slice) => slice.mode === preferredMode) ??
    candidates.find((slice) => slice.show !== "bottom") ??
    candidates[0]
  );
}

function legacyBoundary(
  privilege: LegacyPrivilege | undefined,
  value: number,
  edge: "start" | "end",
): { level: number; label: string } | undefined {
  if (!privilege) return undefined;

  for (const slice of privilege.slices) {
    if (edge === "start") {
      if (
        sameFrequency(Number(slice.from), value) &&
        typeof slice.startText !== "undefined"
      ) {
        return { level: slice.startText, label: slice.from };
      }
    } else if (
      sameFrequency(Number(slice.to), value) &&
      typeof slice.endText !== "undefined"
    ) {
      return { level: slice.endText, label: slice.to };
    }
  }

  return undefined;
}

function legacyRestrictedSlices(
  band: Band,
  privilege: LegacyPrivilege,
  legalRangesHz: HzRange[],
  licenceClass: LicenceClass,
): HzSlice[] {
  const result: HzSlice[] = [];

  privilege.slices.forEach((slice, index) => {
    const legacyRange: HzRange = {
      fromHz: toHz(slice.from, band.units),
      toHz: toHz(slice.to, band.units),
    };

    for (const legalRange of legalRangesHz) {
      const fromHz = Math.max(legacyRange.fromHz, legalRange.fromHz);
      const toHzValue = Math.min(legacyRange.toHz, legalRange.toHz);
      if (fromHz >= toHzValue) continue;

      result.push({
        id: `${licenceClass}-legacy-${index}-${fromHz}-${toHzValue}`,
        fromHz,
        toHz: toHzValue,
        mode: slice.mode,
        text: slice.text,
        lane: slice.show === "bottom" ? "bottom" : "main",
        kind: "legal-restriction",
      });
    }
  });

  return result;
}

function sameRow(a: BandVisualRow, b: BandVisualRow): boolean {
  const normalize = (row: BandVisualRow) =>
    JSON.stringify({
      legalRanges: row.legalRanges,
      slices: row.slices.map(({ id: _id, ...slice }) => slice),
    });
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
  const toHzValue = Math.max(...iaruRows.map((row) => row.toHz));
  const bandRange: HzRange = { fromHz, toHz: toHzValue };

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
        toHz: Math.min(rule.toHz, toHzValue),
      })),
    );

    const legacyPrivilege = legacyPrivilegeForClass(band, licenceClass);
    const hasModeRestriction = classRules.some(
      (rule) => rule.allowedModes?.length || rule.emissionClasses?.length,
    );

    let visualSlicesHz: HzSlice[];

    if (hasModeRestriction && legacyPrivilege) {
      visualSlicesHz = legacyRestrictedSlices(
        band,
        legacyPrivilege,
        legalRangesHz,
        licenceClass,
      );
    } else {
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

          const legacySlice = legacyPresentationSlice(
            legacyPrivilege,
            sliceFromHz,
            sliceToHz,
            band,
            row.colorClass,
          );

          iaruSlices.push({
            id: `${licenceClass}-${row.id}-${sliceFromHz}-${sliceToHz}`,
            fromHz: sliceFromHz,
            toHz: sliceToHz,
            mode: row.colorClass,
            text: legacySlice?.text ?? visualLabel(row.description, row.note),
            lane: hasEarlierOverlap ? "bottom" : "main",
            kind: "iaru",
          });
        }
      }

      visualSlicesHz = iaruSlices;
    }

    const slices = mergeSlices(visualSlicesHz).map((slice) => {
      const from = toUnit(slice.fromHz, band.units);
      const to = toUnit(slice.toHz, band.units);
      const start = legacyBoundary(legacyPrivilege, from, "start");
      const end = legacyBoundary(legacyPrivilege, to, "end");

      return {
        id: slice.id,
        from,
        to,
        mode: slice.mode,
        text: slice.text,
        lane: slice.lane,
        kind: slice.kind,
        startText: start?.level,
        endText: end?.level,
        startLabel: start?.label,
        endLabel: end?.label,
      };
    });

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
    toHz: toHzValue,
    from: toUnit(fromHz, band.units),
    to: toUnit(toHzValue, band.units),
    units: band.units,
    rows: groupedRows,
  };
}
