import axios from '@/api/axios'

const getExpensesTagsList = () => {
  return axios.get(`/expense_tag/`)
}

export default {
  getExpensesTagsList
}
