<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-budget-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :key="renderKey"
      @budgetSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppBudgetForm from '@/components/BudgetForm'
import {actionTypes} from '@/store/modules/editBudget'

export default {
  name: 'AppEditBudget',
  components: {
    AppBudgetForm
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
      isSubmitting: state => state.editBudget.isSubmitting,
      validationErrors: state => state.editBudget.validationErrors
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
    onSubmit(budgetInput) {
      const slug = this.initialValues.id
      this.$store
        .dispatch(actionTypes.editBudget, {slug, budgetInput})
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
