import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import expensesList from '@/store/modules/expensesList'
import createExpense from '@/store/modules/createExpense'
import editExpense from '@/store/modules/editExpense'
import createTag from '@/store/modules/createTag'
import expensesPeriodStats from '@/store/modules/expensesPeriodStats'
import incomesPeriodStats from '@/store/modules/incomesPeriodStats'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    expensesList,
    createExpense,
    editExpense,
    createTag,
    expensesPeriodStats,
    incomesPeriodStats
  }
})
