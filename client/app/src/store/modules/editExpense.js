import expenseApi from '@/api/expense'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  expense: null
}

export const mutationTypes = {
  editExpenseStart: '[editExpense] Edit expense start',
  editExpenseSuccess: '[editExpense] Edit expense success',
  editExpenseFailure: '[editExpense] Edit expense failure',

  getExpenseStart: '[editExpense] Get expense start',
  getExpenseSuccess: '[editExpense] Get expense success',
  getExpenseFailure: '[editxpense] Get expense failure'
}

export const actionTypes = {
  editExpense: '[editExpense] Edit expense',
  getExpense: '[editExpense] Get expense'
}

const mutations = {
  [mutationTypes.editExpenseStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editExpenseSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editExpenseFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.getExpenseStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getExpenseSuccess](state, payload) {
    state.expense = payload
  },
  [mutationTypes.getExpenseFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.editExpense](context, {slug, expenseInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editExpenseStart, expenseInput)
      expenseApi
        .editExpense(slug, expenseInput)
        .then(expense => {
          context.commit(mutationTypes.editExpenseSuccess, expense.data)
          resolve(expense.data)
        })
        .catch(result => {
          context.commit(mutationTypes.editExpenseFailure, result.response.data)
        })
    })
  },
  [actionTypes.getExpense](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpenseStart)
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
  }
}

export default {
  state,
  actions,
  mutations
}
