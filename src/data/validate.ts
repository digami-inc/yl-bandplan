import type { LegalRule } from "./types";
import { aCategoryLegalRules } from "./lv/legal-a";
import { bCategoryLegalRules } from "./lv/legal-b";
import { cCategoryLegalRules } from "./lv/legal-c";
import { sources } from "./sources";
import { glossary } from "./glossary";
import { legalConditions } from "./lv/legal-conditions";
import {
  iaruActivityMarkers,
  iaruMigrationStats,
  iaruSegments,
} from "./iaru";

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
    if (seenIds.has(rule.id)) fail(`duplicate rule id: ${rule.id}`);
    seenIds.add(rule.id);

    if (!Number.isInteger(rule.fromHz) || !Number.isInteger(rule.toHz)) {
      fail(`${rule.id}: frequencies must be integer Hz values`);
    }
    if (rule.fromHz <= 0 || rule.toHz <= 0 || rule.fromHz >= rule.toHz) {
      fail(`${rule.id}: invalid frequency range`);
    }
    if (rule.fromHz < previousFromHz) {
      fail(`${rule.id}: rules are not ordered by starting frequency`);
    }
    previousFromHz = rule.fromHz;

    if (!Number.isFinite(rule.power.maxWatts) || rule.power.maxWatts <= 0) {
      fail(`${rule.id}: invalid power limit`);
    }
    if (!rule.power.sourceText.trim()) fail(`${rule.id}: missing original power text`);

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
        if (values.length === 0 || values.some((value) => !value.trim())) {
          fail(`${rule.id}: ${fieldName} contains invalid values`);
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
      if (!condition) fail(`${rule.id}: unknown legal condition "${conditionId}"`);
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
    if (!rule.sourceReference.trim()) fail(`${rule.id}: missing sourceReference`);
  }

  console.log(`OK: ${rules.length} ${name} legal rules validated`);
}

