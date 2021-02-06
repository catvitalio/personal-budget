<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Регистрация</h1>

          <app-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></app-validation-errors>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Имя пользователя"
                v-model="username"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Пароль"
                v-model="password"
              />
            </fieldset>

            <button
              class="btn btn-lg btn-primary float-right"
              :disabled="isSubmitting"
            >
              Создать
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/ValidationErrors.vue'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'AppRegister',
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
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors
    }
  },
  methods: {
    onSubmit() {
      console.log('onSubmit')
      this.$store
        .dispatch(actionTypes.register, {
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
