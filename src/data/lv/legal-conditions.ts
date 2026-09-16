import type { GlossaryId } from "../glossary";

export interface LegalConditionDefinition {
  text: string;
  glossaryIds?: readonly GlossaryId[];
}

export const legalConditions = {
  "emc-assessment": {
    text:
      "Jāizvērtē elektromagnētiskā situācija stacijas uzstādīšanas vietā un jānodrošina, lai stacija neradītu kaitīgus traucējumus Latvijas un citu valstu amatieru dienesta un citu radiosakaru dienestu stacijām.",
  },

  "border-field-strength": {
    text:
      "50–52 MHz un 70–70,5 MHz joslās elektromagnētiskā lauka intensitāte uz Latvijas robežas ar kaimiņvalstīm, kurās šīs joslas nav piešķirtas radioamatieru dienestam, nedrīkst pārsniegt 6 dBµV/m 10 m augstumā virs zemes 50 % vietu un 10 % laika.",
  },

  "eme-ms-contest": {
    text:
      "Tikai EME, MS sakariem vai darbam starptautiskās sacensībās; darba veidi CW, SSB un MGM.",
    glossaryIds: ["EME", "MS"],
  },

  "factory-radio-only": {
    text:
      "Atļauts izmantot tikai rūpnieciski izgatavotas pārnēsājamas vai mobilas radiostacijas. Radiostaciju pārbūve nav atļauta.",
  },
} as const satisfies Record<string, LegalConditionDefinition>;

export type LegalConditionId = keyof typeof legalConditions;

export function getLegalCondition(
  id: LegalConditionId,
): LegalConditionDefinition {
  return legalConditions[id];
}
