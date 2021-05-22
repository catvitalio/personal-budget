<template>
  <div>
    <app-exit-button :link="{name: 'expensesList'}" />
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
import AppExitButton from '@/components/ExitButton'
import {actionTypes} from '@/store/modules/createExpense'

export default {
  name: 'AppCreateExpense',
  components: {
    AppExpenseForm,
    AppExitButton
  },
  data() {
    return {
      initialValues: {
        budget: '',
        value: '',
        date: '',
        category: '',
        tags: []
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
