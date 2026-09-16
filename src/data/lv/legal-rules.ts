import type { LegalRule, LicenceClass } from "../types";

import { aCategoryLegalRules } from "./legal-a";
import { bCategoryLegalRules } from "./legal-b";
import { cCategoryLegalRules } from "./legal-c";

export {
  aCategoryLegalRules,
  bCategoryLegalRules,
  cCategoryLegalRules,
};

export const legalRules: LegalRule[] = [
  ...aCategoryLegalRules,
  ...bCategoryLegalRules,
  ...cCategoryLegalRules,
];

export const legalRulesByClass: Record<LicenceClass, LegalRule[]> = {
  A: aCategoryLegalRules,
  B: bCategoryLegalRules,
  C: cCategoryLegalRules,
};
