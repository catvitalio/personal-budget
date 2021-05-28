import axios from '@/api/axios'

const createIncomeTag = tagInput => {
  return axios.post('/income_tag/', tagInput).then(response => response.data)
}

export default {
  createIncomeTag
}
