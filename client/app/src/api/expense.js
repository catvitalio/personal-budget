import axios from '@/api/axios'

const getExpense = slug => {
  return axios.get(`/expense/${slug}/`)
}

export default {
  getExpense
}
