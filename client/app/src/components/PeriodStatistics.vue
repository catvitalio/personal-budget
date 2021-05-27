<template>
  <div>
    <div class="bar select-form">
      <div class="bar choice">
        <div class="bar choice-item">
          <input type="radio" id="line" value="line" v-model="chartType" />
          <label for="line">График</label>
          <br />
        </div>
        <div class="bar choice-item">
          <input type="radio" id="bar" value="bar" v-model="chartType" />
          <label for="bar">Диаграмма</label>
          <br />
        </div>
      </div>
    </div>
    <div class="period select-form">
      <div class="period choice">
        <div class="period choice-item">
          <input type="radio" id="year" value="?year=" v-model="period" />
          <label for="year">Год</label>
          <br />
        </div>
        <div class="period choice-item">
          <input type="radio" id="month" value="?month=" v-model="period" />
          <label for="month">Месяц</label>
          <br />
        </div>
      </div>

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
          <line-chart v-if="chartType == 'line'" :chartData="data" />
          <bar-chart v-if="chartType == 'bar'" :chartData="data" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Multiselect from 'vue-multiselect'
import LineChart from './chart.js/LineChart'
import BarChart from './chart.js/BarChart'

import AppLoading from '@/components/Loading'
import {nowDate} from '@/helpers/utils'
import {actionTypes as expensesActionTypes} from '@/store/modules/expensesPeriodStats'
import {actionTypes as incomesActionTypes} from '@/store/modules/incomesPeriodStats'

export default {
  name: 'AppPeriodStatistics',
  components: {
    AppLoading,
    LineChart,
    BarChart,
    Multiselect
  },
  data() {
    return {
      chartType: 'line',
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
          backgroundColor: '#dc3912',
          data: Object.values(this.expensesStats)
        },
        {
          label: 'Доходы',
          backgroundColor: '#3366cc',
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
