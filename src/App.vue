<template>
  <div id="app">
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
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
  margin: 0 0 16px;
}
label { display: block }
#app { margin: 0 auto; }
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
