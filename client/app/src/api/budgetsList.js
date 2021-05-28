import axios from '@/api/axios'

const getBudgetsList = () => {
  return axios.get('/budget/')
}

export default {
  getBudgetsList
}
