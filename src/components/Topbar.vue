<script setup lang="ts">
import { privileges } from "../bandplan";

defineProps<{
  priv?: string;
  band?: string;
}>();
</script>

<template>
  <div class="topbar">
    <a v-if="priv && priv!='all'" class="link" :href="`/priv-${priv}`">Joslas</a>
    <a v-else class="link" href="/">Joslas</a>
    |
    <a class="link" href="/about">Par</a> | Privilēģijas:
    <div v-if="band" class="toolbar">
      <a
        :href="`/band-${band}-all`"
        class="menu"
        :class="{ active: priv == 'all' || priv == undefined }"
        >All</a
      >
      <a
        v-for="privilege in privileges"
        :key="privilege.route"
        class="menu"
        :class="{ active: priv == privilege.route }"
        :href="`band-${band}-${privilege.route}`"
      >
        {{ privilege.name }}
      </a>
    </div>
    <div v-else class="toolbar">
      <a
        href="/"
        class="menu"
        :class="{ active: priv == 'all' || priv == undefined }"
        >All</a
      >
      <a
        v-for="privilege in privileges"
        :key="privilege.route"
        class="menu"
        :class="{ active: priv == privilege.route }"
        :href="`priv-${privilege.route}`"
      >
        {{ privilege.name }}
      </a>
    </div>
  </div>
</template>
