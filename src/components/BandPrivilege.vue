<template>
  <svg
    :view-box.camel="'-0.5 -0.5 ' + (windowWidth+0.5) + ' 40.5'"
    width="100%"
    class="bandprivilege"
  >
    <text v-if="showName" :x="width + 5" y="8">{{ privilege.name }}</text>
    <g v-for="(slice, index) in privilege.slices" :key="index" class="slice">
      <rect
        :y="0"
        :height="12"
        :x="(slice.from - from) / bandwidth * width + 0.25"
        :width="(slice.to - slice.from) / bandwidth * width"
        :class="slice.mode"
      />
      <line
        y1="0"
        y2="0"
        :x1="(slice.from - from) / bandwidth * width"
        :x2="(slice.to - from) / bandwidth * width"
      />
      <line
        y1="12"
        y2="12"
        :x1="(slice.from - from) / bandwidth * width"
        :x2="(slice.to - from) / bandwidth * width"
      />
      <line
        v-if="slice.startText !== null"
        y1="0"
        :y2="12 + Math.abs(slice.startText) * 8"
        :x1="(slice.from - from) / bandwidth * width"
        :x2="(slice.from - from) / bandwidth * width"
      />
      <text
        v-if="slice.startText"
        :x="(slice.from - from) / bandwidth * width + (slice.startText < 0 ? -2 : 2 )"
        :y="12 + Math.abs(slice.startText) * 8"
        :text-anchor="slice.startText < 0 ? 'end' : 'start'"
      >{{ slice.from }}</text>

      <line
        v-if="slice.endText !== null"
        y1="0"
        :y2="12 + Math.abs(slice.endText) * 8"
        :x1="(slice.to - from) / bandwidth * width"
        :x2="(slice.to - from) / bandwidth * width"
      />
      <text
        v-if="slice.endText"
        :x="(slice.to - from) / bandwidth * width + (slice.endText < 0 ? -2 : 2 )"
        :y="12 + Math.abs(slice.endText) * 8"
        :text-anchor="slice.endText < 0 ? 'end' : 'start'"
      >{{ slice.to + (index == privilege.slices.length - 1 ? ' ' + units : '') }}</text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'home',
  props: {
    'privilege': Object,
    'from': Number,
    'to': Number,
    'units': String,
    'show-name': Boolean,
    'large': Boolean
  },
  computed: {
    bandwidth () { return this.to - this.from },
    width () { return this.windowWidth - (this.showName ? 20 : 0) },
    windowWidth () { return this.large ? 580 : 180 }
  }
}
</script>

<style>
.bandprivilege text {
  fill: #222;
  font: 8px sans-serif;
}
.bandprivilege .slice line {
  stroke: #444;
  stroke-width: .5px;
}
.bandprivilege .slice text {
  fill: #222
}
.bandprivilege .yellow {
  fill: #fff9c4; /* yellow lighten 4 */
}
.bandprivilege .orange {
  fill: #ffe0b2; /* orange lighten 4 */
}
.bandprivilege .blue {
  fill: #b3e5fc; /* light blue lighten 4 */
}
.bandprivilege .red {
  fill: #ef5350; /* red lighten 1 */
}
.bandprivilege .green {
  fill: #c5e1a5; /* light green lighen 3 */
}
.bandprivilege .purple {
  fill: #e1bee7;
}
</style>
