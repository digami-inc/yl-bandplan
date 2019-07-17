<template>
  <div>
    <h1>Bandplan YL "B" stacijām</h1>
    <div class="row">
      <div class="col" v-for="band in bands" :key="band.name">
        <Band :band="band"/>
      </div>
    </div>
  </div>
</template>

<script>
import bands from '@/bands.js'
import Band from '@/components/Band.vue'

export default {
  name: 'bandplan',
  components: { Band },
  data: function () {
    return { bands }
  }
}
</script>
