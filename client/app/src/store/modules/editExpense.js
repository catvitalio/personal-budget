import expenseApi from '@/api/expense'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  editExpenseStart: '[editExpense] Edit expense start',
  editExpenseSuccess: '[editExpense] Edit expense success',
  editExpenseFailure: '[editExpense] Edit expense failure',

  deleteExpenseStart: '[editExpense] Delete expense start',
  deleteExpenseSuccess: '[editExpense] Delete expense success',
  deleteExpenseFailure: '[editExpense] Delete expense failure'
}

export const actionTypes = {
  editExpense: '[editExpense] Edit expense',
  deleteExpense: '[editExpense] Delete expense'
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
  [mutationTypes.deleteExpenseStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.deleteExpenseSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.deleteExpenseFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
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
  [actionTypes.deleteExpense](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteExpenseStart, slug)
      expenseApi
        .deleteExpense(slug)
        .then(() => {
          context.commit(mutationTypes.deleteExpenseSuccess)
          resolve()
        })
        .catch(result => {
          context.commit(
            mutationTypes.deleteExpenseFailure,
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
