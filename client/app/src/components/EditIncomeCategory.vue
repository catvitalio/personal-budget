<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-income-category-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :key="renderKey"
      @incomeCategorySubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppIncomeCategoryForm from '@/components/IncomeCategoryForm'
import {actionTypes} from '@/store/modules/editIncomeCategory'

export default {
  name: 'AppEditIncomeCategory',
  components: {
    AppIncomeCategoryForm
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
      isSubmitting: state => state.editIncomeCategory.isSubmitting,
      validationErrors: state => state.editIncomeCategory.validationErrors
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
    onSubmit(incomeCategoryInput) {
      const slug = this.initialValues.id
      this.$store
        .dispatch(actionTypes.editIncomeCategory, {slug, incomeCategoryInput})
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
