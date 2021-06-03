import expensesTagsListApi from '@/api/expensesTagsList'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getExpensesTagsListStart: '[expensesTagsList] Get expensesTags list start',
  getExpensesTagsListSuccess:
    '[expensesTagsList] Get expensesTags list success',
  getExpensesTagsListFailure: '[expensesTagsList] Get expensesTags list failure'
}

export const actionTypes = {
  getExpensesTagsList: '[expensesTagsList] Get expensesTags list'
}

const mutations = {
  [mutationTypes.getExpensesTagsListStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getExpensesTagsListSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getExpensesTagsListFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getExpensesTagsList](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpensesTagsListStart)
      expensesTagsListApi
        .getExpensesTagsList()
        .then(response => {
          context.commit(
            mutationTypes.getExpensesTagsListSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getExpensesTagsListFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
