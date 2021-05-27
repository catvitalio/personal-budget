import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import expensesList from '@/store/modules/expensesList'
import createExpense from '@/store/modules/createExpense'
import editExpense from '@/store/modules/editExpense'
import createTag from '@/store/modules/createTag'
import expensesPeriodStats from '@/store/modules/expensesPeriodStats'
import incomesPeriodStats from '@/store/modules/incomesPeriodStats'
import expensesCategoriesStats from '@/store/modules/expensesCategoriesStats'
import incomesCategoriesStats from '@/store/modules/incomesCategoriesStats'
import expensesBudgetsStats from '@/store/modules/expensesBudgetsStats'
import incomesBudgetsStats from '@/store/modules/incomesBudgetsStats'
import expensesTagsStats from '@/store/modules/expensesTagsStats'
import incomesTagsStats from '@/store/modules/incomesTagsStats'

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
    incomesPeriodStats,
    expensesCategoriesStats,
    incomesCategoriesStats,
    expensesBudgetsStats,
    incomesBudgetsStats,
    expensesTagsStats,
    incomesTagsStats
  }
})
