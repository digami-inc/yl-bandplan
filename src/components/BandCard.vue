<script setup lang="ts">
import BandPicture from "./BandPicture.vue";
import type { Band } from "../bandplan";
import { computed } from "vue";
import { getBandVisualModel } from "../data/visualization";
import { getModeVisualRanges, type ModeFilter } from "../data/mode-filter";

const props = defineProps<{
  band: Band;
  priv: string;
  clickable?: boolean;
  width?: number;
  class?: string;
  mode?: ModeFilter;
  highlight?: { from: number; to: number; fromLabel: string; toLabel: string };
  marker?: { freq: number; label: string };
}>();

const visual = computed(() => getBandVisualModel(props.band, props.priv));
const modeActive = computed(() => Boolean(props.mode && props.mode !== "all"));
const modeRanges = computed(() =>
  props.mode ? getModeVisualRanges(props.band, props.priv, props.mode) : [],
);
</script>

<template>
  <div :class="props.class" class="card-content card-content--nobottom">
    <h2>{{ band.name }}</h2>
    <BandPicture
      v-for="row in visual.rows"
      :key="row.name"
      :row="row"
      :from="visual.from"
      :to="visual.to"
      :units="visual.units"
      :show-name="priv == 'all'"
      :window-width="width"
      :mode-active="modeActive"
      :mode-ranges="modeRanges"
      :highlight="highlight"
      :marker="marker"
    />
  </div>
</template>
