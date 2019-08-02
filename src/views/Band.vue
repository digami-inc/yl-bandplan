<template>
  <div>
    <Band :band="band" :large="true" :clickable="false" />
    <div class="card card--topmargin">
      <div class="card-content">
        <h1>Band {{ band.name }}</h1>
        <table>
          <tr v-for="(slice, id) in band.iaru" :key="id">
            <td>{{ slice.from}} - {{ slice.to}}</td>
            <td>{{ slice.bw }}</td>
            <td>{{ slice.desc }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Band from '@/components/Band.vue'

export default {
  name: 'band',
  components: { Band },
  computed: {
    ...mapState({
      band: (state) => state.bands.find(obj => obj.route === state.route.params.id)
    })
  }
}
</script>

<style>
.card--topmargin {
  margin-top: 16px;
}
</style>
