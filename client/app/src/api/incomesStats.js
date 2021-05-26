import axios from '@/api/axios'

const getIncomesPeriodStats = yearMonthOrDay => {
  return axios.get(`/income_stats/${yearMonthOrDay}`)
}

const getIncomesCategoriesStats = yearMonthOrDay => {
  return axios.get(`/income_category_stats/${yearMonthOrDay}`)
}

const getIncomesBudgetsStats = yearMonthOrDay => {
  return axios.get(`/income_budget_stats/${yearMonthOrDay}`)
}

const getIncomesTagsStats = yearMonthOrDay => {
  return axios.get(`/income_tag_stats/${yearMonthOrDay}`)
}

export default {
  getIncomesPeriodStats,
  getIncomesCategoriesStats,
  getIncomesBudgetsStats,
  getIncomesTagsStats
}
