import tagApi from '@/api/tag'

const state = {
  tag: null,
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createTagStart: '[createTag] Create Tag start',
  createTagSuccess: '[createTag] Create Tag success',
  createTagFailure: '[createTag] Create Tag failure'
}

export const actionTypes = {
  createTag: '[createTag] Create Tag'
}

export const getterTypes = {
  tag: '[createTag] tag'
}

const getters = {
  [getterTypes.tag]: state => {
    return state.tag
  }
}

const mutations = {
  [mutationTypes.createTagStart](state) {
    state.isSubmitting = true
    state.tag = null
  },
  [mutationTypes.createTagSuccess](state, payload) {
    state.isSubmitting = false
    state.tag = payload
  },
  [mutationTypes.createTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createTag](context, tagInput) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createTagStart, tagInput)
      tagApi
        .createTag(tagInput)
        .then(response => {
          context.commit(mutationTypes.createTagSuccess, response)
          resolve(response)
        })
        .catch(result => {
          context.commit(mutationTypes.createTagFailure, result.response)
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
