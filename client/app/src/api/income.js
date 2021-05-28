import axios from '@/api/axios'

const getIncome = slug => {
  return axios.get(`/income/${slug}/`)
}

const deleteIncome = slug => {
  return axios.delete(`/income/${slug}/`)
}

const createIncome = incomeInput => {
  return axios.post('/income/', incomeInput).then(response => response.data)
}

const editIncome = (slug, incomeInput) => {
  return axios
    .put(`/income/${slug}/`, incomeInput)
    .then(response => response.data)
}

const getBudgetsList = () => {
  return axios.get('/budget/')
}

const getCategoriesList = () => {
  return axios.get('/income_category/')
}

const getTagsList = () => {
  return axios.get('/income_tag/')
}

export default {
  getIncome,
  deleteIncome,
  createIncome,
  editIncome,
  getBudgetsList,
  getCategoriesList,
  getTagsList
}
