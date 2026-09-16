<script setup lang="ts">
import type { Band } from "../bandplan";
import BandCard from "./BandCard.vue";
import BandLegend from "./BandLegend.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useClickOutside } from "../composables/useClickOutside";
import { getIaruSourcesForBand } from "../data/iaru/presentation";
import { getIaruDisplayRowsForPrivilege } from "../data/iaru/licence-filter";
import {
  getLegalDisplayRows,
  getLegalSource,
} from "../data/lv/presentation";

const props = defineProps<{
  band: Band;
  priv: string;
}>();

const legalRows = getLegalDisplayRows(props.band, props.priv);
const legalSource = getLegalSource();
const iaruRows = getIaruDisplayRowsForPrivilege(props.band, props.priv);
const iaruSources = getIaruSourcesForBand(props.band);

const containerRef = ref<HTMLElement | null>(null);

const hoveredSlice = ref<{ from: string; to: string } | null>(null);
const selectedSlice = ref<{ from: string; to: string } | null>(null);
const hoveredMarker = ref<string | null>(null);
const selectedMarker = ref<string | null>(null);

function iaruToBandUnits(
  value: string,
  iaruUnits: string,
  bandUnits: string,
): number {
  const scale: Record<string, number> = {
    hz: 1,
    khz: 1e3,
    mhz: 1e6,
    ghz: 1e9,
  };
  const from = scale[iaruUnits.toLowerCase()] ?? 1;
  const to = scale[bandUnits.toLowerCase()] ?? 1;
  return +value * (from / to);
}

useClickOutside(containerRef, deselect);

function readHash() {
  const hash = window.location.hash.slice(1);
  selectedSlice.value = null;
  selectedMarker.value = null;
  if (!hash) return;
  const lastDash = hash.lastIndexOf("-");
  if (lastDash > 0) {
    selectedSlice.value = {
      from: hash.slice(0, lastDash),
      to: hash.slice(lastDash + 1),
    };
  } else {
    selectedMarker.value = hash;
  }
}

onMounted(() => {
  readHash();
  window.addEventListener("hashchange", readHash);
});
onUnmounted(() => window.removeEventListener("hashchange", readHash));

function selectSlice(slice: { from: string; to: string }) {
  selectedSlice.value = slice;
  selectedMarker.value = null;
  window.location.hash = `${slice.from}-${slice.to}`;
}

function selectMarker(freq: string) {
  selectedMarker.value = freq;
  selectedSlice.value = null;
  window.location.hash = freq;
}

function deselect() {
  selectedSlice.value = null;
  selectedMarker.value = null;
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search,
  );
}

const effectiveHighlight = computed(() => {
  if (hoveredMarker.value) return undefined;
  const slice = hoveredSlice.value ?? selectedSlice.value;
  if (!slice) return undefined;
  return {
    from: iaruToBandUnits(
      slice.from,
      props.band.iaruUnits,
      props.band.units,
    ),
    to: iaruToBandUnits(slice.to, props.band.iaruUnits, props.band.units),
    fromLabel: slice.from,
    toLabel: slice.to,
  };
});

const effectiveMarker = computed(() => {
  if (hoveredSlice.value) return undefined;
  const freq = hoveredMarker.value ?? selectedMarker.value;
  return freq ? { freq: +freq, label: freq } : undefined;
});
</script>

