<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-expense-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :key="renderKey"
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
  props: {
    show: {
      type: Boolean,
      required: true
    },
    initialValues: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.editExpense.isSubmitting,
      validationErrors: state => state.editExpense.validationErrors
    })
  },
  data() {
    return {
      renderKey: 0
    }
  },
  watch: {
    initialValues() {
      this.renderKey++
    }
  },
  methods: {
    onSubmit(expenseInput) {
      const slug = this.initialValues.id
      this.$store
        .dispatch(actionTypes.editExpense, {slug, expenseInput})
        .then(() => {
          this.changeShow()
        })
    },
    changeShow() {
      this.$emit('update:show', (this.show = !this.show))
    }
  }
}
</script>
