<template>
  <div class="page">
    <router-link :to="{name: 'expensesList'}"
      ><button class="exit-button">✕</button></router-link
    >
  </div>
</template>

<script>
export default {
  name: 'AppExitButton'
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
