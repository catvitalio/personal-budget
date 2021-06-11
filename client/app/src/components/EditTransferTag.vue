<template>
  <div>
    <button class="exit-button" @click="changeShow()">✖</button>
    <app-transfer-tag-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      :key="renderKey"
      @transferTagSubmit="onSubmit"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppTransferTagForm from '@/components/TransferTagForm'
import {actionTypes} from '@/store/modules/editTransferTag'

export default {
  name: 'AppEditTransferTag',
  components: {
    AppTransferTagForm
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
      isSubmitting: state => state.editTransferTag.isSubmitting,
      validationErrors: state => state.editTransferTag.validationErrors
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
    onSubmit(transferTagInput) {
      const slug = this.initialValues.id
      this.$store
        .dispatch(actionTypes.editTransferTag, {slug, transferTagInput})
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
