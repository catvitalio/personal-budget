<template>
  <div class="page">
    <form @submit.prevent="onSubmit">
      <fieldset class="default-fieldset">
        <input type="text" placeholder="Имя категории" v-model="name" />
      </fieldset>
      <fieldset>
        <button type="submit" class="form-button" :disabled="isSubmitting">
          Добавить
        </button>
      </fieldset>
    </form>

    <transition name="fade">
      <app-validation-errors v-if="errors" :validation-errors="errors" />
    </transition>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'AppIncomeCategoryForm',
  components: {
    AppValidationErrors
  },
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      name: this.initialValues.name
    }
  },
  methods: {
    onSubmit() {
      const form = {
        name: this.name
      }
      this.$emit('incomeCategorySubmit', form)
    }
  }
}
</script>
