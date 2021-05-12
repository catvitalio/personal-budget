import axios from '@/api/axios'

const getExpense = slug => {
  return axios.get(`/expense/${slug}/`)
}

const deleteExpense = slug => {
  return axios.delete(`/expense/${slug}/`)
}

const createExpense = expenseInput => {
  return axios.post('/expense/', expenseInput).then(response => response.data)
}

const getBudgetsList = () => {
  return axios.get('/budget/')
}

const getCategoriesList = () => {
  return axios.get('/expense_category/')
}

export default {
  getExpense,
  deleteExpense,
  createExpense,
  getBudgetsList,
  getCategoriesList
}
