import type { LegalRule } from "./types";
import { aCategoryLegalRules } from "./lv/legal-a";
import { bCategoryLegalRules } from "./lv/legal-b";
import { cCategoryLegalRules } from "./lv/legal-c";
import { sources } from "./sources";
import { glossary } from "./glossary";
import { legalConditions } from "./lv/legal-conditions";

function fail(message: string): never {
  throw new Error(`DATA VALIDATION FAILED: ${message}`);
}

const knownSourceIds = new Set(Object.values(sources).map((source) => source.id));
const knownGlossaryIds = new Set<string>(glossary.map((entry) => entry.id));
const seenIds = new Set<string>();

function validateLegalRules(
  name: string,
  rules: LegalRule[],
  expectedCount: number,
): void {
  if (rules.length !== expectedCount) {
    fail(`${name}: expected ${expectedCount} legal rules, found ${rules.length}`);
  }

  let previousFromHz = -1;

  for (const rule of rules) {
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

    for (const [fieldName, values] of [
      ["allowedModes", rule.allowedModes],
      ["emissionClasses", rule.emissionClasses],
    ] as const) {
      if (values !== undefined) {
        if (values.length === 0) {
          fail(`${rule.id}: ${fieldName} must not be empty`);
        }

        if (values.some((value) => !value.trim())) {
          fail(`${rule.id}: ${fieldName} contains an empty value`);
        }

        if (new Set(values).size !== values.length) {
          fail(`${rule.id}: ${fieldName} contains duplicate values`);
        }
      }
    }

    const requiredGlossaryIds = [
      rule.allocation,
      rule.power.designation,
      ...(rule.power.eirp ? ["eirp"] : []),
      ...(rule.allowedModes ?? []),
      ...(rule.emissionClasses ?? []),
    ];

    for (const conditionId of rule.conditions ?? []) {
      const condition = legalConditions[conditionId];

      if (!condition) {
        fail(`${rule.id}: unknown legal condition "${conditionId}"`);
      }

      requiredGlossaryIds.push(...(condition.glossaryIds ?? []));
    }

    for (const glossaryId of requiredGlossaryIds) {
      if (!knownGlossaryIds.has(glossaryId)) {
        fail(`${rule.id}: missing glossary entry for "${glossaryId}"`);
      }
    }

    if (!knownSourceIds.has(rule.sourceId)) {
      fail(`${rule.id}: unknown sourceId "${rule.sourceId}"`);
    }

    if (!rule.sourceReference.trim()) {
      fail(`${rule.id}: missing sourceReference`);
    }
  }

  console.log(`OK: ${rules.length} ${name} legal rules validated`);
}

validateLegalRules("A-category", aCategoryLegalRules, 38);
validateLegalRules("B-category", bCategoryLegalRules, 9);
validateLegalRules("C-category", cCategoryLegalRules, 2);

console.log(`OK: ${seenIds.size} unique rule IDs`);
console.log(`OK: ${knownSourceIds.size} registered data sources`);
