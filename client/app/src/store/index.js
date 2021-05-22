import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import expense from '@/store/modules/expense'
import expensesList from '@/store/modules/expensesList'
import createExpense from '@/store/modules/createExpense'
import editExpense from '@/store/modules/editExpense'
import createTag from '@/store/modules/createTag'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    expense,
    expensesList,
    createExpense,
    editExpense,
    createTag
  }
})
