import axios from '@/api/axios'

const getIncomesCategoriesList = () => {
  return axios.get(`/income_category/`)
}

export default {
  getIncomesCategoriesList
}
