import incomeApi from '@/api/income'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createIncomeStart: '[createIncome] Create income start',
  createIncomeSuccess: '[createIncome] Create income success',
  createIncomeFailure: '[createIncome] Create income failure'
}

export const actionTypes = {
  createIncome: '[createIncome] Create income'
}

const mutations = {
  [mutationTypes.createIncomeStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createIncomeSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createIncomeFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createIncome](context, {incomeInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createIncomeStart, incomeInput)
      incomeApi
        .createIncome(incomeInput)
        .then(income => {
          context.commit(mutationTypes.createIncomeSuccess, income.data)
          resolve(income.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createIncomeFailure,
            result.response.data
          )
        })
    })
  },
  [actionTypes.createExpenseTag](context, tagInput) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createExpenseTagStart, tagInput)
      incomeApi
        .createExpenseTag(tagInput)
        .then(tag => {
          context.commit(mutationTypes.createExpenseTagSuccess, tag.data)
          resolve(tag.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createExpenseTagFailure,
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
