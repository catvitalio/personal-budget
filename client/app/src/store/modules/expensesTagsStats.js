import expensesStatsApi from '@/api/expensesStats'

const state = {
  data: null,
  isLoading: false
}

export const mutationTypes = {
  getExpensesTagsStatsStart: '[expensesTagsStats] Get expenses stats start',
  getExpensesTagsStatsSuccess: '[expensesTagsStats] Get expenses stats success',
  getExpensesTagsStatsFailure: '[expensesTagsStats] Get expenses stats failure'
}

export const actionTypes = {
  getExpensesTagsStats: '[expensesTagsStats] Get expenses stats'
}

const mutations = {
  [mutationTypes.getExpensesTagsStatsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getExpensesTagsStatsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getExpensesTagsStatsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getExpensesTagsStats](context, yearMonthOrDay) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpensesTagsStatsStart)
      expensesStatsApi
        .getExpensesTagsStats(yearMonthOrDay)
        .then(response => {
          context.commit(
            mutationTypes.getExpensesTagsStatsSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getExpensesTagsStatsFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
