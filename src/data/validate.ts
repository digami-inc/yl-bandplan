import { aCategoryLegalRules } from "./lv/legal-a";
import { sources } from "./sources";

function fail(message: string): never {
  throw new Error(`DATA VALIDATION FAILED: ${message}`);
}

const knownSourceIds = new Set(Object.values(sources).map((source) => source.id));
const seenIds = new Set<string>();

if (aCategoryLegalRules.length !== 38) {
  fail(`A category: expected 38 legal rules, found ${aCategoryLegalRules.length}`);
}

let previousFromHz = -1;

for (const rule of aCategoryLegalRules) {
  if (seenIds.has(rule.id)) {
    fail(`duplicate rule id: ${rule.id}`);
  }
  seenIds.add(rule.id);

  if (!Number.isInteger(rule.fromHz) || !Number.isInteger(rule.toHz)) {
    fail(`${rule.id}: frequencies must be integer Hz values`);
  }

  if (rule.fromHz <= 0 || rule.toHz <= 0) {
    fail(`${rule.id}: frequencies must be positive`);
  }

  if (rule.fromHz >= rule.toHz) {
    fail(`${rule.id}: fromHz must be lower than toHz`);
  }

  if (rule.fromHz < previousFromHz) {
    fail(`${rule.id}: rules are not ordered by starting frequency`);
  }
  previousFromHz = rule.fromHz;

  if (!Number.isFinite(rule.power.maxWatts) || rule.power.maxWatts <= 0) {
    fail(`${rule.id}: invalid power limit`);
  }

  if (!rule.power.sourceText.trim()) {
    fail(`${rule.id}: missing original power text`);
  }

  if (
    rule.maxBandwidthHz !== undefined &&
    (!Number.isInteger(rule.maxBandwidthHz) || rule.maxBandwidthHz <= 0)
  ) {
    fail(`${rule.id}: invalid maxBandwidthHz`);
  }

  if (!knownSourceIds.has(rule.sourceId)) {
    fail(`${rule.id}: unknown sourceId "${rule.sourceId}"`);
  }

  if (!rule.sourceReference.trim()) {
    fail(`${rule.id}: missing sourceReference`);
  }
}

console.log(`OK: ${aCategoryLegalRules.length} A-category legal rules validated`);
console.log(`OK: ${seenIds.size} unique rule IDs`);
console.log(`OK: ${knownSourceIds.size} registered data sources`);
