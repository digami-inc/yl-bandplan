import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Band from './views/Band.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/band/:id',
      name: 'band',
      component: Band
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
