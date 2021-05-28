import transferApi from '@/api/transfer'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createTransferStart: '[createTransfer] Create transfer start',
  createTransferSuccess: '[createTransfer] Create transfer success',
  createTransferFailure: '[createTransfer] Create transfer failure'
}

export const actionTypes = {
  createTransfer: '[createTransfer] Create transfer'
}

const mutations = {
  [mutationTypes.createTransferStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createTransferSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createTransferFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createTransfer](context, {transferInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createTransferStart, transferInput)
      transferApi
        .createTransfer(transferInput)
        .then(transfer => {
          context.commit(mutationTypes.createTransferSuccess, transfer.data)
          resolve(transfer.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createTransferFailure,
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
