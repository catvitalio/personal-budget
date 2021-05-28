<template>
  <div>
    <button class="exit-button" @click="changeShow()">✕</button>
    <app-transfer-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @transferSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppTransferForm from '@/components/TransferForm'
import {actionTypes} from '@/store/modules/createTransfer'

export default {
  name: 'AppCreateTransfer',
  components: {
    AppTransferForm
  },
  data() {
    return {
      initialValues: {
        budget_from: '',
        budget_to: '',
        value: '',
        date: '',
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
      isSubmitting: state => state.createTransfer.isSubmitting,
      validationErrors: state => state.createTransfer.validationErrors
    })
  },
  methods: {
    onSubmit(transferInput) {
      this.$store
        .dispatch(actionTypes.createTransfer, {transferInput})
        .then(() => {
          this.changeShow()
        })
      console.log(transferInput)
    },
    changeShow() {
      this.$emit('update:show', (this.show = !this.show))
    }
  }
}
</script>