function validateIaruData(): void {
  const seenSegmentIds = new Set<string>();

  if (iaruMigrationStats.legacySegments !== 180) {
    fail(`IARU migration: expected 180 legacy segments, found ${iaruMigrationStats.legacySegments}`);
  }
  if (iaruSegments.length !== 191) {
    fail(`IARU: expected 191 canonical segments, found ${iaruSegments.length}`);
  }

  for (const segment of iaruSegments) {
    if (seenSegmentIds.has(segment.id)) fail(`IARU: duplicate segment id "${segment.id}"`);
    seenSegmentIds.add(segment.id);

    if (!Number.isSafeInteger(segment.fromHz) || !Number.isSafeInteger(segment.toHz)) {
      fail(`${segment.id}: frequencies must be safe integer Hz values`);
    }
    if (segment.fromHz <= 0 || segment.toHz <= 0 || segment.fromHz >= segment.toHz) {
      fail(`${segment.id}: invalid frequency range`);
    }
    if (
      segment.maxBandwidthHz !== undefined &&
      (!Number.isInteger(segment.maxBandwidthHz) || segment.maxBandwidthHz <= 0)
    ) {
      fail(`${segment.id}: invalid maxBandwidthHz`);
    }
    if (!segment.bandId.trim()) fail(`${segment.id}: missing bandId`);
    if (segment.modes.length === 0 || segment.modes.some((mode) => !mode.trim())) {
      fail(`${segment.id}: modes must contain non-empty values`);
    }
    if (!knownSourceIds.has(segment.sourceId)) {
      fail(`${segment.id}: unknown sourceId "${segment.sourceId}"`);
    }
    if (!segment.sourceReference?.trim()) fail(`${segment.id}: missing sourceReference`);
  }

  const stale10mBandwidth = iaruSegments.filter(
    (segment) =>
      segment.bandId === "10m" &&
      segment.fromHz >= 29_000_000 &&
      segment.toHz <= 29_510_000 &&
      segment.maxBandwidthHz !== undefined,
  );
  if (stale10mBandwidth.length !== 0) {
    fail(`IARU HF: ${stale10mBandwidth.length} segment(s) still carry the pre-2020 6 kHz restriction`);
  }

  const satellite15m = iaruSegments.find((segment) => segment.id === "iaru-15m-satellite-2020");
  if (!satellite15m || satellite15m.fromHz !== 21_125_000 || satellite15m.toHz !== 21_450_000) {
    fail("IARU HF: Novi Sad 2020 15 m amateur-satellite recommendation missing");
  }

  if (iaruMigrationStats.verifiedHfSegments !== 82) {
    fail(`IARU HF: expected 82 verified/current HF segments, found ${iaruMigrationStats.verifiedHfSegments}`);
  }
  if (iaruMigrationStats.verifiedVhfUpSegments !== 109) {
    fail(`IARU VHF+: expected 109 verified/current segments, found ${iaruMigrationStats.verifiedVhfUpSegments}`);
  }
  if (iaruMigrationStats.pendingVhfUpSegments !== 0) {
    fail(`IARU VHF+: expected no pending canonical segments, found ${iaruMigrationStats.pendingVhfUpSegments}`);
  }

  const expectedVhfUpBandCounts: Record<string, number> = {
    "6m": 8,
    "4m": 5,
    "2m": 14,
    "70cm": 13,
    "23cm": 18,
    "13cm": 6,
    "9cm": 5,
    "6cm": 9,
    "3cm": 9,
    "12mm": 5,
    "6mm": 3,
    "4mm": 5,
    "122G": 2,
    "134G": 4,
    "241G": 3,
  };

  for (const [bandId, expectedCount] of Object.entries(expectedVhfUpBandCounts)) {
    const current = iaruSegments.filter(
      (segment) => segment.bandId === bandId && segment.sourceId === "iaru-r1-vhf-up",
    );
    if (current.length !== expectedCount) {
      fail(`IARU VHF+ ${bandId}: expected ${expectedCount} verified segments, found ${current.length}`);
    }
  }

  const vhf50Beacon = iaruSegments.find(
    (segment) => segment.bandId === "6m" && segment.fromHz === 50_000_000 && segment.toHz === 50_030_000,
  );
  if (vhf50Beacon?.maxBandwidthHz !== 500) {
    fail("IARU VHF: 50.000-50.030 MHz must have 500 Hz max bandwidth");
  }

  const vhf70BeaconSegments = iaruSegments.filter(
    (segment) => segment.bandId === "4m" && segment.fromHz >= 70_000_000 && segment.toHz <= 70_100_000,
  );
  if (vhf70BeaconSegments.length !== 2 || vhf70BeaconSegments.some((segment) => segment.maxBandwidthHz !== 1_000)) {
    fail("IARU VHF: both 70.000-70.100 MHz beacon segments must have 1000 Hz max bandwidth");
  }

  const band23End = Math.max(...iaruSegments.filter((segment) => segment.bandId === "23cm").map((segment) => segment.toHz));
  if (band23End !== 1_300_000_000) {
    fail(`IARU 23cm: current plan must extend to 1300 MHz, got ${band23End} Hz`);
  }

  const stale9cmBandwidth = iaruSegments.filter(
    (segment) => segment.bandId === "9cm" && segment.maxBandwidthHz !== undefined,
  );
  if (stale9cmBandwidth.length !== 0) {
    fail("IARU 9cm: current 3400-3475 MHz table must not retain legacy bandwidth limits");
  }

  const segment10369 = iaruSegments.find(
    (segment) => segment.bandId === "3cm" && segment.fromHz === 10_369_000_000 && segment.toHz === 10_370_000_000,
  );
  if (!segment10369 || segment10369.maxBandwidthHz !== undefined) {
    fail("IARU 3cm: current 10369-10370 MHz all-modes segment missing or has stale bandwidth limit");
  }

  const preferred241G = iaruSegments.find(
    (segment) => segment.bandId === "241G" && segment.fromHz === 248_001_000_000 && segment.toHz === 250_000_000_000,
  );
  if (!preferred241G) {
    fail("IARU 241G: preferred segment must start at 248.001 GHz");
  }

  const seenMarkerIds = new Set<string>();
  for (const marker of iaruActivityMarkers) {
    if (seenMarkerIds.has(marker.id)) fail(`activity marker: duplicate id "${marker.id}"`);
    seenMarkerIds.add(marker.id);
    if (!Number.isSafeInteger(marker.frequencyHz) || marker.frequencyHz <= 0) {
      fail(`${marker.id}: invalid frequencyHz`);
    }
    if (!marker.name.trim()) fail(`${marker.id}: missing name`);
    if (marker.sourceId && !knownSourceIds.has(marker.sourceId)) {
      fail(`${marker.id}: unknown sourceId "${marker.sourceId}"`);
    }
  }

  console.log(`OK: ${iaruSegments.length} canonical IARU segments validated`);
  console.log(`OK: ${iaruMigrationStats.verifiedHfSegments} HF segments current/verified`);
  console.log(`OK: ${iaruMigrationStats.verifiedVhfUpSegments} VHF+ segments current/verified`);
  console.log(`OK: ${iaruMigrationStats.pendingVhfUpSegments} VHF+ segments pending verification`);
  console.log(`OK: ${iaruActivityMarkers.length} activity markers normalized`);
}

validateLegalRules("A-category", aCategoryLegalRules, 38);
validateLegalRules("B-category", bCategoryLegalRules, 9);
validateLegalRules("C-category", cCategoryLegalRules, 2);
validateIaruData();

console.log(`OK: ${seenIds.size} unique rule IDs`);
console.log(`OK: ${knownSourceIds.size} registered data sources`);
