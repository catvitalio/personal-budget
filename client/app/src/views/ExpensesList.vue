<template>
  <div class="page">
    <app-loading v-if="isLoading" />
    <div v-if="expenses">
      <transition name="slide">
        <app-create-expense v-if="createForm" :show.sync="createForm" />
      </transition>
      <transition name="slide">
        <button
          @click="createForm = !createForm"
          v-if="!createForm"
          class="page-button"
        >
          +
        </button>
      </transition>
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
                <p>{{ expense.budget.name | truncate(7, '..') }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <transition name="fade">
        <app-pagination
          v-if="total > 5"
          :hasNextPage="hasNextPage"
          :hasPrevPage="hasPrevPage"
          :total="total"
          @currentPage="fetchExpenses"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/expensesList'
import AppPagination from '@/components/Pagination'
import AppLoading from '@/components/Loading'
import AppCreateExpense from '@/components/CreateExpense'

export default {
  name: 'AppExpensesList',
  components: {
    AppPagination,
    AppLoading,
    AppCreateExpense
  },
  data() {
    return {
      startPage: 1,
      createForm: false
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
    createForm() {
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
