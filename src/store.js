import Vue from 'vue'
import Vuex from 'vuex'
import bands from './bands'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      activePrivilege: null
    },
    bands,
    privileges: [
      { name: 'A', description: 'A klasses stacijas' },
      { name: 'B', description: 'B klasses stacijas' },
      { name: 'C', description: 'C klasses stacijas' }
    ]
  },
  getters: {
    activeBands: (state) => {
      if (!state.settings.activePrivilege) return state.bands

      return state.bands.filter(band => band.privileges.some(
        privilege => privilege.classes.includes(state.settings.activePrivilege)
      ))
   }
  },
  mutations: {
    initialiseStore (state) {
      if (!localStorage.getItem('settings')) return
      state.settings = JSON.parse(localStorage.getItem('settings'))
    },
    activatePrivilege (state, priv) {
      state.settings.activePrivilege = priv
      localStorage.setItem('settings', JSON.stringify(state.settings))
    }
  },
  actions: {

  }
})
