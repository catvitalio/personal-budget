<template>
  <div class="container page">
    <div v-if="isLoading" class="d-flex justify-content-center mt-4 pt-4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="expense">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <b-link :to="{name: 'expensesList'}"
            ><b-button pill variant="outline-dark mb-3">✕</b-button></b-link
          >
          <div>
            <b-card img-alt="Image" img-top tag="article">
              <b-card-title
                >Расход со счета {{ expense.budget.name }}
              </b-card-title>
              <b-card-text>Категория: {{ expense.category.name }}</b-card-text>
              <b-card-text>Дата: {{ expense.date }}</b-card-text>
              <b-card-text>Сумма: {{ expense.value }}</b-card-text>

              <b-link :to="{name: 'editExpense', params: {slug: expense.id}}"
                ><b-button variant="dark">Изменить</b-button></b-link
              >
              <b-link :to="{name: 'deleteExpense', params: {slug: expense.id}}"
                ><b-button variant="danger ml-1">Удалить</b-button></b-link
              >
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/expense'

export default {
  name: 'AppExpense',
  computed: {
    ...mapState({
      isLoading: state => state.expense.isLoading,
      expense: state => state.expense.data,
      error: state => state.expense.error
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getExpense, {
      slug: this.$route.params.slug
    })
  }
}
</script>
