<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-income-tag-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :key="renderKey"
      @incomeTagSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppIncomeTagForm from '@/components/IncomeTagForm'
import {actionTypes} from '@/store/modules/editIncomeTag'

export default {
  name: 'AppEditIncomeTag',
  components: {
    AppIncomeTagForm
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
      isSubmitting: state => state.editIncomeTag.isSubmitting,
      validationErrors: state => state.editIncomeTag.validationErrors
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
    onSubmit(incomeTagInput) {
      const slug = this.initialValues.id
      this.$store
        .dispatch(actionTypes.editIncomeTag, {slug, incomeTagInput})
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
