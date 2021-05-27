import incomesStatsApi from '@/api/incomesStats'

const state = {
  data: null,
  isLoading: false
}

export const mutationTypes = {
  getIncomesTagsStatsStart: '[incomesTagsStats] Get incomes stats start',
  getIncomesTagsStatsSuccess: '[incomesTagsStats] Get incomes stats success',
  getIncomesTagsStatsFailure: '[incomesTagsStats] Get incomes stats failure'
}

export const actionTypes = {
  getIncomesTagsStats: '[incomesTagsStats] Get incomes stats'
}

const mutations = {
  [mutationTypes.getIncomesTagsStatsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getIncomesTagsStatsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getIncomesTagsStatsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getIncomesTagsStats](context, yearMonthOrDay) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getIncomesTagsStatsStart)
      incomesStatsApi
        .getIncomesTagsStats(yearMonthOrDay)
        .then(response => {
          context.commit(
            mutationTypes.getIncomesTagsStatsSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getIncomesTagsStatsFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
