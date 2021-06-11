<template>
  <div class="page">
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
    <div class="buttons-list">
      <router-link :to="{name: 'expensesCategoriesList'}" exact>
        <button>
          Категории
        </button>
      </router-link>
      <router-link :to="{name: 'expensesTagsList'}" exact>
        <button>
          Теги
        </button>
      </router-link>
      <multiselect
        class="sort-choice"
        v-model="sortBy"
        label="name"
        :options="sortItemsList"
        :searchable="false"
        :show-labels="false"
        track-by="value"
        placeholder="Сортировка"
      ></multiselect>
    </div>
    <input class="search-field" v-model="search" placeholder="Поиск" />
    <app-loading v-if="isLoading" />
    <div v-if="expenses">
      <div class="cards-list">
        <div v-for="expense in expenses" :key="expense">
          <div class="card">
            <button @click="deleteExpense(expense.id)">✖</button>
            <div class="content" @click="clickExpense(expense)">
              <h3>{{ expense.date }}</h3>
              <h1>{{ expense.budget.name }} ⇒ {{ expense.category.name }}</h1>
              <p>
                {{ expense.value }}
              </p>
              <span
                v-for="tag in expense.tags.map(tag => tag.name)"
                :key="tag"
                >{{ tag }}</span
              >
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
import Multiselect from 'vue-multiselect'
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
    AppEditExpense,
    Multiselect
  },
  data() {
    return {
      startPage: 1,
      createForm: false,
      editForm: false,
      editExpense: null,
      sortBy: {name: 'По дате добавления ↑', value: '-id'},
      sortItemsList: [
        {name: 'По дате добавления ↑', value: '-id'},
        {name: 'По дате добавления ↓', value: 'id'},
        {name: 'По дате ↑', value: '-date'},
        {name: 'По дате ↓', value: 'date'},
        {name: 'По категориям ↑', value: '-category'},
        {name: 'По категориям ↓', value: 'category'},
        {name: 'По счету ↑', value: '-budget'},
        {name: 'По счету ↓', value: 'budget'},
        {name: 'По значению ↑', value: '-value'},
        {name: 'По значению ↓', value: 'value'},
        {name: 'По тегам ↑', value: '-tags'},
        {name: 'По тегам ↓', value: 'tags'}
      ],
      search: ''
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
    },
    sortBy() {
      this.fetchExpenses(this.startPage)
    },
    search() {
      this.fetchExpenses(this.startPage)
    }
  },
  mounted() {
    this.fetchExpenses(this.startPage)
  },
  methods: {
    fetchExpenses(pageNumber) {
      this.$store.dispatch(actionTypes.getExpensesList, {
        pageNumber: pageNumber,
        sortBy: this.sortBy.value,
        search: this.search
      })
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
