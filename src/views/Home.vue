<template>
  <div>
    <h1>IARU Region 1 joslu plāns YL stacijām</h1>
    <div class="row row--grow-cards">
      <div class="col">
        <div class="card">
          <div class="card-content">
            <h2>Apzīmējumi</h2>
            <label v-for="privilege in privileges" :key="privilege.name">
              <input type="checkbox" v-model="privilege.active"> {{ privilege.description }}
            </label>
          </div>
        </div>
      </div>
      <div class="col" v-for="band in activeBands" :key="band.name">
        <Band :band="band" :active-privileges="activePrivileges" />
      </div>
    </div>
  </div>
</template>

<script>
import bands from '@/bands.js'
import Band from '@/components/Band.vue'

export default {
  name: 'home',
  components: { Band },
  computed: {
    activePrivileges () {
      return this.privileges.filter((el) => el.active)
        .map(el => el.name)
    },
    activeBands () {
      return this.bands.filter((band) => band.privileges.some(
        (privilege) => this.activePrivileges.some(
          (activePrivilege) => privilege.classes.includes(activePrivilege)
        )
      ))
    }
  },
  data: function () {
    return {
      bands,
      privileges: [
        { name: 'A', description: 'A klasses stacijas', active: true },
        { name: 'B', description: 'B klasses stacijas', active: true },
        { name: 'C', description: 'C klasses stacijas', active: true }
      ]
    }
  }
}
</script>
