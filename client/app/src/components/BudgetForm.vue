<template>
  <div class="page">
    <form @submit.prevent="onSubmit">
      <fieldset class="default-fieldset">
        <input type="text" placeholder="Имя счета" v-model="name" />
      </fieldset>
      <fieldset class="singleselect-fieldset">
        <multiselect
          v-model="budget_type"
          label="name"
          :options="typesList"
          :searchable="false"
          :show-labels="false"
          track-by="id"
          placeholder="Тип"
        ></multiselect>
      </fieldset>
      <fieldset class="default-fieldset">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Количество средств"
          v-model="value"
        />
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
import budgetApi from '@/api/budget'
import AppValidationErrors from '@/components/ValidationErrors'
import Multiselect from 'vue-multiselect'

export default {
  name: 'AppBudgetForm',
  components: {
    AppValidationErrors,
    Multiselect
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
      name: this.initialValues.name,
      value: this.initialValues.value,
      budget_type: this.initialValues.budget_type,

      typesList: []
    }
  },
  mounted() {
    budgetApi.getBudgetsList().then(response => {
      this.budgetsList = response.data
    })
    budgetApi.getTypesList().then(response => {
      this.typesList = response.data
    })
  },
  methods: {
    onSubmit() {
      const form = {
        name: this.name,
        value: Number(this.value),
        budget_type: this.budget_type.id
      }
      this.$emit('budgetSubmit', form)
      console.log(form)
    }
  }
}
</script>
