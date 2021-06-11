import transfersTagsListApi from '@/api/transfersTagsList'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getTransfersTagsListStart: '[transfersTagsList] Get transfersTags list start',
  getTransfersTagsListSuccess:
    '[transfersTagsList] Get transfersTags list success',
  getTransfersTagsListFailure:
    '[transfersTagsList] Get transfersTags list failure'
}

export const actionTypes = {
  getTransfersTagsList: '[transfersTagsList] Get transfersTags list'
}

const mutations = {
  [mutationTypes.getTransfersTagsListStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getTransfersTagsListSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getTransfersTagsListFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getTransfersTagsList](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getTransfersTagsListStart)
      transfersTagsListApi
        .getTransfersTagsList()
        .then(response => {
          context.commit(
            mutationTypes.getTransfersTagsListSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getTransfersTagsListFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
