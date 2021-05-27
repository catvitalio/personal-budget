import incomesStatsApi from '@/api/incomesStats'

const state = {
  data: null,
  isLoading: false
}

export const mutationTypes = {
  getIncomesBudgetsStatsStart: '[incomesBudgetsStats] Get incomes stats start',
  getIncomesBudgetsStatsSuccess:
    '[incomesBudgetsStats] Get incomes stats success',
  getIncomesBudgetsStatsFailure:
    '[incomesBudgetsStats] Get incomes stats failure'
}

export const actionTypes = {
  getIncomesBudgetsStats: '[incomesBudgetsStats] Get incomes stats'
}

const mutations = {
  [mutationTypes.getIncomesBudgetsStatsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getIncomesBudgetsStatsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getIncomesBudgetsStatsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getIncomesBudgetsStats](context, yearMonthOrDay) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getIncomesBudgetsStatsStart)
      incomesStatsApi
        .getIncomesBudgetsStats(yearMonthOrDay)
        .then(response => {
          context.commit(
            mutationTypes.getIncomesBudgetsStatsSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getIncomesBudgetsStatsFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
