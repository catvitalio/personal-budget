import axios from '@/api/axios'

const getIncomesTagsList = () => {
  return axios.get(`/income_tag/`)
}

export default {
  getIncomesTagsList
}
