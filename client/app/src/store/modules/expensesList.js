import expensesListApi from '@/api/expensesList'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getExpensesListStart: '[expensesList] Get expenses list start',
  getExpensesListSuccess: '[expensesList] Get expenses list success',
  getExpensesListFailure: '[expenesesList] Get expenses list failure'
}

export const actionTypes = {
  getExpensesList: '[expensesList] Get expenses list'
}

const mutations = {
  [mutationTypes.getExpensesListStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getExpensesListSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getExpensesListFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getExpensesList](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpensesListStart)
      expensesListApi
        .getExpensesList()
        .then(response => {
          context.commit(mutationTypes.getExpensesListSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getExpensesListFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
