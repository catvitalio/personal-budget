import incomeCategoryApi from '@/api/incomeCategory'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  editIncomeCategoryStart: '[editIncomeCategory] Edit incomeCategory start',
  editIncomeCategorySuccess: '[editIncomeCategory] Edit incomeCategory success',
  editIncomeCategoryFailure: '[editIncomeCategory] Edit incomeCategory failure',

  deleteIncomeCategoryStart: '[editIncomeCategory] Delete incomeCategory start',
  deleteIncomeCategorySuccess:
    '[editIncomeCategory] Delete incomeCategory success',
  deleteIncomeCategoryFailure:
    '[editIncomeCategory] Delete incomeCategory failure'
}

export const actionTypes = {
  editIncomeCategory: '[editIncomeCategory] Edit incomeCategory',
  deleteIncomeCategory: '[editIncomeCategory] Delete incomeCategory'
}

const mutations = {
  [mutationTypes.editIncomeCategoryStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editIncomeCategorySuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editIncomeCategoryFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.deleteIncomeCategoryStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.deleteIncomeCategorySuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.deleteIncomeCategoryFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.editIncomeCategory](context, {slug, incomeCategoryInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editIncomeCategoryStart, incomeCategoryInput)
      incomeCategoryApi
        .editIncomeCategory(slug, incomeCategoryInput)
        .then(incomeCategory => {
          context.commit(
            mutationTypes.editIncomeCategorySuccess,
            incomeCategory.data
          )
          resolve(incomeCategory.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.editIncomeCategoryFailure,
            result.response.data
          )
        })
    })
  },
  [actionTypes.deleteIncomeCategory](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteIncomeCategoryStart, slug)
      incomeCategoryApi
        .deleteIncomeCategory(slug)
        .then(() => {
          context.commit(mutationTypes.deleteIncomeCategorySuccess)
          resolve()
        })
        .catch(result => {
          context.commit(
            mutationTypes.deleteIncomeCategoryFailure,
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
