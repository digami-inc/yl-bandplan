import type { Band } from "../../bandplan";
import { sources } from "../sources";
import type { DataSource, IaruSegment } from "../types";
import { iaruSegments } from "./index";

const UNIT_HZ: Record<string, number> = {
  hz: 1,
  khz: 1_000,
  mhz: 1_000_000,
  ghz: 1_000_000_000,
};

export interface IaruDisplayRow {
  id: string;
  from: string;
  to: string;
  fromHz: number;
  toHz: number;
  bandwidthHz?: number;
  description: string;
  note?: string;
  colorClass: string;
  sourceReference?: string;
}

function unitScale(unit: string): number {
  const scale = UNIT_HZ[unit.trim().toLowerCase()];
  if (!scale) throw new Error(`Unknown frequency unit: ${unit}`);
  return scale;
}

export function hzToUnitNumber(hz: number, unit: string): number {
  return hz / unitScale(unit);
}

export function formatHzInUnit(hz: number, unit: string): string {
  const value = hzToUnitNumber(hz, unit);
  return Number.isInteger(value)
    ? String(value)
    : value.toFixed(9).replace(/0+$/, "").replace(/\.$/, "");
}

function colorClassFor(segment: IaruSegment): string {
  const text = [
    ...segment.modes,
    ...(segment.usage ?? []),
    ...(segment.notes ?? []),
  ]
    .join(" ")
    .toLowerCase();

  if (text.includes("beacon") || text.includes("satellite") || text.includes("guard")) {
    return "red";
  }
  if (text.includes("fm") || text.includes("digital voice") || text.includes("repeater")) {
    return "green";
  }
  if (text.includes("mgm") || text.includes("digital") || text.includes("digimode")) {
    return "orange";
  }
  if (text.includes("cw") || text.includes("telegraph")) {
    return "yellow";
  }
  return "blue";
}

export function getIaruDisplayRows(band: Band): IaruDisplayRow[] {
  return iaruSegments
    .filter((segment) => segment.bandId === band.route)
    .map((segment) => ({
      id: segment.id,
      from: formatHzInUnit(segment.fromHz, band.iaruUnits),
      to: formatHzInUnit(segment.toHz, band.iaruUnits),
      fromHz: segment.fromHz,
      toHz: segment.toHz,
      bandwidthHz: segment.maxBandwidthHz,
      description: segment.modes.join(", "),
      note: [...(segment.usage ?? []), ...(segment.notes ?? [])].join(" · ") || undefined,
      colorClass: colorClassFor(segment),
      sourceReference: segment.sourceReference,
    }));
}

export function getIaruSourcesForBand(band: Band): DataSource[] {
  const sourceIds = new Set(
    iaruSegments
      .filter((segment) => segment.bandId === band.route)
      .map((segment) => segment.sourceId),
  );

  return Object.values(sources).filter((source) => sourceIds.has(source.id));
}
