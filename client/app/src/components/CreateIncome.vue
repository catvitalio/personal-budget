<template>
  <div>
    <button class="exit-button" @click="changeShow()">✕</button>
    <app-income-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @incomeSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppIncomeForm from '@/components/IncomeForm'
import {actionTypes} from '@/store/modules/createIncome'

export default {
  name: 'AppCreateIncome',
  components: {
    AppIncomeForm
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
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createIncome.isSubmitting,
      validationErrors: state => state.createIncome.validationErrors
    })
  },
  methods: {
    onSubmit(incomeInput) {
      this.$store.dispatch(actionTypes.createIncome, {incomeInput}).then(() => {
        this.changeShow()
      })
    },
    changeShow() {
      this.$emit('update:show', (this.show = !this.show))
    }
  }
}
</script>
