import axios from '@/api/axios'

const getTransfersTagsList = () => {
  return axios.get(`/transfer_tag/`)
}

export default {
  getTransfersTagsList
}
