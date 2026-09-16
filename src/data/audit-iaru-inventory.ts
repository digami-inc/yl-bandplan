import { bands } from "../bandplan";
import {
  iaruActivityMarkers,
  iaruMigrationStats,
  iaruSegments,
} from "./iaru";

console.log("=== IARU migration status ===");
console.log(`Legacy segments:        ${iaruMigrationStats.legacySegments}`);
console.log(`Canonical segments:     ${iaruMigrationStats.canonicalSegments}`);
console.log(`HF current/verified:    ${iaruMigrationStats.verifiedHfSegments}`);
console.log(`VHF+ current/verified:  ${iaruMigrationStats.verifiedVhfUpSegments}`);
console.log(`VHF+ pending verify:    ${iaruMigrationStats.pendingVhfUpSegments}`);
console.log(`Activity markers:       ${iaruMigrationStats.activityMarkers}`);

console.log("\n=== Per-band status ===");
console.log("band\tsegments\tsource status");

for (const band of bands) {
  const segments = iaruSegments.filter((segment) => segment.bandId === band.route);

  if (!segments.length) {
    continue;
  }

  const sources = [...new Set(segments.map((segment) => segment.sourceId))];
  const status = sources.every((sourceId) => sourceId === "iaru-r1-hf")
    ? "current HF"
    : sources.every((sourceId) => sourceId === "iaru-r1-vhf-up")
      ? "current VHF+"
      : sources.includes("original-bandplan")
        ? "PENDING VHF+ VERIFY"
        : sources.join(",");

  console.log(`${band.route}\t${segments.length}\t${status}`);
}

console.log("\n=== Known current-HF patches ===");

for (const segment of iaruSegments.filter(
  (segment) =>
    segment.id === "iaru-15m-satellite-2020" ||
    (segment.bandId === "10m" &&
      segment.fromHz >= 29_000_000 &&
      segment.toHz <= 29_510_000),
)) {
  console.log(
    `${segment.id}: ${segment.fromHz}-${segment.toHz} Hz | bw=${segment.maxBandwidthHz ?? "none"} | ${segment.sourceReference}`,
  );
}

console.log("\n=== Current-VHF corrections ===");

for (const segment of iaruSegments.filter(
  (segment) =>
    (segment.bandId === "6m" &&
      segment.fromHz === 50_000_000 &&
      segment.toHz === 50_030_000) ||
    (segment.bandId === "4m" &&
      segment.fromHz >= 70_000_000 &&
      segment.toHz <= 70_100_000),
)) {
  console.log(
    `${segment.id}: ${segment.fromHz}-${segment.toHz} Hz | bw=${segment.maxBandwidthHz ?? "none"} | ${segment.sourceReference}`,
  );
}

console.log(`\nNormalized activity markers: ${iaruActivityMarkers.length}`);
