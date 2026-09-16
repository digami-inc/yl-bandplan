<script setup lang="ts">
import type { BandVisualRow, BandVisualSlice } from "../data/visualization";
import { computed } from "vue";

const props = defineProps<{
  row: BandVisualRow;
  from: number;
  to: number;
  units: string;
  showName: boolean;
  windowWidth?: number;
  compact?: boolean;
  highlight?: { from: number; to: number; fromLabel: string; toLabel: string };
  marker?: { freq: number; label: string };
}>();

const windowWidth = props.windowWidth || 580;
const compact = props.compact ?? windowWidth <= 240;
const geometry = compact
  ? {
      viewHeight: 56,
      nameGutter: 24,
      barY: 14,
      barHeight: 18,
      bottomLaneY: 23,
      bottomLaneHeight: 9,
      topLabelY: 10,
      mainTextY: 26,
      bottomTextY: 31,
      rowNameY: 27,
      axisBottomY: 32,
      annotationY: 45,
      annotationLowerY: 53,
      rowGap: 8,
      labelWidth: 48,
    }
  : {
      viewHeight: 62,
      nameGutter: 30,
      barY: 15,
      barHeight: 20,
      bottomLaneY: 25,
      bottomLaneHeight: 10,
      topLabelY: 11,
      mainTextY: 29,
      bottomTextY: 34,
      rowNameY: 30,
      axisBottomY: 35,
      annotationY: 50,
      annotationLowerY: 58,
      rowGap: 10,
      labelWidth: 52,
    };

const bandwidth = props.to - props.from;
const width = windowWidth - (props.showName ? geometry.nameGutter : 0);

const toPixel = (freq: number) => ((freq - props.from) / bandwidth) * width + 0.25;
const slicePixelWidth = (slice: BandVisualSlice) =>
  ((slice.to - slice.from) / bandwidth) * width;

function shortSliceLabel(slice: BandVisualSlice): string {
  const label = (slice.text ?? "").toUpperCase();

  if (slice.kind === "legal-restriction" && label.includes("/")) {
    return `${label.split("/")[0]}/…`;
  }

  const shortLabels: Record<string, string> = {
    BEACON: "BCN",
    GUARD: "G",
    DIGI: "D",
    ALL: "A",
    REP: "R",
    SAT: "S",
  };

  return shortLabels[label] ?? (label.length > 6 ? `${label.slice(0, 5)}…` : label);
}

function estimatedTextWidth(text: string): number {
  const characterWidth = compact ? 4.6 : 4.8;
  return Math.max(10, text.length * characterWidth + 3);
}

function displaySliceText(slice: BandVisualSlice): string | undefined {
  if (!slice.text) return undefined;

  const full = slice.text.toUpperCase();
  const available = slicePixelWidth(slice);

  if (available >= estimatedTextWidth(full)) return full;

  const short = shortSliceLabel(slice);
  if (available >= estimatedTextWidth(short)) return short;

  return undefined;
}

const hlStart = computed(() =>
  props.highlight ? Math.max(0.25, toPixel(props.highlight.from)) : 0.25,
);
const hlEnd = computed(() =>
  props.highlight
    ? Math.min(width + 0.25, toPixel(props.highlight.to))
    : width + 0.25,
);

const markerX = computed(() =>
  props.marker
    ? Math.max(0.25, Math.min(width + 0.25, toPixel(props.marker.freq)))
    : 0,
);

const selectionWidth = computed(() => hlEnd.value - hlStart.value);
const startLabelInside = computed(
  () =>
    selectionWidth.value >= geometry.labelWidth * 2 ||
    hlStart.value - 0.25 < geometry.labelWidth,
);
const endLabelInside = computed(
  () =>
    selectionWidth.value >= geometry.labelWidth * 2 ||
    width + 0.25 - hlEnd.value < geometry.labelWidth,
);
const endLabelLower = computed(
  () => endLabelInside.value && selectionWidth.value < geometry.labelWidth,
);
</script>

