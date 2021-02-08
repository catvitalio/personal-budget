import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null
}

export const mutationTypes = {
  registerStart: '[auth] Register start',
  registerSuccess: '[auth] Register success',
  registerFailure: '[auth] Register failure',
  loginStart: '[auth] Login start',
  loginSuccess: '[auth] Login success',
  loginFailure: '[auth] Login failure'
}

export const actionTypes = {
  register: '[auth] Register',
  login: '[auth] Login'
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.registerSuccess, response.data.username)
          setItem('token', response.data.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationTypes.registerFailure, result.response.data)
        })
    })
  },

  [actionTypes.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then(response => {
          context.commit(mutationTypes.loginSuccess, response.data.username)
          setItem('token', response.data.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationTypes.loginFailure, result.response.data)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
