import type { Band } from "../../bandplan";
import type { LicenceClass } from "../types";
import { sources } from "../sources";
import { legalConditions } from "./legal-conditions";
import { getLegalRuleGlossary } from "./legal-rule-glossary";
import { legalRules } from "./legal-rules";

const UNIT_SCALE: Record<string, number> = {
  hz: 1,
  khz: 1_000,
  mhz: 1_000_000,
  ghz: 1_000_000_000,
};

const UNIT_DECIMALS: Record<string, number> = {
  hz: 0,
  khz: 3,
  mhz: 6,
  ghz: 9,
};

const BAND_RANGE_OVERRIDES: Record<string, readonly [number, number]> = {
  // The legacy visual band ends at 24.050 GHz, while Latvian A-class rules
  // continue through the secondary 24.050–24.250 GHz allocation.
  "12mm": [24_000_000_000, 24_250_000_000],

  // The legacy visual band ends at 81.1 GHz; the current Latvian allocation
  // continues through 81.5 GHz.
  "4mm": [76_000_000_000, 81_500_000_000],
};

function decimalFrequencyToHz(value: string, unit: string): number {
  const normalizedUnit = unit.trim().toLowerCase();
  const scale = UNIT_SCALE[normalizedUnit];
  const decimals = UNIT_DECIMALS[normalizedUnit];

  if (scale === undefined || decimals === undefined) {
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
    throw new Error(`Frequency has too many decimal places: ${value} ${unit}`);
  }

  return Number(whole) * scale + Number(fraction.padEnd(decimals, "0") || "0");
}

function formatHzInUnit(hz: number, unit: string): string {
  const normalizedUnit = unit.trim().toLowerCase();
  const scale = UNIT_SCALE[normalizedUnit];
  const decimals = UNIT_DECIMALS[normalizedUnit];

  if (scale === undefined || decimals === undefined) {
    throw new Error(`Unknown frequency unit: ${unit}`);
  }

  const whole = Math.floor(hz / scale);
  const remainder = hz % scale;

  if (remainder === 0 || decimals === 0) {
    return String(whole);
  }

  const fraction = String(remainder)
    .padStart(decimals, "0")
    .replace(/0+$/, "");

  return `${whole}.${fraction}`;
}

function getBandRangeHz(band: Band): readonly [number, number] {
  return (
    BAND_RANGE_OVERRIDES[band.route] ?? [
      decimalFrequencyToHz(band.from, band.units),
      decimalFrequencyToHz(band.to, band.units),
    ]
  );
}

export function getLegalDisplayRows(band: Band, priv: string) {
  const [bandFromHz, bandToHz] = getBandRangeHz(band);
  const licenceClass = priv === "all" ? undefined : (priv.toUpperCase() as LicenceClass);

  return legalRules
    .filter(
      (rule) =>
        rule.toHz > bandFromHz &&
        rule.fromHz < bandToHz &&
        (!licenceClass || rule.licenceClass === licenceClass),
    )
    .map((rule) => {
      const notes: string[] = [];

      if (rule.maxBandwidthHz !== undefined) {
        notes.push(`Maksimālais joslas platums: ${rule.maxBandwidthHz} Hz.`);
      }

      if (rule.allowedModes?.length) {
        notes.push(`Atļautie darba veidi: ${rule.allowedModes.join(", ")}.`);
      }

      if (rule.emissionClasses?.length) {
        notes.push(
          `Atļautās izstarojuma klases: ${rule.emissionClasses.join(", ")}.`,
        );
      }

      for (const conditionId of rule.conditions ?? []) {
        notes.push(legalConditions[conditionId].text);
      }

      return {
        id: rule.id,
        licenceClass: rule.licenceClass,
        from: formatHzInUnit(rule.fromHz, band.units),
        to: formatHzInUnit(rule.toHz, band.units),
        unit: band.units,
        allocation: rule.allocation,
        power: rule.power.sourceText,
        notes,
        glossary: getLegalRuleGlossary(rule),
        sourceReference: rule.sourceReference,
      };
    });
}

export function getLegalSource() {
  return sources.mk257;
}
