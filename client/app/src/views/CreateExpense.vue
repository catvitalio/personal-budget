<template>
  <div>
    Create Expense
    <app-expense-form
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
import {actionTypes} from '@/store/modules/createExpense'

export default {
  name: 'AppCreateExpense',
  components: {
    AppExpenseForm
  },
  data() {
    return {
      initialValues: {
        budget: '',
        value: '',
        date: '',
        category: ''
      }
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createExpense.isSubmitting,
      validationErrors: state => state.createExpense.validationErrors
    })
  },
  methods: {
    onSubmit(expenseInput) {
      this.$store
        .dispatch(actionTypes.createExpense, {expenseInput})
        .then(() => {
          this.$router.push({name: 'expensesList'})
        })
    }
  }
}
</script>