<template>
  <svg
    :view-box.camel="'-0.5 -0.5 ' + (windowWidth + 0.5) + ' ' + (geometry.viewHeight + 0.5)"
    width="100%"
    class="bandprivilege"
    :class="compact ? 'bandprivilege--compact' : 'bandprivilege--full'"
    :style="{ marginBottom: `${geometry.rowGap}px` }"
  >
    <text v-if="showName" :x="width + 5" :y="geometry.rowNameY">{{ row.name }}</text>

    <rect
      :y="geometry.barY"
      :height="geometry.barHeight"
      x="0.25"
      :width="width"
      class="grey"
    />
    <rect
      v-for="(range, index) in row.legalRanges"
      :key="`legal-${index}`"
      :y="geometry.barY"
      :height="geometry.barHeight"
      :x="toPixel(range.from)"
      :width="Math.max(0, toPixel(range.to) - toPixel(range.from))"
      fill="#fff"
    />

    <text x="2" :y="geometry.topLabelY">{{ from }}</text>
    <text :x="width - 2" :y="geometry.topLabelY" text-anchor="end">
      {{ to }} {{ units }}
    </text>

    <g v-for="slice in row.slices" :key="slice.id" class="slice">
      <title>{{ slice.text?.toUpperCase() }}</title>
      <rect
        :y="slice.lane === 'bottom' ? geometry.bottomLaneY : geometry.barY"
        :height="slice.lane === 'bottom' ? geometry.bottomLaneHeight : geometry.barHeight"
        :x="toPixel(slice.from)"
        :width="slicePixelWidth(slice)"
        :class="slice.mode"
        :fill-opacity="slice.kind === 'legal-restriction' ? 0.86 : 1"
      />
      <text
        v-if="displaySliceText(slice)"
        class="bandmode"
        :class="slice.mode"
        :y="slice.lane === 'bottom' ? geometry.bottomTextY : geometry.mainTextY"
        :x="toPixel(slice.from) + 1.25"
      >
        {{ displaySliceText(slice) }}
      </text>
      <line
        :y1="slice.lane === 'bottom' ? geometry.bottomLaneY : geometry.barY"
        :y2="slice.lane === 'bottom' ? geometry.bottomLaneY : geometry.barY"
        :x1="toPixel(slice.from)"
        :x2="toPixel(slice.to)"
      />
      <line
        :y1="geometry.axisBottomY"
        :y2="geometry.axisBottomY"
        :x1="toPixel(slice.from)"
        :x2="toPixel(slice.to)"
      />
    </g>

    <line y1="0" :y2="geometry.axisBottomY" x1="0" x2="0" />
    <line y1="0" :y2="geometry.axisBottomY" :x1="width" :x2="width" />

    <template v-if="highlight">
      <rect
        :y="geometry.barY"
        :height="geometry.barHeight"
        x="0.25"
        :width="hlStart - 0.25"
        class="highlight-dim"
      />
      <rect
        :y="geometry.barY"
        :height="geometry.barHeight"
        :x="hlEnd"
        :width="width + 0.25 - hlEnd"
        class="highlight-dim"
      />
      <line :y1="geometry.barY" :y2="geometry.annotationY" :x1="hlStart" :x2="hlStart" />
      <line
        :y1="geometry.barY"
        :y2="endLabelLower ? geometry.annotationLowerY : geometry.annotationY"
        :x1="hlEnd"
        :x2="hlEnd"
      />
      <text
        :y="geometry.annotationY"
        :x="startLabelInside ? hlStart + 2 : hlStart - 2"
        :text-anchor="startLabelInside ? 'start' : 'end'"
      >
        {{ highlight.fromLabel }}
      </text>
      <text
        :y="endLabelLower ? geometry.annotationLowerY : geometry.annotationY"
        :x="endLabelInside ? hlEnd - 2 : hlEnd + 2"
        :text-anchor="endLabelInside ? 'end' : 'start'"
      >
        {{ highlight.toLabel }} {{ units }}
      </text>
    </template>

    <template v-if="marker">
      <line
        class="marker-line"
        y1="0"
        :y2="geometry.annotationY"
        :x1="markerX"
        :x2="markerX"
      />
      <text
        :y="geometry.annotationY"
        :x="markerX > width / 2 ? markerX - 2 : markerX + 2"
        :text-anchor="markerX > width / 2 ? 'end' : 'start'"
      >
        {{ marker.label }} {{ units }}
      </text>
    </template>
  </svg>
</template>

<style scoped>
.bandprivilege {
  display: block;
  overflow: visible;
}

.bandprivilege.bandprivilege--compact text,
.bandprivilege.bandprivilege--full text {
  font-family: sans-serif;
  font-size: 9px;
}

.bandprivilege.bandprivilege--compact .bandmode,
.bandprivilege.bandprivilege--full .bandmode {
  font-size: 7.5px;
  font-weight: 700;
}
</style>
