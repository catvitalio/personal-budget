import axios from '@/api/axios'

const register = credentials => {
  return axios.post('/users/', credentials)
}

const login = credentials => {
  return axios.post('/auth/token/', credentials)
}

export default {
  register,
  login
}
