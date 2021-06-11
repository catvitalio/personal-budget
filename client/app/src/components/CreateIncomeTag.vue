<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-income-tag-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @incomeTagSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppIncomeTagForm from '@/components/IncomeTagForm'
import {actionTypes} from '@/store/modules/createIncomeTag'

export default {
  name: 'AppCreateIncomeTag',
  components: {
    AppIncomeTagForm
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
      isSubmitting: state => state.createIncomeTag.isSubmitting,
      validationErrors: state => state.createIncomeTag.validationErrors
    })
  },
  methods: {
    onSubmit(incomeTagInput) {
      this.$store
        .dispatch(actionTypes.createIncomeTag, incomeTagInput)
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
