<template>
  <div>
    <app-exit-button :link="{name: 'expense', params: {slug: expense.id}}" />
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
import AppExitButton from '@/components/ExitButton'
import {actionTypes} from '@/store/modules/editExpense'

export default {
  name: 'AppEditExpense',
  components: {
    AppExpenseForm,
    AppExitButton
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
        budget: this.expense.budget,
        value: this.expense.value,
        date: this.expense.date,
        category: this.expense.category,
        tags: this.expense.tags
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
