<template>
  <div class="page">
    <app-loading v-if="isLoading" />
    <app-exit-button :link="{name: 'expensesList'}" />
    <div v-if="expense">
      <div class="page-content">
        <h1>
          Расход со счета <span class="value">{{ expense.budget.name }}</span>
        </h1>
        <h3>
          Категория: <span class="value">{{ expense.category.name }}</span>
        </h3>
        <h3>
          Дата: <span class="value">{{ expense.date }}</span>
        </h3>
        <h3>
          Сумма: <span class="value">{{ expense.value }}</span>
        </h3>
        <h3>
          Теги:
          <span class="value">{{
            expense.tags.map(o => Object.values(o)[2])
          }}</span>
        </h3>

        <router-link :to="{name: 'editExpense', params: {slug: expense.id}}"
          ><button class="form-button">Изменить</button></router-link
        >
        <button class="form-button danger-button" @click="deleteExpense">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/expense'
import AppLoading from '@/components/Loading'
import AppExitButton from '@/components/ExitButton'

export default {
  name: 'AppExpense',
  components: {
    AppLoading,
    AppExitButton
  },
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
  },
  methods: {
    deleteExpense() {
      this.$store
        .dispatch(actionTypes.deleteExpense, {
          slug: this.$route.params.slug
        })
        .then(() => {
          this.$router.push({name: 'expensesList'})
        })
    }
  }
}
</script>
