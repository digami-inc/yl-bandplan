<template>
    <div class="card-content card-content--nobottom" @click="clicked">
      <h2>{{ band.name }}</h2>
      <BandPrivilege
        v-for="privilege in visiblePrivileges"
        :key="privilege.name"
        :privilege="privilege"
        :from="band.from"
        :to="band.to"
        :units="band.units"
        :show-name="activePrivilege == null"
      />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import BandPrivilege from '@/components/BandPrivilege.vue'

export default {
  name: 'home',
  components: { BandPrivilege },
  props: {
    'band': Object
  },
  methods: {
    clicked () {
      if (!this.clickable) return
      this.$router.push({ name: 'band', params: { id: this.band.route } })
    }
  },
  computed: {
    ...mapState({
      activePrivilege: state => state.settings.activePrivilege
    }),
    visiblePrivileges () {
      if (!this.activePrivilege) return this.band.privileges

      return this.band.privileges.filter(
        (privilege) => privilege.classes.includes(this.activePrivilege)
      )
    }
  }
}
</script>
