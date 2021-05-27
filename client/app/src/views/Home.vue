<template>
  <div class="home page">
    <div class="start" v-if="isAnonymous">
      <h1>Personal Budget</h1>
      <img alt="Vue logo" src="../assets/logo.svg" />
    </div>
    <div class="statistics" v-if="isLoggedIn">
      <div class="component select-form">
        <div class="component choice">
          <div class="component choice-item">
            <input
              type="radio"
              id="period"
              value="period"
              v-model="component"
            />
            <label for="period">Период</label>
            <br />
          </div>
          <div class="component choice-item">
            <input
              type="radio"
              id="categories"
              value="categories"
              v-model="component"
            />
            <label for="categories">Категории</label>
            <br />
          </div>
          <div class="component choice-item">
            <input
              type="radio"
              id="budgets"
              value="budgets"
              v-model="component"
            />
            <label for="budgets">Счета</label>
            <br />
          </div>
          <div class="component choice-item">
            <input type="radio" id="tags" value="tags" v-model="component" />
            <label for="tags">Теги</label>
            <br />
          </div>
        </div>
      </div>
      <transition name="fade">
        <app-period-statistics v-if="component == 'period'" />
        <app-categories-statistics v-if="component == 'categories'" />
        <app-budgets-statistics v-if="component == 'budgets'" />
        <app-tags-statistics v-if="component == 'tags'" />
      </transition>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes} from '@/store/modules/auth'
import AppPeriodStatistics from '@/components/PeriodStatistics'
import AppCategoriesStatistics from '@/components/CategoriesStatistics'
import AppBudgetsStatistics from '@/components/BudgetsStatistics'
import AppTagsStatistics from '@/components/TagsStatistics'

export default {
  name: 'Home',
  components: {
    AppPeriodStatistics,
    AppCategoriesStatistics,
    AppBudgetsStatistics,
    AppTagsStatistics
  },
  data() {
    return {
      component: 'period',
      componentList: ['period', 'categories']
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    })
  }
}
</script>

<style lang="scss">
.start {
  text-align: center;
  font-size: 40px;
  display: table-cell;
  vertical-align: middle;
  img {
    width: 200px;
  }
}
</style>
