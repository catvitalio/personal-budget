import incomesCategoriesListApi from '@/api/incomesCategoriesList'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getIncomesCategoriesListStart:
    '[incomesCategoriesList] Get incomesCategories list start',
  getIncomesCategoriesListSuccess:
    '[incomesCategoriesList] Get incomesCategories list success',
  getIncomesCategoriesListFailure:
    '[incomesCategoriesList] Get incomesCategories list failure'
}

export const actionTypes = {
  getIncomesCategoriesList: '[incomesCategoriesList] Get incomesCategories list'
}

const mutations = {
  [mutationTypes.getIncomesCategoriesListStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getIncomesCategoriesListSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getIncomesCategoriesListFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getIncomesCategoriesList](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getIncomesCategoriesListStart)
      incomesCategoriesListApi
        .getIncomesCategoriesList()
        .then(response => {
          context.commit(
            mutationTypes.getIncomesCategoriesListSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getIncomesCategoriesListFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
