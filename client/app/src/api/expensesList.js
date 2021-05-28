import axios from '@/api/axios'

const getExpensesList = (pageNumber, sortBy, search) => {
  return axios.get(
    `/expense/?page=${pageNumber}&ordering=${sortBy}&search=${search}`
  )
}

export default {
  getExpensesList
}
