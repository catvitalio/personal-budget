import transferTagApi from '@/api/transferTag'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  editTransferTagStart: '[editTransferTag] Edit transferTag start',
  editTransferTagSuccess: '[editTransferTag] Edit transferTag success',
  editTransferTagFailure: '[editTransferTag] Edit transferTag failure',

  deleteTransferTagStart: '[editTransferTag] Delete transferTag start',
  deleteTransferTagSuccess: '[editTransferTag] Delete transferTag success',
  deleteTransferTagFailure: '[editTransferTag] Delete transferTag failure'
}

export const actionTypes = {
  editTransferTag: '[editTransferTag] Edit transferTag',
  deleteTransferTag: '[editTransferTag] Delete transferTag'
}

const mutations = {
  [mutationTypes.editTransferTagStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editTransferTagSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editTransferTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.deleteTransferTagStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.deleteTransferTagSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.deleteTransferTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.editTransferTag](context, {slug, transferTagInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editTransferTagStart, transferTagInput)
      transferTagApi
        .editTransferTag(slug, transferTagInput)
        .then(transferTag => {
          context.commit(mutationTypes.editTransferTagSuccess, transferTag.data)
          resolve(transferTag.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.editTransferTagFailure,
            result.response.data
          )
        })
    })
  },
  [actionTypes.deleteTransferTag](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteTransferTagStart, slug)
      transferTagApi
        .deleteTransferTag(slug)
        .then(() => {
          context.commit(mutationTypes.deleteTransferTagSuccess)
          resolve()
        })
        .catch(result => {
          context.commit(
            mutationTypes.deleteTransferTagFailure,
            result.response.data
          )
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
