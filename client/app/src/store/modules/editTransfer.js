import transferApi from '@/api/transfer'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  editTransferStart: '[editTransfer] Edit transfer start',
  editTransferSuccess: '[editTransfer] Edit transfer success',
  editTransferFailure: '[editTransfer] Edit transfer failure',

  deleteTransferStart: '[editTransfer] Delete transfer start',
  deleteTransferSuccess: '[editTransfer] Delete transfer success',
  deleteTransferFailure: '[deleteTransfer] Delete transfer failure'
}

export const actionTypes = {
  editTransfer: '[editTransfer] Edit transfer',
  deleteTransfer: '[deleteTransfer] Delete transfer'
}

const mutations = {
  [mutationTypes.editTransferStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editTransferSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editTransferFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.deleteTransferStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.deleteTransferSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.deleteTransferFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.editTransfer](context, {slug, transferInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editTransferStart, transferInput)
      transferApi
        .editTransfer(slug, transferInput)
        .then(transfer => {
          context.commit(mutationTypes.editTransferSuccess, transfer.data)
          resolve(transfer.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.editTransferFailure,
            result.response.data
          )
        })
    })
  },
  [actionTypes.deleteTransfer](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteTransferStart, slug)
      transferApi
        .deleteTransfer(slug)
        .then(() => {
          context.commit(mutationTypes.deleteTransferSuccess)
          resolve()
        })
        .catch(result => {
          context.commit(
            mutationTypes.deleteTransferFailure,
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
