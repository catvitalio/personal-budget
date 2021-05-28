<template>
  <div class="page">
    <transition name="slide">
      <app-create-budget v-if="createForm" :show.sync="createForm" />
      <app-edit-budget
        v-if="editForm"
        :show.sync="editForm"
        :initialValues="editBudget"
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
    <div v-if="budgets">
      <div class="cards-list">
        <div v-for="budget in budgets" :key="budget">
          <div class="card">
            <button @click="deleteBudget(budget.id)">✕</button>
            <div class="content" @click="clickBudget(budget)">
              <h3>{{ budget.budget_type.name }}</h3>
              <h1>{{ budget.name }}</h1>
              <p>
                {{ budget.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/budgetsList'
import {actionTypes as editBudgetActionTypes} from '@/store/modules/editBudget'
import AppLoading from '@/components/Loading'
import AppCreateBudget from '@/components/CreateBudget'
import AppEditBudget from '@/components/EditBudget'

export default {
  name: 'AppBudgetsList',
  components: {
    AppLoading,
    AppCreateBudget,
    AppEditBudget
  },
  data() {
    return {
      createForm: false,
      editForm: false,
      editBudget: null
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.budgetsList.isLoading,
      budgets: state => state.budgetsList.data,
      error: state => state.budgetsList.error
    })
  },
  watch: {
    createForm() {
      this.fetchBudgets()
    },
    editForm() {
      this.fetchBudgets()
    }
  },
  mounted() {
    this.fetchBudgets()
  },
  methods: {
    fetchBudgets() {
      this.$store.dispatch(actionTypes.getBudgetsList)
    },
    clickBudget(budgetItem) {
      if (budgetItem === this.editBudget && this.editForm === true) {
        this.editForm = false
      } else if (budgetItem != this.budget && this.editForm === true) {
        this.editBudget = budgetItem
      } else {
        this.editForm = !this.editForm
        this.editBudget = budgetItem
      }
      this.createForm = false
    },
    deleteBudget(budgetId) {
      this.$store
        .dispatch(editBudgetActionTypes.deleteBudget, {
          slug: budgetId
        })
        .then(() => {
          this.fetchBudgets()
          this.editForm = false
        })
    }
  }
}
</script>
