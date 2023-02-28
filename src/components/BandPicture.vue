<script setup lang="ts">
import type { BandPrivilege } from "../bandplan";

const props = defineProps<{
  privilege: BandPrivilege;
  from: string;
  to: string;
  units: string;
  showName: boolean;
  windowWidth?: number;
}>();

const windowWidth = props.windowWidth || 580;
const bandwidth = +props.to - +props.from;
const width = windowWidth - (props.showName ? 20 : 0);
</script>

<template>
  <svg
    :view-box.camel="'-0.5 -0.5 ' + (windowWidth + 0.5) + ' 40.5'"
    width="100%"
    class="bandprivilege"
  >
    <text v-if="showName" :x="width + 5" y="17">{{ privilege.name }}</text>

    <rect y="8" height="12" x="0.25" :width="width" class="grey" />
    <text x="2" y="6">{{ from }}</text>
    <text :x="width - 2" y="6" text-anchor="end">{{ to }} {{ units }}</text>

    <g v-for="(slice, index) in privilege.slices" :key="index" class="slice">
      <rect
        :y="slice.show == 'bottom' ? 14 : 8"
        :height="slice.show == 'bottom' ? 6 : 12"
        :x="((+slice.from - +from) / bandwidth) * width + 0.25"
        :width="((+slice.to - +slice.from) / bandwidth) * width"
        :class="slice.mode"
      />
      <text
        v-if="slice.text"
        class="bandmode"
        :class="slice.mode"
        :y="slice.show == 'bottom' ? 19 : 13"
        :x="((+slice.from - +from) / bandwidth) * width + 1.25"
      >
        {{ slice.text.toUpperCase() }}
      </text>
      <line
        :y1="slice.show == 'bottom' ? 14 : 8"
        :y2="slice.show == 'bottom' ? 14 : 8"
        :x1="((+slice.from - +from) / bandwidth) * width"
        :x2="((+slice.to - +from) / bandwidth) * width"
      />
      <line
        y1="20"
        y2="20"
        :x1="((+slice.from - +from) / bandwidth) * width"
        :x2="((+slice.to - +from) / bandwidth) * width"
      />
      <line
        v-if="typeof slice.startText !== 'undefined'"
        :y1="slice.show == 'bottom' ? 14 : 8"
        :y2="20 + Math.abs(slice.startText) * 8"
        :x1="((+slice.from - +from) / bandwidth) * width"
        :x2="((+slice.from - +from) / bandwidth) * width"
      />
      <text
        v-if="typeof slice.startText !== 'undefined' && slice.startText != 0"
        :x="
          ((+slice.from - +from) / bandwidth) * width +
          (slice.startText < 0 ? -2 : 2)
        "
        :y="20 + Math.abs(slice.startText) * 8"
        :text-anchor="slice.startText < 0 ? 'end' : 'start'"
      >
        {{ slice.from }}
      </text>

      <line
        v-if="typeof slice.endText !== 'undefined'"
        :y1="slice.show == 'bottom' ? 14 : 8"
        :y2="20 + Math.abs(slice.endText) * 8"
        :x1="((+slice.to - +from) / bandwidth) * width"
        :x2="((+slice.to - +from) / bandwidth) * width"
      />
      <text
        v-if="typeof slice.endText !== 'undefined' && slice.endText != 0"
        :x="
          ((+slice.to - +from) / bandwidth) * width + (slice.endText < 0 ? -2 : 2)
        "
        :y="20 + Math.abs(slice.endText) * 8"
        :text-anchor="slice.endText < 0 ? 'end' : 'start'"
      >
        {{ slice.to }}
      </text>
    </g>

    <line y1="0" y2="20" x1="0" x2="0" />
    <line y1="0" y2="20" :x1="width" :x2="width" />
  </svg>
</template>

<style is:global>
.bandprivilege text {
  fill: #222;
  font: 8px sans-serif;
}
.bandprivilege line {
  stroke: #444;
  stroke-width: 0.5px;
}
.bandprivilege .slice text {
  fill: #222;
}
.bandprivilege .bandmode {
  font-size: 6px;
  font-weight: bold;
}
.bandprivilege .yellow {
  fill: #fff9c4;
}
.bandprivilege .bandmode.yellow {
  fill: #fbc02d;
}
.bandprivilege .orange {
  fill: #ffe0b2;
}
.bandprivilege .bandmode.orange {
  fill: #ffa726;
}
.bandprivilege .blue {
  fill: #b3e5fc;
}
.bandprivilege .bandmode.blue {
  fill: #29b6f6;
}
.bandprivilege .red {
  fill: #ef5350;
}
.bandprivilege .bandmode.red {
  fill: #d32f2f;
}
.bandprivilege .green {
  fill: #c5e1a5;
}
.bandprivilege .bandmode.green {
  fill: #8bc34a;
}
.bandprivilege .purple {
  fill: #e1bee7;
}
.bandprivilege .bandmode.purple {
  fill: #ab47bc;
}
.bandprivilege .grey {
  fill: #eeeeee;
}
.bandprivilege .bandmode.grey {
  fill: #9e9e9e;
}
</style>
