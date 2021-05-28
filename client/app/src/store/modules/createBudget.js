import budgetApi from '@/api/budget'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  createBudgetStart: '[createBudget] Create budget start',
  createBudgetSuccess: '[createBudget] Create budget success',
  createBudgetFailure: '[createBudget] Create budget failure'
}

export const actionTypes = {
  createBudget: '[createBudget] Create budget'
}

const mutations = {
  [mutationTypes.createBudgetStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createBudgetSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createBudgetFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createBudget](context, {budgetInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createBudgetStart, budgetInput)
      budgetApi
        .createBudget(budgetInput)
        .then(budget => {
          context.commit(mutationTypes.createBudgetSuccess, budget.data)
          resolve(budget.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.createBudgetFailure,
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
