<template>
  <div class="page">
    <transition name="slide">
      <app-create-income-category v-if="createForm" :show.sync="createForm" />
      <app-edit-income-category
        v-if="editForm"
        :show.sync="editForm"
        :initialValues="editIncomeCategory"
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
            <button @click="deleteIncomeCategory(category.id)">
              ✖
            </button>
            <div class="content" @click="clickIncomeCategory(category)">
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
import {actionTypes} from '@/store/modules/incomesCategoriesList'
import {actionTypes as editIncomeCategoryActionTypes} from '@/store/modules/editIncomeCategory'
import AppLoading from '@/components/Loading'
import AppCreateIncomeCategory from '@/components/CreateIncomeCategory'
import AppEditIncomeCategory from '@/components/EditIncomeCategory'

export default {
  name: 'AppIncomesCategoriesList',
  components: {
    AppLoading,
    AppCreateIncomeCategory,
    AppEditIncomeCategory
  },
  data() {
    return {
      createForm: false,
      editForm: false,
      editIncomeCategory: null
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.incomesCategoriesList.isLoading,
      categories: state => state.incomesCategoriesList.data,
      error: state => state.incomesCategoriesList.error
    })
  },
  watch: {
    createForm() {
      this.fetchIncomesCategories()
    },
    editForm() {
      this.fetchIncomesCategories()
    }
  },
  mounted() {
    this.fetchIncomesCategories()
  },
  methods: {
    fetchIncomesCategories() {
      this.$store.dispatch(actionTypes.getIncomesCategoriesList)
    },
    clickIncomeCategory(incomeCategoryItem) {
      if (
        incomeCategoryItem === this.editIncomeCategory &&
        this.editForm === true
      ) {
        this.editForm = false
      } else if (
        incomeCategoryItem != this.incomeCategory &&
        this.editForm === true
      ) {
        this.editIncomeCategory = incomeCategoryItem
      } else {
        this.editForm = !this.editForm
        this.editIncomeCategory = incomeCategoryItem
      }
      this.createForm = false
    },
    deleteIncomeCategory(incomeCategoryId) {
      this.$store
        .dispatch(editIncomeCategoryActionTypes.deleteIncomeCategory, {
          slug: incomeCategoryId
        })
        .then(() => {
          this.fetchIncomesCategories()
          this.editForm = false
        })
    }
  }
}
</script>
