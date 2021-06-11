import incomeCategoryApi from '@/api/incomeCategory'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createIncomeCategoryStart:
    '[createIncomeCategory] Create incomeCategory start',
  createIncomeCategorySuccess:
    '[createIncomeCategory] Create incomeCategory success',
  createIncomeCategoryFailure:
    '[createIncomeCategory] Create incomeCategory failure'
}

export const actionTypes = {
  createIncomeCategory: '[createIncomeCategory] Create incomeCategory'
}

const mutations = {
  [mutationTypes.createIncomeCategoryStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createIncomeCategorySuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createIncomeCategoryFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createIncomeCategory](context, {incomeCategoryInput}) {
    return new Promise(resolve => {
      context.commit(
        mutationTypes.createIncomeCategoryStart,
        incomeCategoryInput
      )
      incomeCategoryApi
        .createIncomeCategory(incomeCategoryInput)
        .then(incomeCategory => {
          context.commit(
            mutationTypes.createIncomeCategorySuccess,
            incomeCategory.data
          )
          resolve(incomeCategory.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createIncomeCategoryFailure,
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
