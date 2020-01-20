<template>
  <div id="app">
    <div class="topbar">
      <router-link to="/">Bands</router-link> |
      <router-link to="/about">About</router-link>
      Privileges
      <div class="toolbar">
      <span
        @click="$store.commit('activatePrivilege', null)"
        class="menu"
        :class="{active: !activePrivilege}">
        All
      </span>
      <span
        v-for="privilege in privileges"
        :key="privilege.name"
        @click="$store.commit('activatePrivilege', privilege.name)"
        class="menu"
        :class="{active: activePrivilege == privilege.name}">
        {{ privilege.name }}
      </span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    privileges: state => state.privileges,
    activePrivilege: state => state.settings.activePrivilege
  })
}
</script>

<style>
.topbar {
  margin-bottom: 16px;
}
a { color: #039be5 }
body {
  font: 16px/24px sans-serif;
  background: #f5f5f5;
}
h1 {
  font: 32px/40px sans-serif;
  color: #444;
  margin: 16px 0;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  box-sizing: border-box;
  width: 100%;
  flex: 0 0 auto;
  padding-bottom: 16px;
}
.card {
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
  background: #fff;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.clickable {
  cursor: pointer;
}
.card.clickable:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.row--grow-cards .card {
  height: 100%;
}
.card-content {
  padding: 24px;
}
.card-content--nobottom {
  padding-bottom: 0
}
.card-content h2 {
  font: 28px/32px sans-serif;
  color: #444;
  margin: 16px 0;
}
.card-content h2:first-child {
  margin-top: 0;
}
.toolbar {
  display: inline-block;
  box-shadow: inset 0 2px 2px 0 rgba(0,0,0,0.14),inset 0 3px 1px -2px rgba(0,0,0,0.12), inset 0 1px 5px 0 rgba(0,0,0,0.2);
  padding: 2px;
  background: #f5f5f5;
  border-radius: 3px;
  color: #444;
  margin: 0 8px;
  padding: 4px;
}
.menu {
  display: inline-block;
  padding: 0 6px;
  border-radius: 3px;
  cursor: pointer;
}
.menu.active {
  color: #444;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
}
label { display: block }
#app { margin: 0 auto; }

.scrolltable {
  margin: 0 -24px;
  overflow-x: scroll;
}
.scrolltable table {
  border-left: none;
  border-right: none;
}
.scrolltable td, .scrolltable th {
  padding: 4px 8px;
  text-align: left;
  vertical-align: top
}

.text-right { text-align: right }
span.mw16em { display: block; min-width: 16em }

@media (min-width: 576px) {
  #app {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  #app {
    max-width: 720px;
  }
  .col {
    box-sizing: border-box;
    margin-left: 16px;
    margin-right: 16px;
    width: 344px;
  }
  .row {
    margin: 0 -16px;
  }
}

@media (min-width: 992px) {
  #app {
    max-width: 960px;
  }
  .col {
    width: 298px;
  }
}

@media (min-width: 1200px) {
  #app {
    max-width: 1140px;
  }
  .col {
    width: 353px;
  }
}
</style>
