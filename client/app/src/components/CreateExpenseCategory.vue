<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-expense-category-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @expenseCategorySubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppExpenseCategoryForm from '@/components/ExpenseCategoryForm'
import {actionTypes} from '@/store/modules/createExpenseCategory'

export default {
  name: 'AppCreateExpenseCategory',
  components: {
    AppExpenseCategoryForm
  },
  data() {
    return {
      initialValues: {
        name: ''
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createExpenseCategory.isSubmitting,
      validationErrors: state => state.createExpenseCategory.validationErrors
    })
  },
  methods: {
    onSubmit(expenseCategoryInput) {
      this.$store
        .dispatch(actionTypes.createExpenseCategory, {expenseCategoryInput})
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