<template>
  <div ref="containerRef" @click="deselect">
    <div class="card card--topmargin" v-if="legalRows.length > 0">
      <a v-if="priv == 'all'" href="/" class="card-close">✕</a>
      <a v-else :href="`/priv-${priv}`" class="card-close">✕</a>
      <BandCard
        :band="band"
        :priv="priv"
        :clickable="false"
        :width="580"
        :highlight="effectiveHighlight"
        :marker="effectiveMarker"
        class="hide block-md"
      />
      <BandCard
        :band="band"
        :priv="priv"
        :clickable="false"
        :width="180"
        :highlight="effectiveHighlight"
        :marker="effectiveMarker"
        class="hide-md"
      />

      <div class="card-content">
        <h2>IARU Region 1 — {{ band.name }} joslas plāns</h2>
        <BandLegend />
        <p v-if="priv != 'all'" class="sm">
          Rādīti tikai {{ priv.toUpperCase() }} kategorijas atļautajam darbam atbilstošie IARU segmenti.
          Juridiskie nosacījumi ir MK noteikumu tabulā zemāk.
        </p>
        <div class="table-container">
          <div class="table-row header">
            <div>{{ band.iaruUnits }}</div>
            <div class="narrow">Maks. joslas platums</div>
            <div class="wide">Ieteicamais lietojums</div>
          </div>
          <div
            v-for="slice in iaruRows"
            :key="slice.id"
            class="table-row iarucolor"
            :class="[
              slice.colorClass,
              {
                'iaru-selected':
                  selectedSlice?.from === slice.from &&
                  selectedSlice?.to === slice.to,
              },
            ]"
            @mouseenter="hoveredSlice = slice"
            @mouseleave="hoveredSlice = null"
            @click.stop="selectSlice(slice)"
          >
            <div>{{ slice.from }} - {{ slice.to }} {{ band.iaruUnits }}</div>
            <div class="narrow">
              <span v-if="slice.bandwidthHz">{{ slice.bandwidthHz }} Hz</span>
              <span v-else>—</span>
            </div>
            <div class="wide sm">
              {{ slice.description }}
              <div v-if="slice.note">{{ slice.note }}</div>
            </div>
          </div>
        </div>

        <p v-for="source in iaruSources" :key="source.id" class="sm">
          Avots:
          <a :href="source.url" target="_blank" rel="noopener noreferrer">
            {{ source.title }}
          </a>
          <span v-if="source.revision"> · {{ source.revision }}</span>
          · pārbaudīts {{ source.verifiedOn }}.
        </p>
      </div>

      <div class="card-content" v-if="band.bookmarks">
        <h2>Grāmatzīmes</h2>
        <table>
          <tbody>
            <tr>
              <th>{{ band.units }}</th>
              <th>Apraksts</th>
            </tr>
            <tr
              v-for="(mark, id) in band.bookmarks"
              :key="id"
              style="cursor: pointer"
              @mouseenter="hoveredMarker = mark.pos"
              @mouseleave="hoveredMarker = null"
              @click.stop="selectMarker(mark.pos)"
            >
              <td>{{ mark.pos }}</td>
              <td>{{ mark.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-content card-content--nobottom">
        <h2>MK noteikumi Nr. 257</h2>
        <p class="sm">
          Radioamatieru eksaminācijas apliecību un radioamatieru radiostacijas
          atļauju saņemšanas kārtība, kā arī radioamatieru radiostaciju
          lietošanas kārtība
        </p>
        <div class="table-container">
          <div class="table-row header">
            <div v-if="priv == 'all'" class="digit"></div>
            <div>Radiofrekvenču josla</div>
            <div class="narrow">Sadalījuma kategorija</div>
            <div class="narrow">Jauda</div>
            <div class="wide sm">Nosacījumi un skaidrojumi</div>
          </div>

          <div v-for="rule in legalRows" :key="rule.id" class="table-row">
            <div v-if="priv == 'all'" class="digit">{{ rule.licenceClass }}</div>
            <div>{{ rule.from }} - {{ rule.to }} {{ rule.unit }}</div>
            <div class="narrow">{{ rule.allocation }}</div>
            <div class="narrow">{{ rule.power }}</div>
            <div class="wide sm">
              <div v-for="note in rule.notes" :key="note">{{ note }}</div>
              <div v-if="rule.glossary.length" class="sm">
                <strong>Apzīmējumi:</strong>
                <span v-for="(entry, index) in rule.glossary" :key="entry.id">
                  <span v-if="index">; </span>{{ entry.term }} — {{ entry.short }}
                </span>
              </div>
              <div class="sm">{{ rule.sourceReference }}</div>
            </div>
          </div>
        </div>

        <p class="sm">
          Avots:
          <a :href="legalSource.url" target="_blank" rel="noopener noreferrer">
            {{ legalSource.title }}
          </a>
          <span v-if="legalSource.revision"> · {{ legalSource.revision }}</span>
          · pārbaudīts {{ legalSource.verifiedOn }}.
        </p>
      </div>
    </div>
    <div class="card card--topmargin" v-else>
      <a v-if="priv == 'all'" href="/" class="card-close">✕</a>
      <a v-else :href="`/priv-${priv}`" class="card-close">✕</a>
      <div class="card-content">
        <h2>{{ band.name }}</h2>
        <p>
          Šī josla nav pieejama {{ priv.toUpperCase() }} kategorijas stacijām.
          <a :href="`/band-${band.route}-all`">
            Rādīt visas kategorijas
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
