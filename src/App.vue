<template>
  <div id="app">
    <div class="topbar">
      <router-link to="/">Joslas</router-link> |
      <router-link to="/about">Par</router-link> |
      Privilēģijas:
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
  margin-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
}
a { color: #039be5 }
body {
  margin: 0 8px;
  font-size: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.4;
  background: #f8f8f8;
  color: #333;
}
.sm { font-size: 14px; color: #444; }
h1 {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 16px 0;
}
h2 {
  font-size: 24px;
  font-weight: normal;
  color: #000;
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
  position: relative;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
  background: #fff;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
a.card-close {
  position: absolute;
  right: 0;
  top: 0;
  width: 32px;
  height: 32px;
  padding: 8px;
  text-align: center;
  line-height: 32px;
  font-size: 32px;
  color: #888;
  text-decoration: none;
}
a.card-close:hover {
  color: #333;
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
  border-bottom: 1px solid #d6d6d6;
}
.card-content h1:first-child,
.card-content h2:first-child {
  margin-top: 0;
}
.card-content:last-child {
  border-bottom: none;
}
.card-content--nobottom {
  padding-bottom: 0;
  border-bottom: none;
}
.toolbar {
  display: inline-block;
  box-shadow: inset 0 2px 2px 0 rgba(0,0,0,0.14),inset 0 3px 1px -2px rgba(0,0,0,0.12), inset 0 1px 5px 0 rgba(0,0,0,0.2);
  padding: 2px;
  background: #f0f0f0;
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
#app { margin: 0 auto; padding: 10px 0}

.table-container {
  border-top: 1px solid #d6d6d6;
  margin: 0 -24px;
}
.table-row {
  padding: 4px 4px 4px 23px;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-wrap: wrap;
  border-bottom: 1px solid #d6d6d6;
}
.table-row>div {
  width: 140px;
  flex-grow: 1;
  padding: 0 4px;
}
.table-row.header { background: #f0f0f0 }
.table-row>div.wide { width: 260px; flex-grow: 3; }
.table-row>div.digit { width: 30px; flex-grow: 0; }
.table-row>div.narrow { flex-grow: 1; }
table {
  border: 1px solid #d6d6d6;
  width: 100%;
  box-sizing: border-box;
  border-collapse: collapse;
}
td, th { text-align: left; font-weight: normal; padding: 2px 8px; border-bottom: 1px solid #d6d6d6}
th { background-color: #f0f0f0 }
.text-right { text-align: right }
.text-center { text-align: center }

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
