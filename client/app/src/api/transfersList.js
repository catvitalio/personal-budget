import axios from '@/api/axios'

const getTransfersList = (pageNumber, sortBy, search) => {
  return axios.get(
    `/transfer/?page=${pageNumber}&ordering=${sortBy}&search=${search}`
  )
}

export default {
  getTransfersList
}
