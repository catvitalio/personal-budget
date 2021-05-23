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
.slide-enter-active {
  -moz-transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s;
  -o-transition-duration: 0.1s;
  transition-duration: 0.1s;
}

.slide-leave-active {
  -moz-transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s;
  -o-transition-duration: 0.1s;
  transition-duration: 0.1s;
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.2s;
}

.fade-enter-active {
  transition-delay: 0.2s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
