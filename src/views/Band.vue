<template>
  <div>
    <h1>BAND {{ $route.params.id }}</h1>
    <div class="row row--grow-cards">
      <div class="col">
        <Band :band="bands[0]" :active-privileges="activePrivileges" />
      </div>
    </div>
  </div>
</template>

<script>
import bands from '@/bands.js'
import Band from '@/components/Band.vue'

export default {
  name: 'band',
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
}
</script>
