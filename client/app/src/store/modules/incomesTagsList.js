import incomesTagsListApi from '@/api/incomesTagsList'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getIncomesTagsListStart: '[incomesTagsList] Get incomesTags list start',
  getIncomesTagsListSuccess: '[incomesTagsList] Get incomesTags list success',
  getIncomesTagsListFailure: '[incomesTagsList] Get incomesTags list failure'
}

export const actionTypes = {
  getIncomesTagsList: '[incomesTagsList] Get incomesTags list'
}

const mutations = {
  [mutationTypes.getIncomesTagsListStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getIncomesTagsListSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getIncomesTagsListFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getIncomesTagsList](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getIncomesTagsListStart)
      incomesTagsListApi
        .getIncomesTagsList()
        .then(response => {
          context.commit(mutationTypes.getIncomesTagsListSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getIncomesTagsListFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
