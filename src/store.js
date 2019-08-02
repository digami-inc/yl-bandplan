import Vue from 'vue'
import Vuex from 'vuex'
import bands from './bands'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      activePrivileges: ['A', 'B', 'C']
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
      return state.bands.filter(band => band.privileges.some(
        privilege => state.settings.activePrivileges.some(
          activePrivilege => privilege.classes.includes(activePrivilege)
        )
      ))
    }
  },
  mutations: {
    initialiseStore (state) {
      if (!localStorage.getItem('settings')) return
      state.settings = JSON.parse(localStorage.getItem('settings'))
    },
    activatePrivilege (state, name) {
      if (!state.settings.activePrivileges.includes(name)) {
        state.settings.activePrivileges.push(name)
        localStorage.setItem('settings', JSON.stringify(state.settings))
      }
    },
    deactivatePrivilege (state, name) {
      let i = state.settings.activePrivileges.indexOf(name)
      if (i !== -1) {
        state.settings.activePrivileges.splice(i, 1)
        localStorage.setItem('settings', JSON.stringify(state.settings))
      }
    }
  },
  actions: {

  }
})
