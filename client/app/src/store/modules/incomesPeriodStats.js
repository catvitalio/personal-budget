import incomesStatsApi from '@/api/incomesStats'

const state = {
  data: null,
  isLoading: false
}

export const mutationTypes = {
  getIncomesPeriodStatsStart: '[incomesPeriodStats] Get incomes stats start',
  getIncomesPeriodStatsSuccess:
    '[incomesPeriodStats] Get incomes stats success',
  getIncomesPeriodStatsFailure: '[incomesPeriodStats] Get incomes stats failure'
}

export const actionTypes = {
  getIncomesPeriodStats: '[incomesPeriodStats] Get incomes stats'
}

const mutations = {
  [mutationTypes.getIncomesPeriodStatsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getIncomesPeriodStatsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getIncomesPeriodStatsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getIncomesPeriodStats](context, yearMonthOrDay) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getIncomesPeriodStatsStart)
      incomesStatsApi
        .getIncomesPeriodStats(yearMonthOrDay)
        .then(response => {
          context.commit(
            mutationTypes.getIncomesPeriodStatsSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getIncomesPeriodStatsFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
