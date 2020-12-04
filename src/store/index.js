import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)

const USER_KEY = 'my-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, state.user) // 存在localStorage中
    }
  },
  actions: {
  },
  modules: {
  }
})
