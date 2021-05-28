import axios from '@/api/axios'

const createTransferTag = tagInput => {
  return axios.post('/transfer_tag/', tagInput).then(response => response.data)
}

export default {
  createTransferTag
}
