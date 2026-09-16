<script setup lang="ts">
import BandPicture from "./BandPicture.vue";
import type { Band } from "../bandplan";
import { computed } from "vue";
import { getBandVisualModel } from "../data/visualization";

const props = defineProps<{
  band: Band;
  priv: string;
  clickable?: boolean;
  width?: number;
  compact?: boolean;
  class?: string;
  highlight?: { from: number; to: number; fromLabel: string; toLabel: string };
  marker?: { freq: number; label: string };
}>();

const visual = computed(() => getBandVisualModel(props.band, props.priv));
const compactMode = computed(
  () => props.compact ?? (props.width ?? 580) <= 240,
);
</script>

<template>
  <div
    :class="[
      class,
      compactMode ? 'band-card-content--compact' : 'band-card-content--full',
    ]"
    class="card-content card-content--nobottom band-card-content"
  >
    <h2 class="band-card-title">{{ band.name }}</h2>
    <div
      class="band-picture-wrap"
      :class="compactMode ? 'band-picture-wrap--compact' : 'band-picture-wrap--full'"
    >
      <BandPicture
        v-for="row in visual.rows"
        :key="row.name"
        :row="row"
        :from="visual.from"
        :to="visual.to"
        :units="visual.units"
        :show-name="priv == 'all'"
        :window-width="width"
        :compact="compactMode"
        :highlight="highlight"
        :marker="marker"
      />
    </div>
  </div>
</template>

<style scoped>
.band-card-content {
  box-sizing: border-box;
}

.band-card-content--compact {
  min-height: 190px;
}

.band-card-content--full {
  min-height: 170px;
}

.band-card-title {
  margin-bottom: 14px;
  font-size: 26px;
  line-height: 1.15;
}

.band-picture-wrap {
  width: 100%;
}

.band-picture-wrap--compact {
  min-height: 105px;
}

.band-picture-wrap--full {
  min-height: 125px;
}

@media (max-width: 575px) {
  .band-card-content--compact {
    min-height: 180px;
  }

  .band-card-title {
    font-size: 25px;
  }
}
</style>
