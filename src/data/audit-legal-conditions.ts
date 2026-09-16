import { bands } from "../bandplan";
import { legalRules } from "./lv/legal-rules";
import { legalConditions } from "./lv/legal-conditions";

const UNIT_MULTIPLIER: Record<string, number> = {
  khz: 1_000,
  mhz: 1_000_000,
  ghz: 1_000_000_000,
};

function parseLegacyBand(
  value: string,
): { fromHz: number; toHz: number } | undefined {
  const match = value
    .trim()
    .match(/^([\d.]+)\s*[-–—]\s*([\d.]+)\s*(kHz|MHz|GHz)$/i);

  if (!match) {
    return undefined;
  }

  const multiplier = UNIT_MULTIPLIER[match[3].toLowerCase()];

  return {
    fromHz: Number(match[1]) * multiplier,
    toHz: Number(match[2]) * multiplier,
  };
}

function key(
  licenceClass: string,
  fromHz: number,
  toHz: number,
): string {
  return `${licenceClass}|${fromHz}|${toHz}`;
}

const legacyNotes = new Map<string, string>();

for (const band of bands) {
  for (const rule of band.rules) {
    const parsed = parseLegacyBand(rule.band);

    if (!parsed) {
      continue;
    }

    if (rule.notes?.trim()) {
      legacyNotes.set(
        key(rule.class, parsed.fromHz, parsed.toHz),
        rule.notes.trim(),
      );
    }
  }
}

let count = 0;

for (const rule of legalRules) {
  const ruleKey = key(
    rule.licenceClass,
    rule.fromHz,
    rule.toHz,
  );

  const legacy = legacyNotes.get(ruleKey);

  const hasStructuredCondition =
    rule.maxBandwidthHz !== undefined ||
    rule.allowedModes !== undefined ||
    rule.emissionClasses !== undefined ||
    rule.conditions !== undefined ||
    rule.power.eirp === true;

  if (!legacy && !hasStructuredCondition) {
    continue;
  }

  count++;

  console.log(`\n=== ${rule.id} ===`);
  console.log(
    `${rule.licenceClass} ${rule.fromHz}-${rule.toHz} Hz`,
  );
  console.log(`legacy notes:     ${legacy ?? "-"}`);
  console.log(
    `max bandwidth:    ${
      rule.maxBandwidthHz !== undefined
        ? `${rule.maxBandwidthHz} Hz`
        : "-"
    }`,
  );
  console.log(
    `allowed modes:    ${rule.allowedModes?.join(", ") ?? "-"}`,
  );
  console.log(
    `emission classes: ${rule.emissionClasses?.join(", ") ?? "-"}`,
  );
  console.log(
    `e.i.r.p.:         ${rule.power.eirp === true ? "yes" : "-"}`,
  );
  console.log(
    `conditions:       ${
      rule.conditions
        ?.map((id) => legalConditions[id].text)
        .join(" | ") ?? "-"
    }`,
  );
}

console.log(`\nRules with additional legal conditions: ${count}`);
console.log(`Legacy rules containing notes: ${legacyNotes.size}`);
