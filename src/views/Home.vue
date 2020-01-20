<template>
  <div>
    <h1>IARU Region 1 joslu plāns YL stacijām</h1>
    <div class="row row--grow-cards">
      <div class="col" v-for="band in activeBands" :key="band.name">
        <Band :band="band"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Band from '@/components/Band.vue'

export default {
  name: 'home',
  components: { Band },
  computed: mapState({
    activeBands: (state, getters) => getters.activeBands
  })
}
</script>
