<template>
  <div class="container page">
    <div v-if="isLoading" class="d-flex justify-content-center mt-4 pt-4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="expenses">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <div class="list-group">
            <button type="button" class="btn btn-dark mt-4 mb-2">+</button>
            <div
              class="expenses-preview"
              v-for="expense in expenses.results"
              :key="expense"
            >
              <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ expense.category.name }}</h5>
                  <small class="text-muted">{{ expense.date }}</small>
                </div>
                <p class="mb-1">{{ expense.value }} руб.</p>
                <small class="text-muted">{{ expense.budget.name }}</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/expenses'

export default {
  name: 'AppExpenses',
  computed: {
    ...mapState({
      isLoading: state => state.expenses.isLoading,
      expenses: state => state.expenses.data,
      error: state => state.expenses.error
    })
  },
  watch: {
    currentPage() {
      this.fetchExpenses()
    }
  },
  mounted() {
    this.fetchExpenses()
  },
  methods: {
    fetchExpenses() {
      this.$store.dispatch(actionTypes.getExpenses)
    }
  }
}
</script>
