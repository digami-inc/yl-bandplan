<script setup lang="ts">
import BandPicture from "./BandPicture.vue";
import type { Band } from "../bandplan";

const props = defineProps<{
  band: Band;
  priv: string;
  clickable?: boolean;
  width?: number;
  class?: string;
  highlight?: { from: number; to: number; fromLabel: string; toLabel: string };
  marker?: { freq: number; label: string };
}>();

const visiblePrivileges = props.band.privileges.filter(
  (p) => props.priv == "all" || p.classes.includes(props.priv)
);
</script>

<template>
  <div :class="class" class="card-content card-content--nobottom">
    <h2>{{ band.name }}</h2>
    <BandPicture
      v-for="p in visiblePrivileges"
      :key="p.name"
      :privilege="p"
      :from="band.from"
      :to="band.to"
      :units="band.units"
      :show-name="priv == 'all'"
      :window-width="width"
      :highlight="highlight"
      :marker="marker"
    />
  </div>
</template>
