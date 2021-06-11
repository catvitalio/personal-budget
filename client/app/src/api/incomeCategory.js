import axios from '@/api/axios'

const getIncomeCategory = slug => {
  return axios.get(`/income_category/${slug}/`)
}

const deleteIncomeCategory = slug => {
  return axios.delete(`/income_category/${slug}/`)
}

const createIncomeCategory = incomeInput => {
  return axios
    .post('/income_category/', incomeInput)
    .then(response => response.data)
}

const editIncomeCategory = (slug, incomeInput) => {
  return axios
    .put(`/income_category/${slug}/`, incomeInput)
    .then(response => response.data)
}

export default {
  getIncomeCategory,
  deleteIncomeCategory,
  createIncomeCategory,
  editIncomeCategory
}
