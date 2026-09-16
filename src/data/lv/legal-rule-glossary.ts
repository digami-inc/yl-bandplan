import type { LegalRule } from "../types";
import {
  glossaryById,
  type GlossaryEntry,
  type GlossaryId,
} from "../glossary";
import { legalConditions } from "./legal-conditions";

function isGlossaryId(value: string): value is GlossaryId {
  return value in glossaryById;
}

export function getLegalRuleGlossaryIds(
  rule: LegalRule,
): GlossaryId[] {
  const ids = new Set<GlossaryId>();

  if (isGlossaryId(rule.allocation)) {
    ids.add(rule.allocation);
  }

  if (isGlossaryId(rule.power.designation)) {
    ids.add(rule.power.designation);
  }

  if (rule.power.eirp) {
    ids.add("eirp");
  }

  for (const mode of rule.allowedModes ?? []) {
    if (isGlossaryId(mode)) {
      ids.add(mode);
    }
  }

  for (const emissionClass of rule.emissionClasses ?? []) {
    if (isGlossaryId(emissionClass)) {
      ids.add(emissionClass);
    }
  }

  for (const conditionId of rule.conditions ?? []) {
    const condition = legalConditions[conditionId];

    for (const glossaryId of condition.glossaryIds ?? []) {
      ids.add(glossaryId);
    }
  }

  return [...ids];
}

export function getLegalRuleGlossary(
  rule: LegalRule,
): GlossaryEntry[] {
  return getLegalRuleGlossaryIds(rule).map(
    (id) => glossaryById[id],
  );
}
