import axios from '@/api/axios'

const register = credentials => {
  return axios.post('/users/', credentials)
}

const login = credentials => {
  return axios.post('/auth/token/', credentials)
}

const getCurrentUser = () => {
  return axios.get('/users/')
}

export default {
  register,
  login,
  getCurrentUser
}
