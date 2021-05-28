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

const editExpense = (slug, expenseInput) => {
  return axios
    .put(`/expense/${slug}/`, expenseInput)
    .then(response => response.data)
}

const getBudgetsList = () => {
  return axios.get('/budget/')
}

const getCategoriesList = () => {
  return axios.get('/expense_category/')
}

const getTagsList = () => {
  return axios.get('/expense_tag/')
}

const createExpenseTag = tagInput => {
  return axios.post('/expense_tag/', tagInput).then(response => response.data)
}

export default {
  getExpense,
  deleteExpense,
  createExpense,
  editExpense,
  getBudgetsList,
  getCategoriesList,
  getTagsList,
  createExpenseTag
}
