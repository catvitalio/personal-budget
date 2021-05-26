import axios from '@/api/axios'

const getExpensesPeriodStats = yearMonthOrDay => {
  return axios.get(`/expense_stats/${yearMonthOrDay}`)
}

const getExpensesCategoriesStats = yearMonthOrDay => {
  return axios.get(`/expense_category_stats/${yearMonthOrDay}`)
}

const getExpensesBudgetsStats = yearMonthOrDay => {
  return axios.get(`/expense_budget_stats/${yearMonthOrDay}`)
}

const getExpensesTagsStats = yearMonthOrDay => {
  return axios.get(`/expense_tag_stats/${yearMonthOrDay}`)
}

export default {
  getExpensesPeriodStats,
  getExpensesCategoriesStats,
  getExpensesBudgetsStats,
  getExpensesTagsStats
}
