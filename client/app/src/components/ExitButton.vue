<template>
  <div>
    {{ show }}
    <button class="exit-button" @click="changeShow()">✕</button>
  </div>
</template>

<script>
export default {
  name: 'AppExitButton',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    changeShow() {
      this.$emit('update:show', (this.show = !this.show))
    }
  }
}
</script>

<style lang="scss">
.exit-button {
  font-size: $--font-size-subtitle;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: $--primary;
  transition: $--transition;
  cursor: pointer;
  &:hover {
    background-color: $--secondary;
    transition: $--transition;
  }
}
</style>
