import axios from '@/api/axios'

const getExpenses = () => {
  return axios.get('/expense/')
}

export default {
  getExpenses
}
