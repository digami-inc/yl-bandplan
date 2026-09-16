import { bands } from "../bandplan";
import { getIaruDisplayRowsForPrivilege } from "./iaru/licence-filter";
import { getBandVisualModel } from "./visualization";

function fail(message: string): never {
  throw new Error(`VISUALIZATION VALIDATION FAILED: ${message}`);
}

for (const band of bands) {
  const model = getBandVisualModel(band, "all");

  if (!Number.isFinite(model.from) || !Number.isFinite(model.to) || model.from >= model.to) {
    fail(`${band.route}: invalid visual frequency range`);
  }
  if (!Number.isSafeInteger(model.fromHz) || !Number.isSafeInteger(model.toHz)) {
    fail(`${band.route}: visual range must use safe integer Hz boundaries`);
  }
  if (model.rows.length === 0) {
    fail(`${band.route}: no legal visualization rows`);
  }

  for (const row of model.rows) {
    if (row.legalRanges.length === 0) fail(`${band.route}/${row.name}: no legal ranges`);

    for (const range of row.legalRanges) {
      if (range.from < model.from || range.to > model.to || range.from >= range.to) {
        fail(`${band.route}/${row.name}: legal range outside visual envelope`);
      }
    }

    for (const slice of row.slices) {
      if (slice.from < model.from || slice.to > model.to || slice.from >= slice.to) {
        fail(`${band.route}/${row.name}/${slice.id}: slice outside visual envelope`);
      }

      const isLegallyCovered = row.legalRanges.some(
        (range) => slice.from >= range.from && slice.to <= range.to,
      );
      if (!isLegallyCovered) {
        fail(`${band.route}/${row.name}/${slice.id}: slice is not covered by a legal range`);
      }
    }
  }
}

const bandByRoute = (route: string) => {
  const band = bands.find((candidate) => candidate.route === route);
  if (!band) fail(`missing legacy band metadata for ${route}`);
  return band;
};

const band12mm = getBandVisualModel(bandByRoute("12mm"), "a");
if (band12mm.toHz !== 24_250_000_000) {
  fail(`12mm: canonical visualization must extend to 24.250 GHz, got ${band12mm.toHz} Hz`);
}

const band4mm = getBandVisualModel(bandByRoute("4mm"), "a");
if (band4mm.toHz !== 81_500_000_000) {
  fail(`4mm: canonical visualization must extend to 81.5 GHz, got ${band4mm.toHz} Hz`);
}

const band9cm = getBandVisualModel(bandByRoute("9cm"), "a");
if (band9cm.toHz !== 3_475_000_000) {
  fail(`9cm: IARU visualization envelope must extend to 3475 MHz, got ${band9cm.toHz} Hz`);
}

const band40m = bandByRoute("40m");
const band40mB = getBandVisualModel(band40m, "b");
const band40mBRow = band40mB.rows[0];
if (
  !band40mBRow ||
  band40mBRow.legalRanges.length !== 1 ||
  band40mBRow.legalRanges[0].from !== 7010 ||
  band40mBRow.legalRanges[0].to !== 7080
) {
  fail("40m/B: canonical legal visualization must be limited to 7010-7080 kHz");
}
const band40mBLabels = new Set(
  band40mBRow.slices.map((slice) => slice.text?.toLowerCase()).filter(Boolean),
);
if (!band40mBLabels.has("cw") || !band40mBLabels.has("digi")) {
  fail("40m/B: original CW/DIGI presentation must be preserved inside the legal range");
}
if (!band40mBRow.slices.every((slice) => slice.kind === "legal-restriction")) {
  fail("40m/B: restricted-mode visualization must remain marked as legally constrained");
}

const band40mAllIaru = getIaruDisplayRowsForPrivilege(band40m, "all");
const band40mBIaru = getIaruDisplayRowsForPrivilege(band40m, "b");
if (band40mBIaru.length === 0 || band40mBIaru.length >= band40mAllIaru.length) {
  fail("40m/B: licence-filtered IARU table must contain a reduced non-empty row set");
}
if (
  band40mBIaru.some(
    (row) => row.fromHz < 7_010_000 || row.toHz > 7_080_000,
  )
) {
  fail("40m/B: licence-filtered IARU rows must stay inside 7010-7080 kHz");
}

const band2m = bandByRoute("2m");
const band2mA = getBandVisualModel(band2m, "a");
if (band2mA.rows.some((row) => row.slices.some((slice) => slice.kind === "legal-restriction"))) {
  fail("2m/A: special 1000 W rule must not restrict the underlying unrestricted 100 W allocation");
}

const band2mC = getBandVisualModel(band2m, "c");
const band2mCRow = band2mC.rows[0];
if (!band2mCRow || band2mCRow.legalRanges.length !== 1) {
  fail("2m/C: canonical legal range missing");
}
if (
  band2mCRow.legalRanges[0].from !== 144 ||
  band2mCRow.legalRanges[0].to !== 146
) {
  fail("2m/C: legal visualization must remain limited to 144-146 MHz");
}
if (!band2mCRow.slices.some((slice) => slice.text?.toLowerCase().includes("fm"))) {
  fail("2m/C: original FM presentation must be preserved");
}
if (!band2mCRow.slices.every((slice) => slice.kind === "legal-restriction")) {
  fail("2m/C: emission-limited visualization must remain marked as legally constrained");
}

const band2mAllIaru = getIaruDisplayRowsForPrivilege(band2m, "all");
const band2mCIaru = getIaruDisplayRowsForPrivilege(band2m, "c");
if (band2mCIaru.length === 0 || band2mCIaru.length >= band2mAllIaru.length) {
  fail("2m/C: licence-filtered IARU table must contain a reduced non-empty row set");
}
if (
  band2mCIaru.some(
    (row) => row.fromHz < 144_000_000 || row.toHz > 146_000_000,
  )
) {
  fail("2m/C: licence-filtered IARU rows must stay inside 144-146 MHz");
}

console.log(`OK: ${bands.length} canonical band visualizations validated`);
console.log("OK: licence-filtered IARU detail tables validated");
