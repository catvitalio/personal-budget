import expenseApi from '@/api/expense'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getExpenseStart: '[expense] Get expense start',
  getExpenseSuccess: '[expense] Get expense success',
  getExpenseFailure: '[expenese] Get expense failure',

  deleteExpenseStart: '[expense] Delete expense start',
  deleteExpenseSuccess: '[expense] Delete expense success',
  deleteExpenseFailure: '[expenese] Delete expense failure'
}

export const actionTypes = {
  getExpense: '[expense] Get expense',
  deleteExpense: '[expense] Delete expense'
}

const mutations = {
  [mutationTypes.getExpenseStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getExpenseSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getExpenseFailure](state) {
    state.isLoading = false
  },
  [mutationTypes.deleteExpenseStart]() {},
  [mutationTypes.deleteExpenseSuccess]() {},
  [mutationTypes.deleteExpenseFailure]() {}
}

const actions = {
  [actionTypes.getExpense](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpenseStart, slug)
      expenseApi
        .getExpense(slug)
        .then(expense => {
          context.commit(mutationTypes.getExpenseSuccess, expense.data)
          resolve(expense.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getExpenseFailure)
        })
    })
  },
  [actionTypes.deleteExpense](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteExpenseStart, slug)
      expenseApi
        .deleteExpense(slug)
        .then(() => {
          context.commit(mutationTypes.deleteExpenseSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteExpenseFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
