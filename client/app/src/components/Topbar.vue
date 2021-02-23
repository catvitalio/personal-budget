<template>
  <nav class="navbar navbar-expand-sm navbar-light">
    <router-link class="navbar-brand mb-0 h1" :to="{name: 'home'}">
      Personal Budget
    </router-link>

    <ul class="nav navbar-nav ml-auto">
      <template v-if="isAnonymous">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'login'}"
            active-class="active"
          >
            Войти
          </router-link>
        </li>
      </template>

      <template v-if="isLoggedIn">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}">
            Расходы
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}">
            Доходы
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}">
            {{ currentUser.username }}
          </router-link>
        </li>
      </template>
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
