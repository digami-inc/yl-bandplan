<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { DataSource, LicenceClass } from "../data/types";
import {
  formatFrequencyInUnit,
  frequencyHzFromInput,
  legalMatchesForClass,
  lookupFrequencyHz,
  type FrequencyLookupResult,
  type LookupUnit,
} from "../data/frequency-lookup";
import { sources } from "../data/sources";

const licenceClasses: LicenceClass[] = ["A", "B", "C"];
const units: LookupUnit[] = ["Hz", "kHz", "MHz", "GHz"];
const sourceById = Object.fromEntries(
  Object.values(sources).map((source) => [source.id, source]),
) as Record<string, DataSource>;

const frequency = ref("145.500");
const unit = ref<LookupUnit>("MHz");
const result = ref<FrequencyLookupResult | null>(null);
const error = ref("");

const displayFrequency = computed(() => {
  if (!result.value) return "";
  return `${formatFrequencyInUnit(result.value.frequencyHz, unit.value)} ${unit.value}`;
});

const iaruSources = computed(() => {
  if (!result.value) return [];

  return [
    ...new Set(result.value.iaru.map((segment) => segment.sourceId)),
  ]
    .map((sourceId) => sourceById[sourceId])
    .filter((source): source is DataSource => Boolean(source));
});

function runLookup(updateUrl = true) {
  error.value = "";
  const frequencyHz = frequencyHzFromInput(frequency.value, unit.value);

  if (frequencyHz === undefined) {
    result.value = null;
    error.value = "Ievadi pozitīvu frekvenci ar precizitāti, ko izvēlētā mērvienība var izteikt veselos Hz.";
    return;
  }

  result.value = lookupFrequencyHz(frequencyHz);

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("f", frequency.value.trim().replace(",", "."));
    url.searchParams.set("u", unit.value);
    history.replaceState(null, "", url.pathname + url.search + url.hash);
  }
}

function matchesForClass(licenceClass: LicenceClass) {
  return result.value
    ? legalMatchesForClass(result.value, licenceClass)
    : [];
}

function sourceForId(sourceId: string) {
  return sourceById[sourceId];
}

onMounted(() => {
  const url = new URL(window.location.href);
  const queryFrequency = url.searchParams.get("f");
  const queryUnit = url.searchParams.get("u") as LookupUnit | null;

  if (queryFrequency) frequency.value = queryFrequency;
  if (queryUnit && units.includes(queryUnit)) unit.value = queryUnit;

  if (queryFrequency) runLookup(false);
});
</script>

