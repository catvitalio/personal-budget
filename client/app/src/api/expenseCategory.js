import axios from '@/api/axios'

const getExpenseCategory = slug => {
  return axios.get(`/expense_category/${slug}/`)
}

const deleteExpenseCategory = slug => {
  return axios.delete(`/expense_category/${slug}/`)
}

const createExpenseCategory = expenseInput => {
  return axios
    .post('/expense_category/', expenseInput)
    .then(response => response.data)
}

const editExpenseCategory = (slug, expenseInput) => {
  return axios
    .put(`/expense_category/${slug}/`, expenseInput)
    .then(response => response.data)
}

export default {
  getExpenseCategory,
  deleteExpenseCategory,
  createExpenseCategory,
  editExpenseCategory
}
