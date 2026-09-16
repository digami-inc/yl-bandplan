import { bands } from "../bandplan";
import { legalRules } from "./lv/legal-rules";

const UNIT_MULTIPLIER: Record<string, number> = {
  khz: 1_000,
  mhz: 1_000_000,
  ghz: 1_000_000_000,
};

interface LegacyRule {
  route: string;
  class: string;
  band: string;
  cat: string;
  pwr: string;
  notes?: string;
  fromHz: number;
  toHz: number;
}

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
  const fromHz = Number(match[1]) * multiplier;
  const toHz = Number(match[2]) * multiplier;

  if (!Number.isInteger(fromHz) || !Number.isInteger(toHz)) {
    return undefined;
  }

  return { fromHz, toHz };
}

function key(
  licenceClass: string,
  fromHz: number,
  toHz: number,
): string {
  return `${licenceClass}|${fromHz}|${toHz}`;
}

function normalize(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s*≤\s*/g, " ≤ ")
    .trim();
}

const legacyRules: LegacyRule[] = [];
const unparsable: { route: string; class: string; band: string }[] = [];

for (const band of bands) {
  for (const rule of band.rules) {
    const parsed = parseLegacyBand(rule.band);

    if (!parsed) {
      unparsable.push({
        route: band.route,
        class: rule.class,
        band: rule.band,
      });
      continue;
    }

    legacyRules.push({
      route: band.route,
      ...rule,
      ...parsed,
    });
  }
}

const legacyByKey = new Map(
  legacyRules.map((rule) => [
    key(rule.class, rule.fromHz, rule.toHz),
    rule,
  ]),
);

const newByKey = new Map(
  legalRules.map((rule) => [
    key(rule.licenceClass, rule.fromHz, rule.toHz),
    rule,
  ]),
);

const missingInLegacy = legalRules.filter(
  (rule) =>
    !legacyByKey.has(
      key(rule.licenceClass, rule.fromHz, rule.toHz),
    ),
);

const extraInLegacy = legacyRules.filter(
  (rule) =>
    !newByKey.has(
      key(rule.class, rule.fromHz, rule.toHz),
    ),
);

const differences: {
  key: string;
  route: string;
  field: "cat" | "pwr";
  legacy: string;
  current: string;
}[] = [];

for (const current of legalRules) {
  const ruleKey = key(
    current.licenceClass,
    current.fromHz,
    current.toHz,
  );

  const legacy = legacyByKey.get(ruleKey);

  if (!legacy) {
    continue;
  }

  if (normalize(legacy.cat) !== normalize(current.allocation)) {
    differences.push({
      key: ruleKey,
      route: legacy.route,
      field: "cat",
      legacy: legacy.cat,
      current: current.allocation,
    });
  }

  if (
    normalize(legacy.pwr) !==
    normalize(current.power.sourceText)
  ) {
    differences.push({
      key: ruleKey,
      route: legacy.route,
      field: "pwr",
      legacy: legacy.pwr,
      current: current.power.sourceText,
    });
  }
}

console.log(`Legacy legal rules parsed: ${legacyRules.length}`);
console.log(`Current legal rules:       ${legalRules.length}`);
console.log(`Unparsable legacy rules:   ${unparsable.length}`);
console.log(`Missing in legacy:         ${missingInLegacy.length}`);
console.log(`Extra in legacy:           ${extraInLegacy.length}`);
console.log(`Field differences:         ${differences.length}`);

if (unparsable.length) {
  console.log("\n=== UNPARSABLE LEGACY RULES ===");
  console.table(unparsable);
}

if (missingInLegacy.length) {
  console.log("\n=== CURRENT RULES MISSING IN LEGACY ===");
  for (const rule of missingInLegacy) {
    console.log(
      `${rule.id}: ${rule.licenceClass} ${rule.fromHz}-${rule.toHz} Hz | ${rule.allocation} | ${rule.power.sourceText}`,
    );
  }
}

if (extraInLegacy.length) {
  console.log("\n=== LEGACY RULES NOT PRESENT IN CURRENT DATA ===");
  for (const rule of extraInLegacy) {
    console.log(
      `${rule.route}: ${rule.class} ${rule.band} | ${rule.cat} | ${rule.pwr}`,
    );
  }
}

if (differences.length) {
  console.log("\n=== FIELD DIFFERENCES ===");
  console.table(differences);
}
