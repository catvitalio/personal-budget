<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-income-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :key="renderKey"
      @incomeSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppIncomeForm from '@/components/IncomeForm'
import {actionTypes} from '@/store/modules/editIncome'

export default {
  name: 'AppEditIncome',
  components: {
    AppIncomeForm
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
      isSubmitting: state => state.editIncome.isSubmitting,
      validationErrors: state => state.editIncome.validationErrors
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
    onSubmit(incomeInput) {
      const slug = this.initialValues.id
      this.$store
        .dispatch(actionTypes.editIncome, {slug, incomeInput})
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
