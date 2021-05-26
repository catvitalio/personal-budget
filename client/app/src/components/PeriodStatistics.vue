<template>
  <div>
    <div class="period-select-form">
      <h1>Статистика за период</h1>
      <group class="period-choice">
        <div class="period-item">
          <input type="radio" id="year" value="?year=" v-model="period" />
          <label for="year">Год</label>
          <br />
        </div>
        <div class="period-item">
          <input type="radio" id="month" value="?month=" v-model="period" />
          <label for="month">Месяц</label>
          <br />
        </div>
      </group>

      <input class="year-input" v-model="year" placeholder="Год" />
      <multiselect
        v-if="month.value != ''"
        class="month-input"
        v-model="month"
        label="name"
        :options="monthList"
        :searchable="false"
        :show-labels="false"
        track-by="value"
        placeholder="Месяц"
      ></multiselect>
    </div>

    <app-loading v-if="expensesIsLoading || incomesIsLoading" />
    <transition name="slide">
      <div v-if="expensesStats && incomesStats">
        <div v-if="data">
          <line-chart :chartData="data" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Multiselect from 'vue-multiselect'

import LineChart from './chart.js/LineChart'
import AppLoading from '@/components/Loading'
import {nowDate} from '@/helpers/utils'
import {actionTypes as expensesActionTypes} from '@/store/modules/expensesPeriodStats'
import {actionTypes as incomesActionTypes} from '@/store/modules/incomesPeriodStats'

export default {
  name: 'AppPeriodStatistics',
  components: {
    AppLoading,
    LineChart,
    Multiselect
  },
  data() {
    return {
      period: '?year=',
      year: nowDate().substring(0, 4),
      month: {name: '', value: ''},
      monthList: [
        {name: 'Январь', value: '-01'},
        {name: 'Февраль', value: '-02'},
        {name: 'Март', value: '-03'},
        {name: 'Апрель', value: '-04'},
        {name: 'Май', value: '-05'},
        {name: 'Июнь', value: '-06'},
        {name: 'Июль', value: '-07'},
        {name: 'Август', value: '-08'},
        {name: 'Сентябрь', value: '-09'},
        {name: 'Октябрь', value: '-10'},
        {name: 'Ноябрь', value: '-11'},
        {name: 'Декабрь', value: '-12'}
      ]
    }
  },
  watch: {
    period() {
      if (this.period === '?year=') this.month.value = ''
      if (this.period === '?month=') {
        this.month.value = nowDate().substring(4, 7)
        this.month.name = this.monthList.filter(
          obj => obj.value == this.month.value
        )[0].name
      }
      this.fetchExpenses()
      this.fetchIncomes()
    },
    year() {
      this.fetchExpenses()
      this.fetchIncomes()
    },
    month() {
      this.fetchExpenses()
      this.fetchIncomes()
    }
  },
  computed: {
    ...mapState({
      expensesIsLoading: state => state.expensesPeriodStats.isLoading,
      expensesStats: state => state.expensesPeriodStats.data,
      incomesIsLoading: state => state.incomesPeriodStats.isLoading,
      incomesStats: state => state.incomesPeriodStats.data
    }),
    data() {
      const labels = Object.keys(this.expensesStats)
      const datasets = [
        {
          label: 'Расходы',
          backgroundColor: '#f55c47',
          data: Object.values(this.expensesStats)
        },
        {
          label: 'Доходы',
          backgroundColor: '#87cefa',
          data: Object.values(this.incomesStats)
        }
      ]
      return {labels: labels, datasets: datasets}
    }
  },
  mounted() {
    this.fetchExpenses()
    this.fetchIncomes()
  },
  methods: {
    fetchExpenses() {
      if (this.year.length == 4) {
        this.$store.dispatch(
          expensesActionTypes.getExpensesPeriodStats,
          `${this.period}${this.year}${this.month.value}`
        )
      }
    },
    fetchIncomes() {
      if (this.year.length == 4) {
        this.$store.dispatch(
          incomesActionTypes.getIncomesPeriodStats,
          `${this.period}${this.year}${this.month.value}`
        )
      }
    }
  }
}
</script>
