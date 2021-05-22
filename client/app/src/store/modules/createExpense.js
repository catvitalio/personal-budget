import expenseApi from '@/api/expense'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createExpenseStart: '[createExpense] Create expense start',
  createExpenseSuccess: '[createExpense] Create expense success',
  createExpenseFailure: '[createExpense] Create expense failure'
}

export const actionTypes = {
  createExpense: '[createExpense] Create expense'
}

const mutations = {
  [mutationTypes.createExpenseStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createExpenseSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createExpenseFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createExpense](context, {expenseInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createExpenseStart, expenseInput)
      expenseApi
        .createExpense(expenseInput)
        .then(expense => {
          context.commit(mutationTypes.createExpenseSuccess, expense.data)
          resolve(expense.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createExpenseFailure,
            result.response.data
          )
        })
    })
  },
  [actionTypes.createTag](context, tagInput) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createTagStart, tagInput)
      expenseApi
        .createTag(tagInput)
        .then(tag => {
          context.commit(mutationTypes.createTagSuccess, tag.data)
          resolve(tag.data)
        })
        .catch(result => {
          context.commit(mutationTypes.createTagFailure, result.response.data)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
