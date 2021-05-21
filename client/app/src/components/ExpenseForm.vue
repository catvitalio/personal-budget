<template>
  <div class="page">
    <form @submit.prevent="onSubmit">
      <fieldset>
        <select class="form-select" v-model="budget">
          <option value="">Счет</option>
          <option v-for="item in budgetsList" :value="item.id" :key="item.id">{{
            item.name
          }}</option></select
        >
      </fieldset>
      <fieldset>
        <input type="number" placeholder="Значение" v-model="value" />
      </fieldset>
      <fieldset>
        <input type="date" placeholder="Дата" v-model="date" />
      </fieldset>
      <fieldset>
        <select type="text" placeholder="Категория" v-model="category">
          <option value="">Категория</option>
          <option
            v-for="item in categoriesList"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</option
          >
        </select>
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
import expenseApi from '@/api/expense'
import AppValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'AppExpenseForm',
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
      budget: this.initialValues.budget,
      value: this.initialValues.value,
      date: this.initialValues.date,
      category: this.initialValues.category,

      budgetsList: [],
      categoriesList: []
    }
  },
  mounted() {
    expenseApi.getBudgetsList().then(response => {
      this.budgetsList = response.data
    })
    expenseApi.getCategoriesList().then(response => {
      this.categoriesList = response.data
    })
  },
  methods: {
    onSubmit() {
      const form = {
        budget: Number(this.budget),
        value: Number(this.value),
        date: this.date,
        category: Number(this.category)
      }
      this.$emit('expenseSubmit', form)
    }
  }
}
</script>
