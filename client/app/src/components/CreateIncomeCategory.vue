<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-income-category-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @incomeCategorySubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppIncomeCategoryForm from '@/components/IncomeCategoryForm'
import {actionTypes} from '@/store/modules/createIncomeCategory'

export default {
  name: 'AppCreateIncomeCategory',
  components: {
    AppIncomeCategoryForm
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
      isSubmitting: state => state.createIncomeCategory.isSubmitting,
      validationErrors: state => state.createIncomeCategory.validationErrors
    })
  },
  methods: {
    onSubmit(incomeCategoryInput) {
      this.$store
        .dispatch(actionTypes.createIncomeCategory, {incomeCategoryInput})
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
