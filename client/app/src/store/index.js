import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import budgetsList from '@/store/modules/budgetsList'
import expensesList from '@/store/modules/expensesList'
import expensesCategoriesList from '@/store/modules/expensesCategoriesList'
import expensesTagsList from '@/store/modules/expensesTagsList'
import incomesList from '@/store/modules/incomesList'
import transfersList from '@/store/modules/transfersList'
import createBudget from '@/store/modules/createBudget'
import createExpense from '@/store/modules/createExpense'
import createExpenseCategory from '@/store/modules/createExpenseCategory'
import createIncome from '@/store/modules/createIncome'
import createTransfer from '@/store/modules/createTransfer'
import editBudget from '@/store/modules/editBudget'
import editExpense from '@/store/modules/editExpense'
import editExpenseCategory from '@/store/modules/editExpenseCategory'
import editIncome from '@/store/modules/editIncome'
import editTransfer from '@/store/modules/editTransfer'
import createExpenseTag from '@/store/modules/createExpenseTag'
import editExpenseTag from '@/store/modules/editExpenseTag'
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
    budgetsList,
    expensesList,
    expensesCategoriesList,
    expensesTagsList,
    incomesList,
    transfersList,
    createBudget,
    createExpense,
    createExpenseCategory,
    createIncome,
    createTransfer,
    editBudget,
    editExpense,
    editExpenseCategory,
    editIncome,
    editTransfer,
    createExpenseTag,
    editExpenseTag,
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
