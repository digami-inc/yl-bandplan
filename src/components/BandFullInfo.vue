<script setup lang="ts">
import type { Band } from "../bandplan";
import BandCard from "./BandCard.vue";
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useClickOutside } from '../composables/useClickOutside';

const props = defineProps<{
  band: Band;
  priv: string;
}>();

const rules = props.band.rules.filter(
  (r) => props.priv == "all" || r.class == props.priv.toUpperCase()
);

const containerRef = ref<HTMLElement | null>(null);

const hoveredSlice = ref<{ from: string; to: string } | null>(null);
const selectedSlice = ref<{ from: string; to: string } | null>(null);
const hoveredMarker = ref<string | null>(null);
const selectedMarker = ref<string | null>(null);

function iaruToBandUnits(value: string, iaruUnits: string, bandUnits: string): number {
  const scale: Record<string, number> = { hz: 1, khz: 1e3, mhz: 1e6, ghz: 1e9 };
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
  const lastDash = hash.lastIndexOf('-');
  if (lastDash > 0) {
    selectedSlice.value = { from: hash.slice(0, lastDash), to: hash.slice(lastDash + 1) };
  } else {
    selectedMarker.value = hash;
  }
}

onMounted(() => { readHash(); window.addEventListener('hashchange', readHash); });
onUnmounted(() => window.removeEventListener('hashchange', readHash));

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
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

const effectiveHighlight = computed(() => {
  if (hoveredMarker.value) return undefined;
  const slice = hoveredSlice.value ?? selectedSlice.value;
  if (!slice) return undefined;
  return {
    from: iaruToBandUnits(slice.from, props.band.iaruUnits, props.band.units),
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
    <div class="card card--topmargin" v-if="rules.length > 0">
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

      <div
        class="card-content"
        :class="{ 'card-content--nobottom': !band.iaruNotes }"
      >
        <h2>IARU {{ band.name }} joslas plāns</h2>
        <div class="table-container">
          <div class="table-row header">
            <div>{{ band.iaruUnits }}</div>
            <div class="narrow">Bandwidth</div>
            <div class="wide">Description</div>
          </div>
          <div
            v-for="(slice, id) in band.iaru"
            :key="id"
            class="table-row iarucolor"
            :class="[slice.mode, { 'iaru-selected': selectedSlice?.from === slice.from && selectedSlice?.to === slice.to }]"
            @mouseenter="hoveredSlice = slice"
            @mouseleave="hoveredSlice = null"
            @click.stop="selectSlice(slice)"
          >
            <div>{{ slice.from }} - {{ slice.to }} {{ band.iaruUnits }}</div>
            <div class="narrow">
              <span v-if="slice.bw">{{ slice.bw }} Hz</span
              ><span v-else>-</span>
            </div>
            <div class="wide sm">
              {{ slice.desc }}
              <div v-if="slice.note">{{ slice.note }}</div>
            </div>
          </div>
        </div>
        <div v-if="band.iaruNotes">
          <p v-for="(note, id) in band.iaruNotes" :key="id" class="sm">
            {{ note }}
          </p>
        </div>
      </div>

      <div class="card-content" v-if="band.bookmarks">
        <h2>Grāmatzīmes</h2>
        <table>
          <tbody>
            <tr>
              <th>{{ band.units }}</th>
              <th>Description</th>
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
        <h2>MK Noteikumi Nr.257</h2>
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
            <div class="wide sm">Piezīmes</div>
          </div>

          <div v-for="(rule, id) in rules" :key="id" class="table-row">
            <div v-if="priv == 'all'" class="digit">{{ rule.class }}</div>
            <div>{{ rule.band }}</div>
            <div class="narrow">{{ rule.cat }}</div>
            <div class="narrow">{{ rule.pwr }}</div>
            <div class="wide sm">{{ rule.notes }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card card--topmargin" v-else>
      <a v-if="priv == 'all'" href="/" class="card-close">✕</a>
      <a v-else :href="`/priv-${priv}`" class="card-close">✕</a>
      <div class="card-content">
        <h2>{{ band.name }}</h2>
        <p>
          This band is not available for "{{ priv.toUpperCase() }}" staticons.
          <a :href="`/band-${band.route}-all`">
            Activate all privileges to view
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
