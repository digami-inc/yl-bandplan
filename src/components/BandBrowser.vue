<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { bands } from "../bandplan";
import BandCard from "./BandCard.vue";
import BandLegend from "./BandLegend.vue";
import {
  MODE_FILTERS,
  MODE_FILTER_LABELS,
  bandMatchesMode,
  isModeFilter,
  type ModeFilter,
} from "../data/mode-filter";

const props = defineProps<{
  priv: string;
}>();

const MODE_STORAGE_KEY = "yl-bandplan-mode";
const PRIV_STORAGE_KEY = "yl-bandplan-privilege";
const PRIVILEGES = ["all", "a", "b", "c"] as const;

const selectedMode = ref<ModeFilter>("all");

const filteredBands = computed(() =>
  bands.filter((band) => bandMatchesMode(band, props.priv, selectedMode.value)),
);

function isPrivilege(value: string | null | undefined): value is (typeof PRIVILEGES)[number] {
  return Boolean(value && PRIVILEGES.includes(value.toLowerCase() as (typeof PRIVILEGES)[number]));
}

function syncUrl(mode: ModeFilter) {
  const url = new URL(window.location.href);
  if (mode === "all") url.searchParams.delete("mode");
  else url.searchParams.set("mode", MODE_FILTER_LABELS[mode]);
  history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

function setMode(mode: ModeFilter) {
  selectedMode.value = mode;
  localStorage.setItem(MODE_STORAGE_KEY, mode);
  syncUrl(mode);
}

onMounted(() => {
  const url = new URL(window.location.href);
  const currentPriv = props.priv.toLowerCase();
  const storedPriv = localStorage.getItem(PRIV_STORAGE_KEY)?.toLowerCase();

  if (
    url.pathname === "/" &&
    currentPriv === "all" &&
    isPrivilege(storedPriv) &&
    storedPriv !== "all"
  ) {
    window.location.replace(`/priv-${storedPriv}${url.search}${url.hash}`);
    return;
  }

  if (isPrivilege(currentPriv)) {
    localStorage.setItem(PRIV_STORAGE_KEY, currentPriv);
  }

  const fromUrl = url.searchParams.get("mode")?.toLowerCase();
  const storedMode = localStorage.getItem(MODE_STORAGE_KEY)?.toLowerCase();

  if (isModeFilter(fromUrl)) selectedMode.value = fromUrl;
  else if (isModeFilter(storedMode)) selectedMode.value = storedMode;

  localStorage.setItem(MODE_STORAGE_KEY, selectedMode.value);
  syncUrl(selectedMode.value);
});
</script>

<template>
  <div>
    <BandLegend />

    <div class="mode-filter" aria-label="Darba veida filtrs">
      <span class="mode-filter__label">Režīms:</span>
      <div class="toolbar mode-filter__toolbar">
        <button
          v-for="mode in MODE_FILTERS"
          :key="mode"
          type="button"
          class="menu mode-filter__button"
          :class="{ active: selectedMode === mode }"
          @click="setMode(mode)"
        >
          {{ MODE_FILTER_LABELS[mode] }}
        </button>
      </div>
    </div>

    <div v-if="filteredBands.length" class="row row--grow-cards">
      <div v-for="band in filteredBands" :key="band.route" class="col">
        <a :href="`/band-${band.route}-${priv}`" class="card clickable">
          <BandCard :band="band" :priv="priv" :width="180" />
        </a>
      </div>
    </div>

    <div v-else class="filter-empty">
      Šai licences kategorijai izvēlētajā režīmā joslas netika atrastas.
    </div>
  </div>
</template>

<style scoped>
.mode-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0 0 16px;
}

.mode-filter__label {
  font-size: 14px;
}

.mode-filter__toolbar {
  margin: 0;
}

.mode-filter__button {
  appearance: none;
  border: 0;
  font: inherit;
  color: inherit;
}

.filter-empty {
  padding: 16px 0;
  color: #555;
}

@media (max-width: 575px) {
  .mode-filter {
    align-items: flex-start;
  }

  .mode-filter__toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }
}
</style>
