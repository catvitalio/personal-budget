import expensesStatsApi from '@/api/expensesStats'

const state = {
  data: null,
  isLoading: false
}

export const mutationTypes = {
  getExpensesBudgetsStatsStart:
    '[expensesBudgetsStats] Get expenses stats start',
  getExpensesBudgetsStatsSuccess:
    '[expensesBudgetsStats] Get expenses stats success',
  getExpensesBudgetsStatsFailure:
    '[expensesBudgetsStats] Get expenses stats failure'
}

export const actionTypes = {
  getExpensesBudgetsStats: '[expensesBudgetsStats] Get expenses stats'
}

const mutations = {
  [mutationTypes.getExpensesBudgetsStatsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getExpensesBudgetsStatsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getExpensesBudgetsStatsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getExpensesBudgetsStats](context, yearMonthOrDay) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpensesBudgetsStatsStart)
      expensesStatsApi
        .getExpensesBudgetsStats(yearMonthOrDay)
        .then(response => {
          context.commit(
            mutationTypes.getExpensesBudgetsStatsSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getExpensesBudgetsStatsFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
