import budgetApi from '@/api/budget'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  editBudgetStart: '[editBudget] Edit budget start',
  editBudgetSuccess: '[editBudget] Edit budget success',
  editBudgetFailure: '[editBudget] Edit budget failure',

  deleteBudgetStart: '[editBudget] Delete budget start',
  deleteBudgetSuccess: '[editBudget] Delete budget success',
  deleteBudgetFailure: '[editBudget] Delete budget failure'
}

export const actionTypes = {
  editBudget: '[editBudget] Edit budget',
  deleteBudget: '[editBudget] Delete budget'
}

const mutations = {
  [mutationTypes.editBudgetStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editBudgetSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editBudgetFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.deleteBudgetStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.deleteBudgetSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.deleteBudgetFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.editBudget](context, {slug, budgetInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editBudgetStart, budgetInput)
      budgetApi
        .editBudget(slug, budgetInput)
        .then(budget => {
          context.commit(mutationTypes.editBudgetSuccess, budget.data)
          resolve(budget.data)
        })
        .catch(result => {
          context.commit(mutationTypes.editBudgetFailure, result.response.data)
        })
    })
  },
  [actionTypes.deleteBudget](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteBudgetStart, slug)
      budgetApi
        .deleteBudget(slug)
        .then(() => {
          context.commit(mutationTypes.deleteBudgetSuccess)
          resolve()
        })
        .catch(result => {
          context.commit(
            mutationTypes.deleteBudgetFailure,
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
