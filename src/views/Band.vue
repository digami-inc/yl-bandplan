<template>
  <div>
    <Band :band="band" :clickable="false" />
    <div class="card card--topmargin">
      <div class="card-content">
        <h2>MK Noteikumi Nr.529</h2>
        <p>Radioamatieru radiostaciju būvēšanas, ierīkošanas un lietošanas, kā arī radioamatieru apliecības saņemšanas kārtība.</p>
        <table>
          <tr>
            <th>Radiofrekvenču josla</th>
            <th>Sadalījuma kategorija</th>
            <th>Jauda</th>
            <th>Piezīmes</th>
          </tr>

          <tr v-for="(rule, id) in band.rules" :key="id">
            <td>{{ rule. band }}</td>
            <td class="center">{{ rule.cat }}</td>
            <td>{{ rule.pwr }}</td>
            <td>{{ rule.notes }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="card card--topmargin">
      <div class="card-content">
        <h2>IARU {{ band.name }} bandplan</h2>
        <table  class="iaru">
          <tr>
            <th>{{ band.units }}</th>
            <th class="right">Bandwidth</th>
            <th>Description</th>
          </tr>
          <tr v-for="(slice, id) in band.iaru" :key="id" class="iarucolor" :class="slice.mode">
            <td class="nw">{{ slice.from}} - {{ slice.to}}</td>
            <td class="right">{{ slice.bw }}</td>
            <td>{{ slice.desc }}<div v-if="slice.note" class="note">{{ slice.note }}</div></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="card card--topmargin">
      <div class="card-content">
        <h2>Bookmarks</h2>
        <table  class="iaru">
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
.iaru {
  width: 100%;
  box-sizing: border-box;
  border-collapse: collapse;
  border: 1px solid #9e9e9e;
}
.right { text-align: right }
.nw { white-space: nowrap }
.note { font-size: 80% }
.iaru td, .iaru th { padding: 4px 8px; border-bottom: 1px solid #9e9e9e; vertical-align: top }
.iaru th { text-align: left }
.iarucolor.yellow { background: #fff9c4; }
.iarucolor.yellow td { border-color: #fbc02d; }
.iarucolor.orange { background: #ffe0b2; }
.iarucolor.orange td { border-color: #ffa726; }
.iarucolor.blue { background: #b3e5fc; }
.iarucolor.blue td { border-color: #29b6f6; }
.iarucolor.red { background: #ef5350; }
.iarucolor.red td { border-color: #d32f2f; }
.iarucolor.green { background: #c5e1a5; }
.iarucolor.green td { border-color: #8bc34a; }
.iarucolor.purple { background: #e1bee7; }
.iarucolor.purple td { border-color: #ab47bc; }
.iarucolor.grey { background: #eeeeee; }
.iarucolor.grey td { border-color: #9e9e9e; }
</style>
