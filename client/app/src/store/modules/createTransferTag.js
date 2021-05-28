import tagApi from '@/api/transferTag'

const state = {
  tag: null,
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createTransferTagStart: '[createTransferTag] Create Tag start',
  createTransferTagSuccess: '[createTransferTag] Create Tag success',
  createTransferTagFailure: '[createTransferTag] Create Tag failure'
}

export const actionTypes = {
  createTransferTag: '[createTransferTag] Create Tag'
}

export const getterTypes = {
  tag: '[createTransferTag] tag'
}

const getters = {
  [getterTypes.tag]: state => {
    return state.tag
  }
}

const mutations = {
  [mutationTypes.createTransferTagStart](state) {
    state.isSubmitting = true
    state.tag = null
  },
  [mutationTypes.createTransferTagSuccess](state, payload) {
    state.isSubmitting = false
    state.tag = payload
  },
  [mutationTypes.createTransferTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createTransferTag](context, tagInput) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createTransferTagStart, tagInput)
      tagApi
        .createTransferTag(tagInput)
        .then(response => {
          context.commit(mutationTypes.createTransferTagSuccess, response)
          resolve(response)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createTransferTagFailure,
            result.response
          )
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
