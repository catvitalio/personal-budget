import axios from '@/api/axios'

const createIncomeTag = tagInput => {
  return axios.post('/income_tag/', tagInput).then(response => response.data)
}

const deleteIncomeTag = slug => {
  return axios.delete(`/income_tag/${slug}/`)
}

const editIncomeTag = (slug, tagInput) => {
  return axios
    .put(`/income_tag/${slug}/`, tagInput)
    .then(response => response.data)
}

export default {
  createIncomeTag,
  deleteIncomeTag,
  editIncomeTag
}
