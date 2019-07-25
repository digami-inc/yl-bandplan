import Vue from 'vue'
import Vuex from 'vuex'
import bands from './bands'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bands,
    privileges: [
      { name: 'A', description: 'A klasses stacijas', active: true },
      { name: 'B', description: 'B klasses stacijas', active: true },
      { name: 'C', description: 'C klasses stacijas', active: true }
    ]
  },
  getters: {
    activePrivileges: state => {
      return state.privileges.filter((el) => el.active)
        .map(el => el.name)
    },
    activeBands: (state, getters) => {
      return state.bands.filter((band) => band.privileges.some(
        (privilege) => getters.activePrivileges.some(
          (activePrivilege) => privilege.classes.includes(activePrivilege)
        )
      ))
    }
  },
  mutations: {
    activatePrivilege (state, id) {
      state.privileges[id].active = true
    },
    deactivatePrivilege (state, id) {
      state.privileges[id].active = false
    }
  },
  actions: {

  }
})
