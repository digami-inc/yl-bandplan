<template>
  <div>
    <h1>IARU Region 1 joslu plāns YL stacijām</h1>
    <div class="row row--grow-cards">
      <div class="col">
        <div class="card">
          <div class="card-content">
            <h2>Apzīmējumi</h2>
            <div
              v-for="(privilege, id) in privileges"
              :key="privilege.name"
              @click="$store.commit(privilege.active ? 'deactivatePrivilege' : 'activatePrivilege', id)">
              {{ privilege.description }}
            </div>
          </div>
        </div>
      </div>
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
    privileges: state => state.privileges,
    activeBands: (state, getters) => getters.activeBands
  })
}
</script>
