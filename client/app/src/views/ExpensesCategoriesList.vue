<template>
  <div class="page">
    <transition name="slide">
      <app-create-expense-category v-if="createForm" :show.sync="createForm" />
      <app-edit-expense-category
        v-if="editForm"
        :show.sync="editForm"
        :initialValues="editExpenseCategory"
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
    <app-loading v-if="isLoading" />
    <div v-if="categories">
      <div class="cards-list">
        <div v-for="category in categories" :key="category">
          <div v-if="category.creator != null" class="card">
            <button @click="deleteExpenseCategory(category.id)">
              ✕
            </button>
            <div class="content" @click="clickExpenseCategory(category)">
              <h1>{{ category.name }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/expensesCategoriesList'
import {actionTypes as editExpenseCategoryActionTypes} from '@/store/modules/editExpenseCategory'
import AppLoading from '@/components/Loading'
import AppCreateExpenseCategory from '@/components/CreateExpenseCategory'
import AppEditExpenseCategory from '@/components/EditExpenseCategory'

export default {
  name: 'AppExpensesCategoriesList',
  components: {
    AppLoading,
    AppCreateExpenseCategory,
    AppEditExpenseCategory
  },
  data() {
    return {
      createForm: false,
      editForm: false,
      editExpenseCategory: null
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.expensesCategoriesList.isLoading,
      categories: state => state.expensesCategoriesList.data,
      error: state => state.expensesCategoriesList.error
    })
  },
  watch: {
    createForm() {
      this.fetchExpensesCategories()
    },
    editForm() {
      this.fetchExpensesCategories()
    }
  },
  mounted() {
    this.fetchExpensesCategories()
  },
  methods: {
    fetchExpensesCategories() {
      this.$store.dispatch(actionTypes.getExpensesCategoriesList)
    },
    clickExpenseCategory(expenseCategoryItem) {
      if (
        expenseCategoryItem === this.editExpenseCategory &&
        this.editForm === true
      ) {
        this.editForm = false
      } else if (
        expenseCategoryItem != this.expenseCategory &&
        this.editForm === true
      ) {
        this.editExpenseCategory = expenseCategoryItem
      } else {
        this.editForm = !this.editForm
        this.editExpenseCategory = expenseCategoryItem
      }
      this.createForm = false
    },
    deleteExpenseCategory(expenseCategoryId) {
      this.$store
        .dispatch(editExpenseCategoryActionTypes.deleteExpenseCategory, {
          slug: expenseCategoryId
        })
        .then(() => {
          this.fetchExpensesCategories()
          this.editForm = false
        })
    }
  }
}
</script>
