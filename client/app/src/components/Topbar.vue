<template>
  <nav>
    <ul class="navbar">
      <li v-if="isAnonymous">
        <router-link :to="{name: 'home'}" active-class="active" exact
          >PERSONAL BUDGET</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{name: 'home'}" active-class="active" exact
          >СТАТ</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{name: 'budgetsList'}" active-class="active"
          >СЧЕТА</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{name: 'expensesList'}" active-class="active"
          >РАСХОДЫ</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{name: 'incomesList'}" active-class="active"
          >ДОХОДЫ</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <router-link :to="{name: 'transfersList'}" active-class="active"
          >ПЕРЕВОДЫ</router-link
        >
      </li>
      <li v-if="isAnonymous">
        <router-link :to="{name: 'login'}" active-class="active"
          >ВОЙТИ</router-link
        >
      </li>
      <li v-if="isAnonymous">
        <router-link :to="{name: 'register'}" active-class="active"
          >ЗАРЕГИСТРИРОВАТЬСЯ</router-link
        >
      </li>
      <li v-if="isLoggedIn">
        <router-link class="nav-link" :to="{name: 'home'}">
          {{ currentUser.username | truncate(7, '..') }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {getterTypes} from '@/store/modules/auth'
import {mapGetters} from 'vuex'

export default {
  name: 'AppTopbar',
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    })
  }
}
</script>

<style lang="scss">
nav {
  font-size: $--font-size-base;
  font-weight: $--font-weight-medium;
  top: 0;
  width: 100%;
  a {
    color: $--text;
    text-decoration: none;
    transition: $--transition;
    .active {
      color: $--primary;
    }
    &:hover {
      color: $--secondary;
      transition: $--transition;
    }
  }
}

.navbar {
  list-style: none;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
</style>
