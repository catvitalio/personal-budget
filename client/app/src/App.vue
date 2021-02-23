<template>
  <div>
    <app-topbar />
    <router-view />
  </div>
</template>

<script>
import AppTopbar from '@/components/Topbar'

export default {
  name: 'App',
  components: {
    AppTopbar
  }
}
</script>
