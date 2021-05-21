<template>
  <div class="auth page">
    <h1>Вход</h1>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <input
          type="text"
          class="form-control"
          placeholder="Имя пользователя"
          v-model="username"
        />
      </fieldset>

      <fieldset>
        <input
          type="password"
          class="form-control"
          placeholder="Пароль"
          v-model="password"
        />
      </fieldset>
      <fieldset>
        <button class="form-button" :disabled="isSubmitting">
          Войти
        </button>
      </fieldset>
    </form>

    <app-validation-errors
      v-if="validationErrors"
      :validation-errors="validationErrors"
    ></app-validation-errors>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/ValidationErrors.vue'
import {actionTypes} from '@/store/modules/auth'
import {mapState} from 'vuex'

export default {
  name: 'AppLogin',
  components: {
    AppValidationErrors
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    onSubmit() {
      console.log('onSubmit')
      this.$store
        .dispatch(actionTypes.login, {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({name: 'home'})
        })
    }
  }
}
</script>
