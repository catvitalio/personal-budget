import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import expensesList from '@/store/modules/expensesList'
import incomesList from '@/store/modules/incomesList'
import transfersList from '@/store/modules/transfersList'
import createExpense from '@/store/modules/createExpense'
import createIncome from '@/store/modules/createIncome'
import createTransfer from '@/store/modules/createTransfer'
import editExpense from '@/store/modules/editExpense'
import editIncome from '@/store/modules/editIncome'
import editTransfer from '@/store/modules/editTransfer'
import createExpenseTag from '@/store/modules/createExpenseTag'
import createIncomeTag from '@/store/modules/createIncomeTag'
import createTransferTag from '@/store/modules/createTransferTag'
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
    incomesList,
    transfersList,
    createExpense,
    createIncome,
    createTransfer,
    editExpense,
    editIncome,
    editTransfer,
    createExpenseTag,
    createIncomeTag,
    createTransferTag,
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
