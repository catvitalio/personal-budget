import axios from '@/api/axios'

const getBudget = slug => {
  return axios.get(`/budget/${slug}/`)
}

const deleteBudget = slug => {
  return axios.delete(`/budget/${slug}/`)
}

const createBudget = budgetInput => {
  return axios.post('/budget/', budgetInput).then(response => response.data)
}

const editBudget = (slug, budgetInput) => {
  return axios
    .put(`/budget/${slug}/`, budgetInput)
    .then(response => response.data)
}

const getBudgetsList = () => {
  return axios.get('/budget/')
}

const getTypesList = () => {
  return axios.get('/budget_type/')
}

export default {
  getBudget,
  deleteBudget,
  createBudget,
  editBudget,
  getBudgetsList,
  getTypesList
}
