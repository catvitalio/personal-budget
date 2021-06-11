<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-expense-category-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :key="renderKey"
      @expenseCategorySubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppExpenseCategoryForm from '@/components/ExpenseCategoryForm'
import {actionTypes} from '@/store/modules/editExpenseCategory'

export default {
  name: 'AppEditExpenseCategory',
  components: {
    AppExpenseCategoryForm
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
      isSubmitting: state => state.editExpenseCategory.isSubmitting,
      validationErrors: state => state.editExpenseCategory.validationErrors
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
    onSubmit(expenseCategoryInput) {
      const slug = this.initialValues.id
      this.$store
        .dispatch(actionTypes.editExpenseCategory, {slug, expenseCategoryInput})
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
