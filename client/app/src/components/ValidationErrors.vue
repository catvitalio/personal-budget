<template>
  <ul class="error-messages">
    <li
      class="badge badge-pill badge-danger"
      v-for="errorMessage in errorMessages"
      :key="errorMessage"
    >
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(name => {
        const messages = this.validationErrors[name]
        return `${name}: ${messages}`
      })
    }
  }
}
</script>
