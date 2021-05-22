import axios from '@/api/axios'

const createTag = tagInput => {
  return axios.post('/expense_tag/', tagInput).then(response => response.data)
}

export default {
  createTag
}
