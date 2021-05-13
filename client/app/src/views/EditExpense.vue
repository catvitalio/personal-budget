<template>
  <div>
    Edit Expense
    <app-expense-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @expenseSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppExpenseForm from '@/components/ExpenseForm'
import {actionTypes} from '@/store/modules/editExpense'

export default {
  name: 'AppEditExpense',
  components: {
    AppExpenseForm
  },
  /*  data() {
    return {
      initialValues: {
        budget: '',
        value: '',
        date: '',
        category: ''
      }
    }
  },*/
  computed: {
    ...mapState({
      isSubmitting: state => state.editExpense.isSubmitting,
      validationErrors: state => state.editExpense.validationErrors,
      isLoading: state => state.editExpense.isLoading,
      expense: state => state.editExpense.expense
    }),
    initialValues() {
      if (!this.expense) {
        return null
      }
      return {
        budget: this.expense.budget.id,
        value: this.expense.value,
        date: this.expense.date,
        category: this.expense.category.id
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getExpense, {
      slug: this.$route.params.slug
    })
  },
  methods: {
    onSubmit(expenseInput) {
      const slug = this.$route.params.slug
      this.$store
        .dispatch(actionTypes.editExpense, {slug, expenseInput})
        .then(expense => {
          this.$router.push({name: 'expense', params: {slug: expense.id}})
        })
    }
  }
}
</script>
