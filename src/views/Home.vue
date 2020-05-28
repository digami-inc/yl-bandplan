<template>
  <div>
    <h1>IARU joslu plāns YL stacijām</h1>
    <div class="row row--grow-cards">
      <div class="col" v-for="band in activeBands" :key="band.name">
        <div class="card clickable" @click="$router.push({ name: 'band', params: { id: band.route } })">
          <Band :band="band"/>
        </div>
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
