<template>
  <div class="card" @click="router.push({ name: 'band', params: { id: band.name } })">
    <div class="card-content card-content--nobottom">
      <h2>{{ band.name }}</h2>
      <BandPrivilege
        v-for="privilege in visiblePrivileges"
        :key="privilege.name"
        :privilege="privilege"
        :from="band.from"
        :to="band.to"
        :units="band.units"
        :show-name="activePrivileges.length > 1"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BandPrivilege from '@/components/BandPrivilege.vue'

export default {
  name: 'home',
  components: { BandPrivilege },
  props: ['band'],
  computed: {
    ...mapState({
      activePrivileges: (state, getters) => getters.activePrivileges
    }),
    visiblePrivileges () {
      return this.band.privileges.filter(
        (privilege) => this.activePrivileges.some(
          (actPriv) => privilege.classes.includes(actPriv)
        )
      )
    }
  }
}
</script>
