<template>
  <div class="page">
    <app-loading v-if="isLoading" />
    <div v-if="expenses">
      <transition name="slide">
        <app-create-expense v-if="createForm" :show.sync="createForm" />
        <app-edit-expense
          v-if="editForm"
          :show.sync="editForm"
          :initialValues="editExpense"
        />
      </transition>
      <transition name="slide">
        <button
          @click="createForm = !createForm"
          v-if="createForm === false && editForm === false"
          class="page-button"
        >
          +
        </button>
      </transition>
      <div class="cards-list">
        <div v-for="expense in expenses" :key="expense">
          <div class="card">
            <button @click="deleteExpense(expense.id)">✕</button>
            <div class="content" @click="clickExpense(expense)">
              <h3>{{ expense.date }}</h3>
              <h1>{{ expense.category.name }}</h1>
              <h2>{{ expense.value }}</h2>
              <p>{{ expense.budget.name | truncate(7, '..') }}</p>
            </div>
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
import {actionTypes as editExpenseActionTypes} from '@/store/modules/editExpense'
import AppPagination from '@/components/Pagination'
import AppLoading from '@/components/Loading'
import AppCreateExpense from '@/components/CreateExpense'
import AppEditExpense from '@/components/EditExpense'

export default {
  name: 'AppExpensesList',
  components: {
    AppPagination,
    AppLoading,
    AppCreateExpense,
    AppEditExpense
  },
  data() {
    return {
      startPage: 1,
      createForm: false,
      editForm: false,
      editExpense: null
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
    },
    editForm() {
      this.fetchExpenses(this.startPage)
    }
  },
  mounted() {
    this.fetchExpenses(this.startPage)
  },
  methods: {
    fetchExpenses(pageNumber) {
      this.$store.dispatch(actionTypes.getExpensesList, pageNumber)
    },
    clickExpense(expenseItem) {
      if (expenseItem === this.editExpense && this.editForm === true) {
        this.editForm = false
      } else if (expenseItem != this.expense && this.editForm === true) {
        this.editExpense = expenseItem
      } else {
        this.editForm = !this.editForm
        this.editExpense = expenseItem
      }
      this.createForm = false
    },
    deleteExpense(expenseId) {
      this.$store
        .dispatch(editExpenseActionTypes.deleteExpense, {
          slug: expenseId
        })
        .then(() => {
          this.fetchExpenses(this.startPage)
          this.editForm = false
        })
    }
  }
}
</script>

<style lang="scss"></style>
