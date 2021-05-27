import incomesStatsApi from '@/api/incomesStats'

const state = {
  data: null,
  isLoading: false
}

export const mutationTypes = {
  getIncomesCategoriesStatsStart:
    '[incomesCategoriesStats] Get incomes stats start',
  getIncomesCategoriesStatsSuccess:
    '[incomesCategoriesStats] Get incomes stats success',
  getIncomesCategoriesStatsFailure:
    '[incomesCategoriesStats] Get incomes stats failure'
}

export const actionTypes = {
  getIncomesCategoriesStats: '[incomesCategoriesStats] Get incomes stats'
}

const mutations = {
  [mutationTypes.getIncomesCategoriesStatsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getIncomesCategoriesStatsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getIncomesCategoriesStatsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getIncomesCategoriesStats](context, yearMonthOrDay) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getIncomesCategoriesStatsStart)
      incomesStatsApi
        .getIncomesCategoriesStats(yearMonthOrDay)
        .then(response => {
          context.commit(
            mutationTypes.getIncomesCategoriesStatsSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getIncomesCategoriesStatsFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
