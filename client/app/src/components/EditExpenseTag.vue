<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-expense-tag-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :key="renderKey"
      @expenseTagSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppExpenseTagForm from '@/components/ExpenseTagForm'
import {actionTypes} from '@/store/modules/editExpenseTag'

export default {
  name: 'AppEditExpenseTag',
  components: {
    AppExpenseTagForm
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
      isSubmitting: state => state.editExpenseTag.isSubmitting,
      validationErrors: state => state.editExpenseTag.validationErrors
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
    onSubmit(expenseTagInput) {
      const slug = this.initialValues.id
      this.$store
        .dispatch(actionTypes.editExpenseTag, {slug, expenseTagInput})
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
