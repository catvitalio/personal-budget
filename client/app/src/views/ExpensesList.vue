<template>
  <div class="page">
    <div v-if="isLoading">
      LOADING...
    </div>
    <div v-if="expenses">
      <router-link type="button" :to="{name: 'createExpense'}"
        ><button class="page-button">+</button></router-link
      >
      <div class="cards-list">
        <div v-for="expense in expenses" :key="expense">
          <div class="card">
            <router-link
              :to="{
                name: 'expense',
                params: {slug: expense.id}
              }"
            >
              <div class="content">
                <h3>{{ expense.date }}</h3>
                <h1>{{ expense.category.name }}</h1>
                <h2>{{ expense.value }}</h2>
                <p>{{ expense.budget.name | truncate(6, '...') }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <app-pagination
        v-if="total > 5"
        :hasNextPage="hasNextPage"
        :hasPrevPage="hasPrevPage"
        :total="total"
        @currentPage="fetchExpenses"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/expensesList'
import AppPagination from '@/components/Pagination'

export default {
  name: 'AppExpensesList',
  components: {
    AppPagination
  },
  data() {
    return {
      startPage: 1
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.expensesList.isLoading,
      expenses: state => state.expensesList.data.results,
      error: state => state.expensesList.error,
      total: state => state.expensesList.data.count,
      hasNextPage: state => Boolean(state.expensesList.data.next),
      hasPrevPage: state => Boolean(state.expensesList.data.previous)
    })
  },
  watch: {
    currentPage() {
      this.fetchExpenses(this.startPage)
    }
  },
  mounted() {
    this.fetchExpenses(this.startPage)
  },
  methods: {
    fetchExpenses(pageNumber) {
      this.$store.dispatch(actionTypes.getExpensesList, pageNumber)
    }
  }
}
</script>

<style lang="scss"></style>