<template>
  <section class="lookup card card--topmargin">
    <div class="card-content">
      <h1>Vai es te drīkstu raidīt?</h1>
      <p class="lookup-intro">
        Ievadi frekvenci. Pārbaude parāda Latvijas MK noteikumu Nr. 257
        raidīšanas tiesības A/B/C kategorijām un IARU Region 1 ieteicamo
        lietojumu šajā frekvences punktā.
      </p>

      <form class="lookup-form" @submit.prevent="runLookup()">
        <label class="lookup-frequency">
          <span>Frekvence</span>
          <input
            v-model="frequency"
            type="text"
            inputmode="decimal"
            autocomplete="off"
            placeholder="145.500"
            aria-label="Frekvence"
          />
        </label>
        <label class="lookup-unit">
          <span>Mērvienība</span>
          <select v-model="unit" aria-label="Mērvienība">
            <option v-for="item in units" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </label>
        <button type="submit">Pārbaudīt</button>
      </form>

      <p class="sm lookup-hint">
        Piemērs: <button class="example" type="button" @click="frequency = '145.500'; unit = 'MHz'; runLookup()">145.500 MHz</button>.
        Komats un punkts ir pieņemami kā decimālatdalītāji.
      </p>

      <p v-if="error" class="lookup-error">{{ error }}</p>
    </div>

    <template v-if="result">
      <div class="card-content lookup-result-head">
        <h2>{{ displayFrequency }}</h2>
        <template v-if="result.band">
          <p>
            Josla: <strong>{{ result.band.name }}</strong>
            ·
            <a class="link" :href="`/band-${result.band.route}-all`">
              atvērt pilnu joslas plānu
            </a>
          </p>
        </template>
        <p v-else class="lookup-warning">
          Šī frekvence nav nevienā šajā vietnē aprakstītajā radioamatieru joslā.
        </p>
        <p class="sm">
          Robežas tiek vērtētas kā intervāli [no, līdz), lai kopīgā robežpunktā
          neatgrieztu divus blakus diapazonus. Praktiskā raidījumā visai
          izstarojuma joslai jāiekļaujas atļautajā diapazonā.
        </p>
      </div>

      <div class="card-content">
        <h2>Latvijas juridiskie noteikumi</h2>
        <p class="sm">
          Šī sadaļa nosaka raidīšanas tiesības. IARU rekomendācijas zemāk nav
          juridiska atļauja.
        </p>

        <div class="licence-grid">
          <article
            v-for="licenceClass in licenceClasses"
            :key="licenceClass"
            class="licence-result"
          >
            <h3>{{ licenceClass }} kategorija</h3>

            <p v-if="matchesForClass(licenceClass).length === 0" class="not-allowed">
              Nav atrasts MK Nr. 257 noteikums, kas šajā frekvencē piešķirtu
              raidīšanas tiesības šai kategorijai.
            </p>

            <div
              v-for="(match, index) in matchesForClass(licenceClass)"
              :key="match.rule.id"
              class="legal-match"
            >
              <p class="legal-status">
                <strong>Atļauts</strong>
                <span v-if="index > 0"> · papildu īpašais noteikums</span>
              </p>
              <p>
                <strong>{{ match.rule.allocation }}</strong>
                · {{ match.rule.power.sourceText }}
              </p>
              <p v-if="match.rule.maxBandwidthHz" class="sm">
                Maksimālais joslas platums: {{ match.rule.maxBandwidthHz }} Hz.
              </p>
              <p v-if="match.rule.allowedModes?.length" class="sm">
                Atļautie darba veidi: {{ match.rule.allowedModes.join(", ") }}.
              </p>
              <p v-if="match.rule.emissionClasses?.length" class="sm">
                Atļautās izstarojuma klases:
                {{ match.rule.emissionClasses.join(", ") }}.
              </p>
              <p v-for="condition in match.conditions" :key="condition" class="sm">
                {{ condition }}
              </p>
              <div v-if="match.glossary.length" class="glossary sm">
                <div v-for="entry in match.glossary" :key="entry.id">
                  <strong>{{ entry.term }}</strong> — {{ entry.short }}.
                </div>
              </div>
              <p class="source-ref sm">{{ match.rule.sourceReference }}</p>
            </div>
          </article>
        </div>

        <p v-if="sourceForId('mk257')" class="sm source-line">
          Avots:
          <a
            class="link"
            :href="sourceForId('mk257')?.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ sourceForId("mk257")?.title }}
          </a>
          · pārbaudīts {{ sourceForId("mk257")?.verifiedOn }}.
        </p>
      </div>

      <div class="card-content">
        <h2>IARU Region 1 rekomendācija</h2>

        <p v-if="result.iaru.length === 0" class="sm">
          Šim frekvences punktam kanoniskajā IARU datu slānī nav atsevišķa
          segmenta.
        </p>

        <div v-for="segment in result.iaru" :key="segment.id" class="iaru-match">
          <p><strong>{{ segment.modes.join(", ") }}</strong></p>
          <p v-if="segment.maxBandwidthHz" class="sm">
            Maksimālais joslas platums: {{ segment.maxBandwidthHz }} Hz.
          </p>
          <p v-if="segment.usage?.length" class="sm">
            Lietojums: {{ segment.usage.join("; ") }}.
          </p>
          <p v-for="note in segment.notes ?? []" :key="note" class="sm">
            {{ note }}
          </p>
          <p class="source-ref sm">{{ segment.sourceReference }}</p>
        </div>

        <div v-if="result.activityMarkers.length" class="activity-markers">
          <h3>Aktivitātes marķieris</h3>
          <p v-for="marker in result.activityMarkers" :key="marker.id">
            {{ marker.name }}
          </p>
        </div>

        <p v-for="source in iaruSources" :key="source.id" class="sm source-line">
          Avots:
          <a class="link" :href="source.url" target="_blank" rel="noopener noreferrer">
            {{ source.title }}
          </a>
          <span v-if="source.revision"> · {{ source.revision }}</span>
          · pārbaudīts {{ source.verifiedOn }}.
        </p>
      </div>
    </template>
  </section>
</template>

<style scoped>
.lookup {
  margin-bottom: 24px;
}

.lookup-intro {
  max-width: 780px;
}

.lookup-form {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 10px;
  margin-top: 18px;
}

.lookup-form label span {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
}

.lookup-frequency {
  flex: 1 1 220px;
}

.lookup-unit {
  flex: 0 0 110px;
}

.lookup-form input,
.lookup-form select,
.lookup-form button {
  box-sizing: border-box;
  min-height: 42px;
  border: 1px solid #aaa;
  border-radius: 3px;
  padding: 8px 10px;
  background: #fff;
  color: #222;
  font: inherit;
}

.lookup-form input,
.lookup-form select {
  width: 100%;
}

.lookup-form button {
  border-color: #333;
  background: #333;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

.lookup-hint {
  margin-bottom: 0;
}

.example {
  border: 0;
  padding: 0;
  background: none;
  color: #039be5;
  font: inherit;
  cursor: pointer;
}

.lookup-error,
.lookup-warning,
.not-allowed {
  padding: 10px 12px;
  border-left: 4px solid #c62828;
  background: #ffebee;
}

.lookup-result-head h2 {
  margin-bottom: 6px;
}

.licence-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.licence-result {
  min-width: 0;
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  padding: 12px;
}

.licence-result h3,
.activity-markers h3 {
  margin: 0 0 10px;
  font-size: 18px;
}

.legal-match + .legal-match,
.iaru-match + .iaru-match {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #d6d6d6;
}

.legal-match p,
.iaru-match p {
  margin: 5px 0;
}

.legal-status {
  color: #1b5e20;
}

.glossary {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #ccc;
}

.source-ref {
  margin-top: 8px !important;
  color: #666;
}

.source-line {
  margin-bottom: 0;
}

.activity-markers {
  margin-top: 16px;
  padding: 10px 12px;
  background: #f0f0f0;
}

@media (max-width: 767px) {
  .licence-grid {
    grid-template-columns: 1fr;
  }

  .lookup-unit {
    flex: 1 1 100px;
  }

  .lookup-form button {
    width: 100%;
  }
}
</style>
