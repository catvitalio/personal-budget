<template>
  <div class="home page">
    <div class="start" v-if="isAnonymous">
      <h1>Personal Budget</h1>
      <img alt="Vue logo" src="../assets/logo.svg" />
    </div>
    <div class="statistics" v-if="isLoggedIn"><app-statistics /></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes} from '@/store/modules/auth'
import AppStatistics from '@/components/Statistics'

export default {
  name: 'Home',
  components: {
    AppStatistics
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    })
  }
}
</script>

<style lang="scss">
.start {
  text-align: center;
  font-size: 40px;
  display: table-cell;
  vertical-align: middle;
  img {
    width: 200px;
  }
}
</style>
