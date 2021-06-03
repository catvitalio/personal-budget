import expenseCategoryApi from '@/api/expenseCategory'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createExpenseCategoryStart:
    '[createExpenseCategory] Create expenseCategory start',
  createExpenseCategorySuccess:
    '[createExpenseCategory] Create expenseCategory success',
  createExpenseCategoryFailure:
    '[createExpenseCategory] Create expenseCategory failure'
}

export const actionTypes = {
  createExpenseCategory: '[createExpenseCategory] Create expenseCategory'
}

const mutations = {
  [mutationTypes.createExpenseCategoryStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createExpenseCategorySuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createExpenseCategoryFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createExpenseCategory](context, {expenseCategoryInput}) {
    return new Promise(resolve => {
      context.commit(
        mutationTypes.createExpenseCategoryStart,
        expenseCategoryInput
      )
      expenseCategoryApi
        .createExpenseCategory(expenseCategoryInput)
        .then(expenseCategory => {
          context.commit(
            mutationTypes.createExpenseCategorySuccess,
            expenseCategory.data
          )
          resolve(expenseCategory.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createExpenseCategoryFailure,
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
