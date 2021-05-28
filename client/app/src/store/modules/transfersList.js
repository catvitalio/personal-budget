import transfersListApi from '@/api/transfersList'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getTransfersListStart: '[transfersList] Get transfers list start',
  getTransfersListSuccess: '[transfersList] Get transfers list success',
  getTransfersListFailure: '[expenesesList] Get transfers list failure'
}

export const actionTypes = {
  getTransfersList: '[transfersList] Get transfers list'
}

const mutations = {
  [mutationTypes.getTransfersListStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getTransfersListSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getTransfersListFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getTransfersList](context, {pageNumber, sortBy, search}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getTransfersListStart)
      transfersListApi
        .getTransfersList(pageNumber, sortBy, search)
        .then(response => {
          context.commit(mutationTypes.getTransfersListSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getTransfersListFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
