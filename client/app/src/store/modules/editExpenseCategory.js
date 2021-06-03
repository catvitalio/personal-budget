import expenseCategoryApi from '@/api/expenseCategory'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  editExpenseCategoryStart: '[editExpenseCategory] Edit expenseCategory start',
  editExpenseCategorySuccess:
    '[editExpenseCategory] Edit expenseCategory success',
  editExpenseCategoryFailure:
    '[editExpenseCategory] Edit expenseCategory failure',

  deleteExpenseCategoryStart:
    '[editExpenseCategory] Delete expenseCategory start',
  deleteExpenseCategorySuccess:
    '[editExpenseCategory] Delete expenseCategory success',
  deleteExpenseCategoryFailure:
    '[editExpenseCategory] Delete expenseCategory failure'
}

export const actionTypes = {
  editExpenseCategory: '[editExpenseCategory] Edit expenseCategory',
  deleteExpenseCategory: '[editExpenseCategory] Delete expenseCategory'
}

const mutations = {
  [mutationTypes.editExpenseCategoryStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editExpenseCategorySuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editExpenseCategoryFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.deleteExpenseCategoryStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.deleteExpenseCategorySuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.deleteExpenseCategoryFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.editExpenseCategory](context, {slug, expenseCategoryInput}) {
    return new Promise(resolve => {
      context.commit(
        mutationTypes.editExpenseCategoryStart,
        expenseCategoryInput
      )
      expenseCategoryApi
        .editExpenseCategory(slug, expenseCategoryInput)
        .then(expenseCategory => {
          context.commit(
            mutationTypes.editExpenseCategorySuccess,
            expenseCategory.data
          )
          resolve(expenseCategory.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.editExpenseCategoryFailure,
            result.response.data
          )
        })
    })
  },
  [actionTypes.deleteExpenseCategory](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteExpenseCategoryStart, slug)
      expenseCategoryApi
        .deleteExpenseCategory(slug)
        .then(() => {
          context.commit(mutationTypes.deleteExpenseCategorySuccess)
          resolve()
        })
        .catch(result => {
          context.commit(
            mutationTypes.deleteExpenseCategoryFailure,
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
