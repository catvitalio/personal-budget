import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

axios.interceptors.request.use(config => {
  const token = getItem('token')
  const authorizationToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authorizationToken
  return config
})

export default axios
