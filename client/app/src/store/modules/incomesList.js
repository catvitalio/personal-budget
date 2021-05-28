import incomesListApi from '@/api/incomesList'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getIncomesListStart: '[incomesList] Get incomes list start',
  getIncomesListSuccess: '[incomesList] Get incomes list success',
  getIncomesListFailure: '[expenesesList] Get incomes list failure'
}

export const actionTypes = {
  getIncomesList: '[incomesList] Get incomes list'
}

const mutations = {
  [mutationTypes.getIncomesListStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getIncomesListSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getIncomesListFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getIncomesList](context, {pageNumber, sortBy, search}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getIncomesListStart)
      incomesListApi
        .getIncomesList(pageNumber, sortBy, search)
        .then(response => {
          context.commit(mutationTypes.getIncomesListSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getIncomesListFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
