<template>
  <div id="app">
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/bandplan">Bandplan</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
a.router-link-exact-active {
  color: #f00;
}

.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  box-sizing: border-box;
  padding: 0 16px;
  width: 33.3%;
}
.card {
  margin: 8px 0 16px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
}
.card-content {
  padding: 24px;
}
</style>
