import expensesStatsApi from '@/api/expensesStats'

const state = {
  data: null,
  isLoading: false
}

export const mutationTypes = {
  getExpensesCategoriesStatsStart:
    '[expensesCategoriesStats] Get expenses stats start',
  getExpensesCategoriesStatsSuccess:
    '[expensesCategoriesStats] Get expenses stats success',
  getExpensesCategoriesStatsFailure:
    '[expensesCategoriesStats] Get expenses stats failure'
}

export const actionTypes = {
  getExpensesCategoriesStats: '[expensesCategoriesStats] Get expenses stats'
}

const mutations = {
  [mutationTypes.getExpensesCategoriesStatsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getExpensesCategoriesStatsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getExpensesCategoriesStatsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getExpensesCategoriesStats](context, yearMonthOrDay) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpensesCategoriesStatsStart)
      expensesStatsApi
        .getExpensesCategoriesStats(yearMonthOrDay)
        .then(response => {
          context.commit(
            mutationTypes.getExpensesCategoriesStatsSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getExpensesCategoriesStatsFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
