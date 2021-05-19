import axios from '@/api/axios'

const getExpensesList = pageNumber => {
  return axios.get(`/expense/?page=${pageNumber}`)
}

export default {
  getExpensesList
}
