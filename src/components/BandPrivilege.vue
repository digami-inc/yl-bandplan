<template>
  <svg
    :view-box.camel="'-0.5 -0.5 ' + (windowWidth+0.5) + ' 40.5'"
    ref="picture"
    width="100%"
    class="bandprivilege"
  >
    <text v-if="showName" :x="width + 5" y="17">{{ privilege.name }}</text>

    <rect y="8" height="12" x="0.25" :width="width" class="grey" />
    <text x="2" y="6">{{ from }}</text>
    <text :x="width-2" y="6" text-anchor="end">{{ to }} {{ units }}</text>

    <g v-for="(slice, index) in privilege.slices" :key="index" class="slice">
      <rect
        :y="slice.show == 'bottom' ? 14 : 8"
        :height="slice.show == 'bottom' ? 6 : 12"
        :x="(slice.from - from) / bandwidth * width + 0.25"
        :width="(slice.to - slice.from) / bandwidth * width"
        :class="slice.mode"
      />
      <text v-if="slice.mode != 'block'" class="bandmode" :class="slice.mode" :y="slice.show == 'bottom' ? 19 : 13" :x="(slice.from -  from) / bandwidth * width + 1.250">
      {{ slice.mode.toUpperCase() }}
      </text>
      <line
        :y1="slice.show == 'bottom' ? 14 : 8"
        :y2="slice.show == 'bottom' ? 14 : 8"
        :x1="(slice.from - from) / bandwidth * width"
        :x2="(slice.to - from) / bandwidth * width"
      />
      <line
        y1="20"
        y2="20"
        :x1="(slice.from - from) / bandwidth * width"
        :x2="(slice.to - from) / bandwidth * width"
      />
      <line
        v-if="typeof(slice.startText) !== 'undefined'"
        :y1="slice.show == 'bottom' ? 14 : 8"
        :y2="20 + Math.abs(slice.startText) * 8"
        :x1="(slice.from - from) / bandwidth * width"
        :x2="(slice.from - from) / bandwidth * width"
      />
      <text
        v-if="typeof(slice.startText) !== 'undefined' && slice.startText != 0"
        :x="(slice.from - from) / bandwidth * width + (slice.startText < 0 ? -2 : 2 )"
        :y="20 + Math.abs(slice.startText) * 8"
        :text-anchor="slice.startText < 0 ? 'end' : 'start'"
      >{{ slice.from }}</text>

      <line
        v-if="typeof(slice.endText) !== 'undefined'"
        :y1="slice.show == 'bottom' ? 14 : 8"
        :y2="20 + Math.abs(slice.endText) * 8"
        :x1="(slice.to - from) / bandwidth * width"
        :x2="(slice.to - from) / bandwidth * width"
      />
      <text
        v-if="typeof(slice.endText) !== 'undefined' && slice.endText != 0"
        :x="(slice.to - from) / bandwidth * width + (slice.endText < 0 ? -2 : 2 )"
        :y="20 + Math.abs(slice.endText) * 8"
        :text-anchor="slice.endText < 0 ? 'end' : 'start'"
      >{{ slice.to }}</text>
    </g>

    <line y1="0" y2="20" x1="0" x2="0" />
    <line y1="0" y2="20" :x1="width" :x2="width" />
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
  },
  data: function () {
      return {
          windowWidth: 580
      }
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    bandwidth () { return this.to - this.from },
    width () { return this.windowWidth - (this.showName ? 20 : 0) },
  },
  methods: {
      handleResize () {
          this.windowWidth = this.$refs.picture.clientWidth / 2;
          if (this.windowWidth < 200) this.windowWidth = 200;
      }
  }
}
</script>

<style>
.bandprivilege text {
  fill: #222;
  font: 8px sans-serif;
}
.bandprivilege line {
  stroke: #444;
  stroke-width: .5px;
}
.bandprivilege .slice text {
  fill: #222
}
.bandprivilege .cw { fill: #fff9c4; }
.bandprivilege .digi { fill: #ffe0b2; }
.bandprivilege .lsb { fill: #b3e5fc; }
.bandprivilege .usb { fill: #b3e5fc; }
.bandprivilege .all { fill: #b3e5fc; }
.bandprivilege .fm { fill: #c5e1a5; }
.bandprivilege .sat { fill: #c5e1a5; }
.bandprivilege .in { fill: #c5e1a5; }
.bandprivilege .out { fill: #c5e1a5; }
.bandprivilege .grey { fill: #eeeeee; }
.bandprivilege .block { fill: #ef5350; }
.bandprivilege .bandmode { font-size: 6px; font-weight: bold; }
.bandprivilege .bandmode.cw { fill: #fdd835 }
.bandprivilege .bandmode.digi { fill: #ffa726 }
.bandprivilege .bandmode.lsb { fill: #039be5 }
.bandprivilege .bandmode.usb { fill: #039be5 }
.bandprivilege .bandmode.all { fill: #039be5 }
.bandprivilege .bandmode.fm { fill: #7cb342}
.bandprivilege .bandmode.sat { fill: #7cb342}
.bandprivilege .bandmode.in { fill: #7cb342}
.bandprivilege .bandmode.out { fill: #7cb342}
</style>
