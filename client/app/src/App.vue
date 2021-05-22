<template>
  <div>
    <app-topbar />
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import AppTopbar from '@/components/Topbar'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'App',
  components: {
    AppTopbar
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
