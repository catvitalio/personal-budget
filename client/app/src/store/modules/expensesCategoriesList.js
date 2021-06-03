import expensesCategoriesListApi from '@/api/expensesCategoriesList'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getExpensesCategoriesListStart:
    '[expensesCategoriesList] Get expensesCategories list start',
  getExpensesCategoriesListSuccess:
    '[expensesCategoriesList] Get expensesCategories list success',
  getExpensesCategoriesListFailure:
    '[expensesCategoriesList] Get expensesCategories list failure'
}

export const actionTypes = {
  getExpensesCategoriesList:
    '[expensesCategoriesList] Get expensesCategories list'
}

const mutations = {
  [mutationTypes.getExpensesCategoriesListStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getExpensesCategoriesListSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getExpensesCategoriesListFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getExpensesCategoriesList](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getExpensesCategoriesListStart)
      expensesCategoriesListApi
        .getExpensesCategoriesList()
        .then(response => {
          context.commit(
            mutationTypes.getExpensesCategoriesListSuccess,
            response.data
          )
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getExpensesCategoriesListFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
