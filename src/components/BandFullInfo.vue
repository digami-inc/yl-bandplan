<script setup lang="ts">
import type { Band } from "../bandplan";
import BandCard from "./BandCard.vue";

const props = defineProps<{
  band: Band;
  priv: string;
}>();

const rules = props.band.rules.filter(
  (r) => props.priv == "all" || r.class == props.priv.toUpperCase()
);

</script>

<template>
  <div>
    <div class="card card--topmargin" v-if="rules.length > 0">
      <a v-if="priv == 'all'" href="/" class="card-close">✕</a>
      <a v-else :href="`/priv-${priv}`" class="card-close">✕</a>
      <BandCard
        :band="band"
        :priv="priv"
        :clickable="false"
        :width="580"
        class="hide block-md"
      />
      <BandCard
        :band="band"
        :priv="priv"
        :clickable="false"
        :width="180"
        class="hide-md"
      />

      <div
        class="card-content"
        :class="{ 'card-content--nobottom': !band.iaruNotes }"
      >
        <h2>IARU {{ band.name }} joslas plāns</h2>
        <div class="table-container">
          <div class="table-row header">
            <div>{{ band.iaruUnits }}</div>
            <div class="narrow">Bandwidth</div>
            <div class="wide">Description</div>
          </div>
          <div
            v-for="(slice, id) in band.iaru"
            :key="id"
            class="table-row iarucolor"
            :class="slice.mode"
          >
            <div>{{ slice.from }} - {{ slice.to }} {{ band.iaruUnits }}</div>
            <div class="narrow">
              <span v-if="slice.bw">{{ slice.bw }} Hz</span
              ><span v-else>-</span>
            </div>
            <div class="wide sm">
              {{ slice.desc }}
              <div v-if="slice.note">{{ slice.note }}</div>
            </div>
          </div>
        </div>
        <div v-if="band.iaruNotes">
          <p v-for="(note, id) in band.iaruNotes" :key="id" class="sm">
            {{ note }}
          </p>
        </div>
      </div>

      <div class="card-content" v-if="band.bookmarks">
        <h2>Grāmatzīmes</h2>
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
        <h2>MK Noteikumi Nr.257</h2>
        <p class="sm">
          Radioamatieru eksaminācijas apliecību un radioamatieru radiostacijas
          atļauju saņemšanas kārtība, kā arī radioamatieru radiostaciju
          lietošanas kārtība
        </p>
        <div class="table-container">
          <div class="table-row header">
            <div v-if="priv == 'all'" class="digit"></div>
            <div>Radiofrekvenču josla</div>
            <div class="narrow">Sadalījuma kategorija</div>
            <div class="narrow">Jauda</div>
            <div class="wide sm">Piezīmes</div>
          </div>

          <div v-for="(rule, id) in rules" :key="id" class="table-row">
            <div v-if="priv == 'all'" class="digit">{{ rule.class }}</div>
            <div>{{ rule.band }}</div>
            <div class="narrow">{{ rule.cat }}</div>
            <div class="narrow">{{ rule.pwr }}</div>
            <div class="wide sm">{{ rule.notes }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card card--topmargin" v-else>
      <a v-if="priv == 'all'" href="/" class="card-close">✕</a>
      <a v-else :href="`/priv-${priv}`" class="card-close">✕</a>
      <div class="card-content">
        <h2>{{ band.name }}</h2>
        <p>
          This band is not available for "{{ priv.name }}" staticons.
          <a href=""> Activate all privileges, to view </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style is:global>
.card--topmargin {
  margin-top: 16px;
}
.note {
  font-size: 80%;
}
.iarucolor.yellow {
  background: #fff9c4;
}
.iarucolor.yellow {
  border-color: #fbc02d;
}
.iarucolor.orange {
  background: #ffe0b2;
}
.iarucolor.orange {
  border-color: #ffa726;
}
.iarucolor.blue {
  background: #b3e5fc;
}
.iarucolor.blue {
  border-color: #29b6f6;
}
.iarucolor.red {
  background: #ef5350;
}
.iarucolor.red {
  border-color: #d32f2f;
}
.iarucolor.green {
  background: #c5e1a5;
}
.iarucolor.green {
  border-color: #8bc34a;
}
.iarucolor.purple {
  background: #e1bee7;
}
.iarucolor.purple {
  border-color: #ab47bc;
}
.iarucolor.grey {
  background: #eeeeee;
}
.iarucolor.grey {
  border-color: #9e9e9e;
}
</style>
