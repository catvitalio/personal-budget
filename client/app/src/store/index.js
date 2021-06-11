import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import budgetsList from '@/store/modules/budgetsList'
import expensesList from '@/store/modules/expensesList'
import expensesCategoriesList from '@/store/modules/expensesCategoriesList'
import expensesTagsList from '@/store/modules/expensesTagsList'
import incomesList from '@/store/modules/incomesList'
import incomesCategoriesList from '@/store/modules/incomesCategoriesList'
import incomesTagsList from '@/store/modules/incomesTagsList'
import transfersList from '@/store/modules/transfersList'
import transfersTagsList from '@/store/modules/transfersTagsList'
import createBudget from '@/store/modules/createBudget'
import createExpense from '@/store/modules/createExpense'
import createExpenseCategory from '@/store/modules/createExpenseCategory'
import createIncome from '@/store/modules/createIncome'
import createIncomeCategory from '@/store/modules/createIncomeCategory'
import createTransfer from '@/store/modules/createTransfer'
import editBudget from '@/store/modules/editBudget'
import editExpense from '@/store/modules/editExpense'
import editExpenseCategory from '@/store/modules/editExpenseCategory'
import editIncome from '@/store/modules/editIncome'
import editIncomeCategory from '@/store/modules/editIncomeCategory'
import editTransfer from '@/store/modules/editTransfer'
import editTransferTag from '@/store/modules/editTransferTag'
import createExpenseTag from '@/store/modules/createExpenseTag'
import editExpenseTag from '@/store/modules/editExpenseTag'
import createIncomeTag from '@/store/modules/createIncomeTag'
import editIncomeTag from '@/store/modules/editIncomeTag'
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
    incomesCategoriesList,
    incomesTagsList,
    transfersList,
    transfersTagsList,
    createBudget,
    createExpense,
    createExpenseCategory,
    createIncomeCategory,
    createIncome,
    createTransfer,
    editBudget,
    editExpense,
    editExpenseCategory,
    editIncome,
    editIncomeCategory,
    editTransfer,
    editTransferTag,
    createExpenseTag,
    editExpenseTag,
    createIncomeTag,
    editIncomeTag,
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
