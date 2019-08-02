<template>
  <div class="card" :class="{ clickable }" @click="clicked">
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
        :large="large"
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
  props: {
    'band': Object,
    'large': Boolean,
    'clickable': {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clicked () {
      if (!this.clickable) return
      this.$router.push({ name: 'band', params: { id: this.band.route } })
    }
  },
  computed: {
    ...mapState({
      activePrivileges: state => state.settings.activePrivileges
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
