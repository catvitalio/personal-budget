<template>
  <div>
    <button class="exit-button" @click="changeShow()">✕</button>
    <app-budget-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @budgetSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppBudgetForm from '@/components/BudgetForm'
import {actionTypes} from '@/store/modules/createBudget'

export default {
  name: 'AppCreateBudget',
  components: {
    AppBudgetForm
  },
  data() {
    return {
      initialValues: {
        name: '',
        value: '',
        budget_type: ''
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
      isSubmitting: state => state.createBudget.isSubmitting,
      validationErrors: state => state.createBudget.validationErrors
    })
  },
  methods: {
    onSubmit(budgetInput) {
      this.$store.dispatch(actionTypes.createBudget, {budgetInput}).then(() => {
        this.changeShow()
      })
    },
    changeShow() {
      this.$emit('update:show', (this.show = !this.show))
    }
  }
}
</script>
