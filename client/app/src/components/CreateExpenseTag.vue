<template>
  <div>
    <button class="exit-button" @click="changeShow()">✕</button>
    <app-expense-tag-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @expenseTagSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppExpenseTagForm from '@/components/ExpenseTagForm'
import {actionTypes} from '@/store/modules/createExpenseTag'

export default {
  name: 'AppCreateExpenseTag',
  components: {
    AppExpenseTagForm
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
      isSubmitting: state => state.createExpenseTag.isSubmitting,
      validationErrors: state => state.createExpenseTag.validationErrors
    })
  },
  methods: {
    onSubmit(expenseTagInput) {
      this.$store
        .dispatch(actionTypes.createExpenseTag, expenseTagInput)
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
