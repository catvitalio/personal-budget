import axios from '@/api/axios'

const getTransfer = slug => {
  return axios.get(`/transfer/${slug}/`)
}

const deleteTransfer = slug => {
  return axios.delete(`/transfer/${slug}/`)
}

const createTransfer = transferInput => {
  return axios.post('/transfer/', transferInput).then(response => response.data)
}

const editTransfer = (slug, transferInput) => {
  return axios
    .put(`/transfer/${slug}/`, transferInput)
    .then(response => response.data)
}

const getBudgetsList = () => {
  return axios.get('/budget/')
}

const getTagsList = () => {
  return axios.get('/transfer_tag/')
}

export default {
  getTransfer,
  deleteTransfer,
  createTransfer,
  editTransfer,
  getBudgetsList,
  getTagsList
}
