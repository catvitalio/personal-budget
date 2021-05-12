import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import expense from '@/store/modules/expense'
import expensesList from '@/store/modules/expensesList'
import createExpense from '@/store/modules/createExpense'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    expense,
    expensesList,
    createExpense
  }
})
