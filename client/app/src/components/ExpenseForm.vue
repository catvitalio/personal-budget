<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <app-validation-errors v-if="errors" :validation-errors="errors" />

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <select class="form-control form-control-lg" v-model="budget">
                  <option value="">Счет</option>
                  <option
                    v-for="item in budgetsList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</option
                  ></select
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="number"
                  class="form-control form-control-lg"
                  placeholder="Значение"
                  v-model="value"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="date"
                  class="form-control form-control-lg"
                  placeholder="Дата"
                  v-model="date"
                />
              </fieldset>
              <fieldset class="form-group">
                <select
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Категория"
                  v-model="category"
                >
                  <option value="">Категория</option>
                  <option
                    v-for="item in categoriesList"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.name }}</option
                  >
                </select>
              </fieldset>
              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-lg pull-xs-right btn-dark"
                  :disabled="isSubmitting"
                >
                  Создать
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
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
      budget: '',
      value: '',
      date: '',
      category: '',

      budgetsList: [],
      categoriesList: []
    }
  },
  mounted() {
    expenseApi.getBudgetsList().then(response => {
      this.budgetsList = response.data.results
    })
    expenseApi.getCategoriesList().then(response => {
      this.categoriesList = response.data.results
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
