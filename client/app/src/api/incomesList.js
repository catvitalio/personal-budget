import axios from '@/api/axios'

const getIncomesList = (pageNumber, sortBy, search) => {
  return axios.get(
    `/income/?page=${pageNumber}&ordering=${sortBy}&search=${search}`
  )
}

export default {
  getIncomesList
}
