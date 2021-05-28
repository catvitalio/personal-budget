import incomeApi from '@/api/income'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  editIncomeStart: '[editIncome] Edit income start',
  editIncomeSuccess: '[editIncome] Edit income success',
  editIncomeFailure: '[editIncome] Edit income failure',

  deleteIncomeStart: '[editIncome] Delete income start',
  deleteIncomeSuccess: '[editIncome] Delete income success',
  deleteIncomeFailure: '[editIncome] Delete income failure'
}

export const actionTypes = {
  editIncome: '[editIncome] Edit income',
  deleteIncome: '[editIncome] Delete income'
}

const mutations = {
  [mutationTypes.editIncomeStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editIncomeSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editIncomeFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.deleteIncomeStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.deleteIncomeSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.deleteIncomeFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.editIncome](context, {slug, incomeInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editIncomeStart, incomeInput)
      incomeApi
        .editIncome(slug, incomeInput)
        .then(income => {
          context.commit(mutationTypes.editIncomeSuccess, income.data)
          resolve(income.data)
        })
        .catch(result => {
          context.commit(mutationTypes.editIncomeFailure, result.response.data)
        })
    })
  },
  [actionTypes.deleteIncome](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteIncomeStart, slug)
      incomeApi
        .deleteIncome(slug)
        .then(() => {
          context.commit(mutationTypes.deleteIncomeSuccess)
          resolve()
        })
        .catch(result => {
          context.commit(
            mutationTypes.deleteIncomeFailure,
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
