import tagApi from '@/api/expenseTag'

const state = {
  tag: null,
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createExpenseTagStart: '[createExpenseTag] Create Tag start',
  createExpenseTagSuccess: '[createExpenseTag] Create Tag success',
  createExpenseTagFailure: '[createExpenseTag] Create Tag failure'
}

export const actionTypes = {
  createExpenseTag: '[createExpenseTag] Create Tag'
}

export const getterTypes = {
  tag: '[createExpenseTag] tag'
}

const getters = {
  [getterTypes.tag]: state => {
    return state.tag
  }
}

const mutations = {
  [mutationTypes.createExpenseTagStart](state) {
    state.isSubmitting = true
    state.tag = null
  },
  [mutationTypes.createExpenseTagSuccess](state, payload) {
    state.isSubmitting = false
    state.tag = payload
  },
  [mutationTypes.createExpenseTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createExpenseTag](context, tagInput) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createExpenseTagStart, tagInput)
      tagApi
        .createExpenseTag(tagInput)
        .then(response => {
          context.commit(mutationTypes.createExpenseTagSuccess, response)
          resolve(response)
        })
        .catch(result => {
          context.commit(mutationTypes.createExpenseTagFailure, result.response)
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
