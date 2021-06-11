import axios from '@/api/axios'

const createTransferTag = tagInput => {
  return axios.post('/transfer_tag/', tagInput).then(response => response.data)
}

const deleteTransferTag = slug => {
  return axios.delete(`/transfer_tag/${slug}/`)
}

const editTransferTag = (slug, tagInput) => {
  return axios
    .put(`/transfer_tag/${slug}/`, tagInput)
    .then(response => response.data)
}

export default {
  createTransferTag,
  deleteTransferTag,
  editTransferTag
}
