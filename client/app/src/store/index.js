import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import expenses from '@/store/modules/expenses'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    expenses
  }
})
