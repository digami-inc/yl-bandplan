<script setup lang="ts">
import type { BandVisualRow } from "../data/visualization";
import { computed } from "vue";

const props = defineProps<{
  row: BandVisualRow;
  from: number;
  to: number;
  units: string;
  showName: boolean;
  windowWidth?: number;
  modeActive?: boolean;
  modeRanges?: { from: number; to: number }[];
  highlight?: { from: number; to: number; fromLabel: string; toLabel: string };
  marker?: { freq: number; label: string };
}>();

const windowWidth = props.windowWidth || 580;
const bandwidth = props.to - props.from;
const width = windowWidth - (props.showName ? 20 : 0);

const toPixel = (freq: number) =>
  ((freq - props.from) / bandwidth) * width + 0.25;

function sliceMatchesMode(slice: { from: number; to: number }): boolean {
  if (!props.modeActive) return true;
  return (props.modeRanges ?? []).some(
    (range) => slice.from < range.to && slice.to > range.from,
  );
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

const LABEL_WIDTH = 40;
const selectionWidth = computed(() => hlEnd.value - hlStart.value);
const startLabelInside = computed(
  () => selectionWidth.value >= LABEL_WIDTH * 2 || hlStart.value - 0.25 < LABEL_WIDTH,
);
const endLabelInside = computed(
  () =>
    selectionWidth.value >= LABEL_WIDTH * 2 ||
    width + 0.25 - hlEnd.value < LABEL_WIDTH,
);
const endLabelLower = computed(
  () => endLabelInside.value && selectionWidth.value < LABEL_WIDTH,
);
</script>

<template>
  <svg
    :view-box.camel="'-0.5 -0.5 ' + (windowWidth + 0.5) + ' 40.5'"
    width="100%"
    class="bandprivilege"
  >
    <text v-if="showName" :x="width + 5" y="17">{{ row.name }}</text>

    <rect y="8" height="12" x="0.25" :width="width" class="grey" />
    <rect
      v-for="(range, index) in row.legalRanges"
      :key="`legal-${index}`"
      y="8"
      height="12"
      :x="toPixel(range.from)"
      :width="Math.max(0, toPixel(range.to) - toPixel(range.from))"
      fill="#fff"
    />

    <text x="2" y="6">{{ from }}</text>
    <text :x="width - 2" y="6" text-anchor="end">{{ to }} {{ units }}</text>

    <g v-for="slice in row.slices" :key="slice.id" class="slice">
      <title>{{ slice.text?.toUpperCase() }}</title>
      <rect
        :y="slice.lane === 'bottom' ? 14 : 8"
        :height="slice.lane === 'bottom' ? 6 : 12"
        :x="toPixel(slice.from)"
        :width="Math.max(0, toPixel(slice.to) - toPixel(slice.from))"
        :class="[
          slice.mode,
          { 'mode-dim': modeActive && !sliceMatchesMode(slice) },
        ]"
      />
      <text
        v-if="slice.text && (!modeActive || sliceMatchesMode(slice))"
        class="bandmode"
        :class="slice.mode"
        :y="slice.lane === 'bottom' ? 19 : 13"
        :x="toPixel(slice.from) + 1.25"
      >
        {{ slice.text.toUpperCase() }}
      </text>
      <line
        :y1="slice.lane === 'bottom' ? 14 : 8"
        :y2="slice.lane === 'bottom' ? 14 : 8"
        :x1="toPixel(slice.from) - 0.25"
        :x2="toPixel(slice.to) - 0.25"
      />
      <line
        y1="20"
        y2="20"
        :x1="toPixel(slice.from) - 0.25"
        :x2="toPixel(slice.to) - 0.25"
      />

      <line
        v-if="typeof slice.startText !== 'undefined' && !highlight && !marker && (!modeActive || sliceMatchesMode(slice))"
        :y1="slice.lane === 'bottom' ? 14 : 8"
        :y2="20 + Math.abs(slice.startText) * 8"
        :x1="toPixel(slice.from) - 0.25"
        :x2="toPixel(slice.from) - 0.25"
      />
      <text
        v-if="typeof slice.startText !== 'undefined' && slice.startText !== 0 && !highlight && !marker && (!modeActive || sliceMatchesMode(slice))"
        :x="toPixel(slice.from) - 0.25 + (slice.startText < 0 ? -2 : 2)"
        :y="20 + Math.abs(slice.startText) * 8"
        :text-anchor="slice.startText < 0 ? 'end' : 'start'"
      >
        {{ slice.startLabel ?? slice.from }}
      </text>

      <line
        v-if="typeof slice.endText !== 'undefined' && !highlight && !marker && (!modeActive || sliceMatchesMode(slice))"
        :y1="slice.lane === 'bottom' ? 14 : 8"
        :y2="20 + Math.abs(slice.endText) * 8"
        :x1="toPixel(slice.to) - 0.25"
        :x2="toPixel(slice.to) - 0.25"
      />
      <text
        v-if="typeof slice.endText !== 'undefined' && slice.endText !== 0 && !highlight && !marker && (!modeActive || sliceMatchesMode(slice))"
        :x="toPixel(slice.to) - 0.25 + (slice.endText < 0 ? -2 : 2)"
        :y="20 + Math.abs(slice.endText) * 8"
        :text-anchor="slice.endText < 0 ? 'end' : 'start'"
      >
        {{ slice.endLabel ?? slice.to }}
      </text>
    </g>

    <line y1="0" y2="20" x1="0" x2="0" />
    <line y1="0" y2="20" :x1="width" :x2="width" />

    <template v-if="highlight">
      <rect y="8" height="12" x="0.25" :width="hlStart - 0.25" class="highlight-dim" />
      <rect
        y="8"
        height="12"
        :x="hlEnd"
        :width="width + 0.25 - hlEnd"
        class="highlight-dim"
      />
      <line y1="8" y2="28" :x1="hlStart" :x2="hlStart" />
      <line y1="8" :y2="endLabelLower ? 36 : 28" :x1="hlEnd" :x2="hlEnd" />
      <text
        y="28"
        :x="startLabelInside ? hlStart + 2 : hlStart - 2"
        :text-anchor="startLabelInside ? 'start' : 'end'"
      >
        {{ highlight.fromLabel }}
      </text>
      <text
        :y="endLabelLower ? 36 : 28"
        :x="endLabelInside ? hlEnd - 2 : hlEnd + 2"
        :text-anchor="endLabelInside ? 'end' : 'start'"
      >
        {{ highlight.toLabel }} {{ units }}
      </text>
    </template>

    <template v-if="marker">
      <line class="marker-line" y1="0" y2="28" :x1="markerX" :x2="markerX" />
      <text
        y="28"
        :x="markerX > width / 2 ? markerX - 2 : markerX + 2"
        :text-anchor="markerX > width / 2 ? 'end' : 'start'"
      >
        {{ marker.label }} {{ units }}
      </text>
    </template>
  </svg>
</template>
