<template>
  <div class="band card">
    <div class="card-content">
      <h2>{{ band.name }}</h2>
      <BandPrivilege
        v-for="privilege in band.privileges"
        :key="privilege.name"
        :privilege="privilege"
        :from="band.from"
        :to="band.to"
        :units="band.units"
      />
    </div>
  </div>
</template>

<script>
import BandPrivilege from '@/components/BandPrivilege.vue'

export default {
  name: 'home',
  components: { BandPrivilege },
  props: ['band']
}
</script>

<style>
.band h2 {
  font: 32px/32px sans-serif;
  color: #444;
  margin: 16px 0;
}
</style>
