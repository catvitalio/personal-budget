import axios from '@/api/axios'

const createExpenseTag = tagInput => {
  return axios.post('/expense_tag/', tagInput).then(response => response.data)
}

export default {
  createExpenseTag
}
