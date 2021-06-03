import axios from '@/api/axios'

const getExpensesCategoriesList = () => {
  return axios.get(`/expense_category/`)
}

export default {
  getExpensesCategoriesList
}
