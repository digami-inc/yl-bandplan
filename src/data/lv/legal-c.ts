import type { LegalRule } from "../types";

export const cCategoryLegalRules: LegalRule[] = [
  {
    id: "c-001",
    licenceClass: "C",
    fromHz: 144_000_000,
    toHz: 146_000_000,
    allocation: "PRIMeks",
    power: {
      designation: "pZ",
      maxWatts: 10,
      sourceText: "pZ ≤ 10 W",
    },
    emissionClasses: ["F3E", "G3E", "FXW"],
    conditions: ["factory-radio-only"],
    sourceId: "mk257",
    sourceReference: "3. pielikums, 1. punkts; piezīme 3.",
  },
  {
    id: "c-002",
    licenceClass: "C",
    fromHz: 430_000_000,
    toHz: 440_000_000,
    allocation: "PRIM",
    power: {
      designation: "pZ",
      maxWatts: 10,
      sourceText: "pZ ≤ 10 W",
    },
    emissionClasses: ["F3E", "G3E", "FXW"],
    conditions: ["factory-radio-only"],
    sourceId: "mk257",
    sourceReference: "3. pielikums, 2. punkts; piezīme 3.",
  },
];
