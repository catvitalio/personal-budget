import axios from '@/api/axios'

const createExpenseTag = tagInput => {
  return axios.post('/expense_tag/', tagInput).then(response => response.data)
}

const deleteExpenseTag = slug => {
  return axios.delete(`/expense_tag/${slug}/`)
}

const editExpenseTag = (slug, tagInput) => {
  return axios
    .put(`/expense_tag/${slug}/`, tagInput)
    .then(response => response.data)
}

export default {
  createExpenseTag,
  deleteExpenseTag,
  editExpenseTag
}
