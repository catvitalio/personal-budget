import tagApi from '@/api/incomeTag'

const state = {
  tag: null,
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createIncomeTagStart: '[createIncomeTag] Create Tag start',
  createIncomeTagSuccess: '[createIncomeTag] Create Tag success',
  createIncomeTagFailure: '[createIncomeTag] Create Tag failure'
}

export const actionTypes = {
  createIncomeTag: '[createIncomeTag] Create Tag'
}

export const getterTypes = {
  tag: '[createIncomeTag] tag'
}

const getters = {
  [getterTypes.tag]: state => {
    return state.tag
  }
}

const mutations = {
  [mutationTypes.createIncomeTagStart](state) {
    state.isSubmitting = true
    state.tag = null
  },
  [mutationTypes.createIncomeTagSuccess](state, payload) {
    state.isSubmitting = false
    state.tag = payload
  },
  [mutationTypes.createIncomeTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createIncomeTag](context, tagInput) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createIncomeTagStart, tagInput)
      tagApi
        .createIncomeTag(tagInput)
        .then(response => {
          context.commit(mutationTypes.createIncomeTagSuccess, response)
          resolve(response)
        })
        .catch(result => {
          context.commit(mutationTypes.createIncomeTagFailure, result.response)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
