<template>
  <div>
    <button class="exit-button" @click="changeShow()">✕</button>
    <app-transfer-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :key="renderKey"
      @transferSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppTransferForm from '@/components/TransferForm'
import {actionTypes} from '@/store/modules/editTransfer'

export default {
  name: 'AppEditTransfer',
  components: {
    AppTransferForm
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
      isSubmitting: state => state.editTransfer.isSubmitting,
      validationErrors: state => state.editTransfer.validationErrors
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
    onSubmit(transferInput) {
      const slug = this.initialValues.id
      this.$store
        .dispatch(actionTypes.editTransfer, {slug, transferInput})
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
