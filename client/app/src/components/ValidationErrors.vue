<template>
  <ul class="error-messages">
    <li
      class="danger"
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

<style lang="scss">
.error-messages {
  padding: 0;
  text-align: center;
}

.danger {
  list-style: none;
  font-size: 14px;
  margin-bottom: 10px;
  border-radius: $--border-radius;
  background-color: $--additional;
  font-weight: $--font-weight-light;
}
</style>
