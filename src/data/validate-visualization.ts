import { bands } from "../bandplan";
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

const band40mB = getBandVisualModel(bandByRoute("40m"), "b");
if (!band40mB.rows.some((row) => row.slices.some((slice) => slice.kind === "legal-restriction" && slice.text === "CW/MGM"))) {
  fail("40m/B: CW/MGM legal restriction overlay missing");
}

const band2mA = getBandVisualModel(bandByRoute("2m"), "a");
if (band2mA.rows.some((row) => row.slices.some((slice) => slice.kind === "legal-restriction"))) {
  fail("2m/A: special 1000 W rule must not restrict the underlying unrestricted 100 W allocation");
}

const band2mC = getBandVisualModel(bandByRoute("2m"), "c");
if (!band2mC.rows.some((row) => row.slices.some((slice) => slice.kind === "legal-restriction" && slice.text === "F3E/G3E/FXW"))) {
  fail("2m/C: emission-class restriction overlay missing");
}

console.log(`OK: ${bands.length} canonical band visualizations validated`);
