import axios from '@/api/axios'

const getExpensesList = () => {
  return axios.get('/expense/')
}

export default {
  getExpensesList
}
