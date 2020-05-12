<template>
  <div>
    <div class="card card--topmargin">
      <router-link to="/" class="card-close">✕</router-link>
      <Band :band="band" :clickable="false" />

      <div class="card-content" :class="{'card-content--nobottom': !band.iaruNotes}">
        <h2>IARU {{ band.name }} bandplan</h2>
        <div class="table-container">
          <div class="table-row header">
            <div>{{ band.iaruUnits }}</div>
            <div class="narrow">Bandwidth</div>
            <div class="wide">Description</div>
          </div>
          <div v-for="(slice, id) in band.iaru" :key="id" class="table-row iarucolor" :class="slice.mode">
            <div>{{ slice.from}} - {{ slice.to}} {{band.iaruUnits}}</div>
            <div class="narrow"><span v-if="slice.bw">{{ slice.bw }} kHz</span><span v-else>-</span></div>
            <div class="wide sm">
            {{ slice.desc }} <div v-if="slice.note">{{ slice.note }}</div>
            </div>
          </div>
        </div>
        <div v-if="band.iaruNotes">
          <p v-for="(note, id) in band.iaruNotes" :key="id" class="sm">{{ note }}</p>
        </div>
      </div>

      <div class="card-content" v-if="band.bookmarks">
        <h2>Bookmarks</h2>
        <table>
          <tr>
            <th>{{ band.units }}</th>
            <th>Description</th>
          </tr>
          <tr v-for="(mark, id) in band.bookmarks" :key="id">
            <td>{{ mark.pos }}</td>
            <td>{{ mark.name }}</td>
          </tr>
        </table>
      </div>

      <div class="card-content card-content--nobottom">
        <h2>MK Noteikumi Nr.529</h2>
        <p class="sm">Radioamatieru radiostaciju būvēšanas, ierīkošanas un lietošanas, kā arī radioamatieru apliecības saņemšanas kārtība.</p>
        <div class="table-container">
          <div class="table-row header">
            <div>Radiofrekvenču josla</div>
            <div class="narrow">Sadalījuma kategorija</div>
            <div class="narrow">Jauda</div>
            <div class="wide sm">Piezīmes</div>
          </div>

          <div v-for="(rule, id) in band.rules" :key="id" class="table-row">
            <div>{{ rule. band }}</div>
            <div class="narrow">{{ rule.cat }}</div>
            <div class="narrow">{{ rule.pwr }}</div>
            <div class="wide sm">{{ rule.notes }}</div>
          </div>
        </div>
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
.note { font-size: 80% }
.iarucolor.yellow { background: #fff9c4; }
.iarucolor.yellow { border-color: #fbc02d; }
.iarucolor.orange { background: #ffe0b2; }
.iarucolor.orange { border-color: #ffa726; }
.iarucolor.blue { background: #b3e5fc; }
.iarucolor.blue { border-color: #29b6f6; }
.iarucolor.red { background: #ef5350; }
.iarucolor.red { border-color: #d32f2f; }
.iarucolor.green { background: #c5e1a5; }
.iarucolor.green { border-color: #8bc34a; }
.iarucolor.purple { background: #e1bee7; }
.iarucolor.purple { border-color: #ab47bc; }
.iarucolor.grey { background: #eeeeee; }
.iarucolor.grey { border-color: #9e9e9e; }
</style>
