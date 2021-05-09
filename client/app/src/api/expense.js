import axios from '@/api/axios'

const getExpense = slug => {
  return axios.get(`/expense/${slug}/`)
}

const deleteExpense = slug => {
  return axios.delete(`/expense/${slug}/`)
}

export default {
  getExpense,
  deleteExpense
}
