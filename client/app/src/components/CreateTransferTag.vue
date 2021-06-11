<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-transfer-tag-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @transferTagSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppTransferTagForm from '@/components/TransferTagForm'
import {actionTypes} from '@/store/modules/createTransferTag'

export default {
  name: 'AppCreateTransferTag',
  components: {
    AppTransferTagForm
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
      isSubmitting: state => state.createTransferTag.isSubmitting,
      validationErrors: state => state.createTransferTag.validationErrors
    })
  },
  methods: {
    onSubmit(transferTagInput) {
      this.$store
        .dispatch(actionTypes.createTransferTag, transferTagInput)
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
