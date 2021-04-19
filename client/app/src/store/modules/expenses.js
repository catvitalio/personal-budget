import expensesApi from '@/api/expenses'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getExpensesStart: '[expenses] Get expenses start',
  getExpensesSuccess: '[expenses] Get expenses success',
  getExpensesFailure: '[expeneses] Get expenses failure'
}

export const actionTypes = {
  getExpenses: '[expenses] Get expenses'
}

const mutations = {
  [mutationTypes.getExpensesStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getExpensesSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getExpensesFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getExpenses](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpensesStart)
      expensesApi
        .getExpenses()
        .then(response => {
          context.commit(mutationTypes.getExpensesSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getExpensesFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
