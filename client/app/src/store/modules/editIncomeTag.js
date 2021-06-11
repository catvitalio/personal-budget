import incomeTagApi from '@/api/incomeTag'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  editIncomeTagStart: '[editIncomeTag] Edit incomeTag start',
  editIncomeTagSuccess: '[editIncomeTag] Edit incomeTag success',
  editIncomeTagFailure: '[editIncomeTag] Edit incomeTag failure',

  deleteIncomeTagStart: '[editIncomeTag] Delete incomeTag start',
  deleteIncomeTagSuccess: '[editIncomeTag] Delete incomeTag success',
  deleteIncomeTagFailure: '[editIncomeTag] Delete incomeTag failure'
}

export const actionTypes = {
  editIncomeTag: '[editIncomeTag] Edit incomeTag',
  deleteIncomeTag: '[editIncomeTag] Delete incomeTag'
}

const mutations = {
  [mutationTypes.editIncomeTagStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editIncomeTagSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editIncomeTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.deleteIncomeTagStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.deleteIncomeTagSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.deleteIncomeTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.editIncomeTag](context, {slug, incomeTagInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editIncomeTagStart, incomeTagInput)
      incomeTagApi
        .editIncomeTag(slug, incomeTagInput)
        .then(incomeTag => {
          context.commit(mutationTypes.editIncomeTagSuccess, incomeTag.data)
          resolve(incomeTag.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.editIncomeTagFailure,
            result.response.data
          )
        })
    })
  },
  [actionTypes.deleteIncomeTag](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteIncomeTagStart, slug)
      incomeTagApi
        .deleteIncomeTag(slug)
        .then(() => {
          context.commit(mutationTypes.deleteIncomeTagSuccess)
          resolve()
        })
        .catch(result => {
          context.commit(
            mutationTypes.deleteIncomeTagFailure,
            result.response.data
          )
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
