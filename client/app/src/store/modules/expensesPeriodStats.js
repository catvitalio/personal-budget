import expensesStatsApi from '@/api/expensesStats'

const state = {
  data: null,
  isLoading: false
}

export const mutationTypes = {
  getExpensesPeriodStatsStart: '[expensesPeriodStats] Get expenses stats start',
  getExpensesPeriodStatsSuccess:
    '[expensesPeriodStats] Get expenses stats success',
  getExpensesPeriodStatsFailure:
    '[expensesPeriodStats] Get expenses stats failure'
}

export const actionTypes = {
  getExpensesPeriodStats: '[expensesPeriodStats] Get expenses stats'
}

const mutations = {
  [mutationTypes.getExpensesPeriodStatsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getExpensesPeriodStatsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getExpensesPeriodStatsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getExpensesPeriodStats](context, yearMonthOrDay) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpensesPeriodStatsStart)
      expensesStatsApi
        .getExpensesPeriodStats(yearMonthOrDay)
        .then(response => {
          context.commit(
            mutationTypes.getExpensesPeriodStatsSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getExpensesPeriodStatsFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
