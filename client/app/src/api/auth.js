import axios from '@/api/axios'

const register = credentials => {
  return axios.post('/users/', credentials)
}

export default {
  register
}
