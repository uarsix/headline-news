import Vue from 'vue'
import Vuex from 'vuex'
import VueXPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VueXPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    delAllSearchList (state) {
      state.searchHistoryList = []
    },
    delHistory (state, payload) {
      state.searchHistoryList.splice(payload, 1)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
