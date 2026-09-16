import { bands, type Band } from "../bandplan";
import type {
  ActivityMarker,
  IaruSegment,
  LegalRule,
  LicenceClass,
} from "./types";
import type { GlossaryEntry } from "./glossary";
import { iaruActivityMarkers, iaruSegments } from "./iaru";
import { legalConditions } from "./lv/legal-conditions";
import { getLegalRuleGlossary } from "./lv/legal-rule-glossary";
import { legalRules } from "./lv/legal-rules";

export type LookupUnit = "Hz" | "kHz" | "MHz" | "GHz";

const UNIT_DECIMALS: Record<LookupUnit, number> = {
  Hz: 0,
  kHz: 3,
  MHz: 6,
  GHz: 9,
};

const BAND_RANGE_OVERRIDES: Record<string, readonly [number, number]> = {
  // Latvian A-class allocation continues beyond the legacy visual range.
  "12mm": [24_000_000_000, 24_250_000_000],
  "4mm": [76_000_000_000, 81_500_000_000],
};

function decimalToHz(value: string, unit: LookupUnit): number | undefined {
  const normalized = value.trim().replace(",", ".");
  const match = normalized.match(/^(\d+)(?:\.(\d+))?$/);

  if (!match) return undefined;

  const decimals = UNIT_DECIMALS[unit];
  const whole = match[1];
  const fraction = match[2] ?? "";

  if (fraction.length > decimals) return undefined;

  const hz =
    Number(whole) * 10 ** decimals +
    Number(fraction.padEnd(decimals, "0") || "0");

  return Number.isSafeInteger(hz) && hz > 0 ? hz : undefined;
}

function bandValueToHz(value: string, unit: string): number {
  const normalizedUnit = unit.trim().toLowerCase();
  const lookupUnit =
    normalizedUnit === "hz"
      ? "Hz"
      : normalizedUnit === "khz"
        ? "kHz"
        : normalizedUnit === "mhz"
          ? "MHz"
          : normalizedUnit === "ghz"
            ? "GHz"
            : undefined;

  if (!lookupUnit) throw new Error(`Unknown band unit: ${unit}`);

  const hz = decimalToHz(value, lookupUnit);
  if (hz === undefined) throw new Error(`Invalid band frequency: ${value} ${unit}`);
  return hz;
}

function getBandRangeHz(band: Band): readonly [number, number] {
  return (
    BAND_RANGE_OVERRIDES[band.route] ?? [
      bandValueToHz(band.from, band.units),
      bandValueToHz(band.to, band.units),
    ]
  );
}

function containsFrequency(
  fromHz: number,
  toHz: number,
  frequencyHz: number,
): boolean {
  // Frequency ranges are treated as half-open [from, to) to avoid returning
  // both adjacent rows for an exact shared boundary.
  return frequencyHz >= fromHz && frequencyHz < toHz;
}

export interface FrequencyLegalMatch {
  rule: LegalRule;
  conditions: string[];
  glossary: GlossaryEntry[];
}

export interface FrequencyLookupResult {
  frequencyHz: number;
  band?: Band;
  legal: FrequencyLegalMatch[];
  iaru: IaruSegment[];
  activityMarkers: ActivityMarker[];
}

export function frequencyHzFromInput(
  value: string,
  unit: LookupUnit,
): number | undefined {
  return decimalToHz(value, unit);
}

export function formatFrequencyInUnit(
  frequencyHz: number,
  unit: LookupUnit,
): string {
  const decimals = UNIT_DECIMALS[unit];
  const scale = 10 ** decimals;
  const whole = Math.floor(frequencyHz / scale);
  const remainder = frequencyHz % scale;

  if (decimals === 0 || remainder === 0) return String(whole);

  const fraction = String(remainder)
    .padStart(decimals, "0")
    .replace(/0+$/, "");

  return `${whole}.${fraction}`;
}

export function lookupFrequencyHz(frequencyHz: number): FrequencyLookupResult {
  if (!Number.isSafeInteger(frequencyHz) || frequencyHz <= 0) {
    throw new Error("frequencyHz must be a positive safe integer");
  }

  const band = bands.find((candidate) => {
    const [fromHz, toHz] = getBandRangeHz(candidate);
    return containsFrequency(fromHz, toHz, frequencyHz);
  });

  const legal = legalRules
    .filter((rule) => containsFrequency(rule.fromHz, rule.toHz, frequencyHz))
    .sort((a, b) => {
      const classOrder = a.licenceClass.localeCompare(b.licenceClass);
      if (classOrder !== 0) return classOrder;
      return b.toHz - b.fromHz - (a.toHz - a.fromHz);
    })
    .map((rule) => ({
      rule,
      conditions: (rule.conditions ?? []).map(
        (conditionId) => legalConditions[conditionId].text,
      ),
      glossary: getLegalRuleGlossary(rule),
    }));

  const iaru = iaruSegments
    .filter(
      (segment) =>
        (!band || segment.bandId === band.route) &&
        containsFrequency(segment.fromHz, segment.toHz, frequencyHz),
    )
    .sort((a, b) => a.fromHz - b.fromHz || a.toHz - b.toHz);

  const activityMarkers = iaruActivityMarkers.filter(
    (marker) => marker.frequencyHz === frequencyHz,
  );

  return {
    frequencyHz,
    band,
    legal,
    iaru,
    activityMarkers,
  };
}

export function legalMatchesForClass(
  result: FrequencyLookupResult,
  licenceClass: LicenceClass,
): FrequencyLegalMatch[] {
  return result.legal.filter(
    (match) => match.rule.licenceClass === licenceClass,
  );
}
