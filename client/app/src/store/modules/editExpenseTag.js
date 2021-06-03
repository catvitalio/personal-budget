import expenseTagApi from '@/api/expenseTag'

const state = {
  isSubmitting: false,
  validationErrors: null
}

export const mutationTypes = {
  editExpenseTagStart: '[editExpenseTag] Edit expenseTag start',
  editExpenseTagSuccess: '[editExpenseTag] Edit expenseTag success',
  editExpenseTagFailure: '[editExpenseTag] Edit expenseTag failure',

  deleteExpenseTagStart: '[editExpenseTag] Delete expenseTag start',
  deleteExpenseTagSuccess: '[editExpenseTag] Delete expenseTag success',
  deleteExpenseTagFailure: '[editExpenseTag] Delete expenseTag failure'
}

export const actionTypes = {
  editExpenseTag: '[editExpenseTag] Edit expenseTag',
  deleteExpenseTag: '[editExpenseTag] Delete expenseTag'
}

const mutations = {
  [mutationTypes.editExpenseTagStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editExpenseTagSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editExpenseTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  [mutationTypes.deleteExpenseTagStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.deleteExpenseTagSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.deleteExpenseTagFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.editExpenseTag](context, {slug, expenseTagInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.editExpenseTagStart, expenseTagInput)
      expenseTagApi
        .editExpenseTag(slug, expenseTagInput)
        .then(expenseTag => {
          context.commit(mutationTypes.editExpenseTagSuccess, expenseTag.data)
          resolve(expenseTag.data)
        })
        .catch(result => {
          context.commit(
            mutationTypes.editExpenseTagFailure,
            result.response.data
          )
        })
    })
  },
  [actionTypes.deleteExpenseTag](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteExpenseTagStart, slug)
      expenseTagApi
        .deleteExpenseTag(slug)
        .then(() => {
          context.commit(mutationTypes.deleteExpenseTagSuccess)
          resolve()
        })
        .catch(result => {
          context.commit(
            mutationTypes.deleteExpenseTagFailure,
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
