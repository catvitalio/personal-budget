import budgetsListApi from '@/api/budgetsList'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getBudgetsListStart: '[budgetsList] Get budgets list start',
  getBudgetsListSuccess: '[budgetsList] Get budgets list success',
  getBudgetsListFailure: '[budgetsList] Get budgets list failure'
}

export const actionTypes = {
  getBudgetsList: '[budgetsList] Get budgets list'
}

const mutations = {
  [mutationTypes.getBudgetsListStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getBudgetsListSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getBudgetsListFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getBudgetsList](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getBudgetsListStart)
      budgetsListApi
        .getBudgetsList()
        .then(response => {
          context.commit(mutationTypes.getBudgetsListSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getBudgetsListFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
