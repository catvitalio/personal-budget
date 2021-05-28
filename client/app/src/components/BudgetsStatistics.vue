<template>
  <div>
    <div class="bar select-form">
      <div class="bar choice">
        <div class="bar choice-item">
          <input type="radio" id="pie" value="pie" v-model="chartType" />
          <label for="pie">Круг</label>
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
        <div class="period choice-item">
          <input type="radio" id="day" value="?day=" v-model="period" />
          <label for="day">День</label>
          <br />
        </div>
      </div>

      <input class="year-input" v-model="year" placeholder="ГГГГ" />
      <multiselect
        v-if="month.value != ''"
        class="month-input"
        v-model="month"
        label="name"
        :options="monthList"
        :searchable="false"
        :show-labels="false"
        track-by="value"
        placeholder="ММ"
      ></multiselect>
      <input
        v-if="period == '?day='"
        class="day-input"
        v-model="day"
        placeholder="ДД"
      />

      <app-loading v-if="expensesIsLoading || incomesIsLoading" />
      <transition name="slide">
        <div v-if="expensesStats && incomesStats">
          <div v-if="objectNotEmpty(expensesStats)">
            <h2>Расходы:</h2>
            <bar-chart
              v-if="chartType == 'bar'"
              :chartData="expensesData"
              :options="{legend: {display: false}}"
            />
            <pie-chart v-if="chartType == 'pie'" :chartData="expensesData" />
          </div>

          <div v-if="objectNotEmpty(incomesStats)">
            <h2>Доходы:</h2>
            <bar-chart
              v-if="chartType == 'bar'"
              :chartData="incomesData"
              :options="{legend: {display: false}}"
            />
            <pie-chart v-if="chartType == 'pie'" :chartData="incomesData" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Multiselect from 'vue-multiselect'
import BarChart from './chart.js/BarChart'
import PieChart from './chart.js/PieChart'

import AppLoading from '@/components/Loading'
import {nowDate} from '@/helpers/utils'
import {getColors} from '@/helpers/utils'
import {actionTypes as expensesActionTypes} from '@/store/modules/expensesBudgetsStats'
import {actionTypes as incomesActionTypes} from '@/store/modules/incomesBudgetsStats'

export default {
  name: 'AppBudgetsStatistics',
  components: {
    AppLoading,
    BarChart,
    PieChart,
    Multiselect
  },
  data() {
    return {
      chartType: 'pie',
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
      ],
      day: '',
      dashDay: ''
    }
  },
  watch: {
    period() {
      if (this.period === '?year=') {
        this.month.value = ''
        this.day = ''
        this.dashDay = ''
      }
      if (this.period === '?month=') {
        this.day = ''
        this.dashDay = ''
        this.month.value = nowDate().substring(4, 7)
        this.month.name = this.monthList.filter(
          obj => obj.value == this.month.value
        )[0].name
      }
      if (this.period === '?day=') {
        this.month.value = nowDate().substring(4, 7)
        this.month.name = this.monthList.filter(
          obj => obj.value == this.month.value
        )[0].name
        this.day = nowDate().substring(8, 10)
      }
      this.fetchExpenses()
      this.fetchIncomes()
    },
    year() {
      this.fetchExpenses()
      this.fetchIncomes()

      console.log(this.expensesStats)
    },
    month() {
      this.fetchExpenses()
      this.fetchIncomes()
    },
    day() {
      this.dashDay = '-' + ('0' + this.day).slice(-2)
      this.fetchExpenses()
      this.fetchIncomes()
    }
  },
  computed: {
    ...mapState({
      expensesIsLoading: state => state.expensesBudgetsStats.isLoading,
      expensesStats: state => state.expensesBudgetsStats.data,
      incomesIsLoading: state => state.incomesBudgetsStats.isLoading,
      incomesStats: state => state.incomesBudgetsStats.data
    }),
    expensesData() {
      const labels = Object.keys(this.expensesStats)
      const datasets = [
        {
          label: 'Расходы',
          data: Object.values(this.expensesStats),
          backgroundColor: getColors(Object.values(this.expensesStats))
        }
      ]
      return {labels: labels, datasets: datasets}
    },
    incomesData() {
      const labels = Object.keys(this.incomesStats)
      const datasets = [
        {
          label: 'Доходы',
          data: Object.values(this.incomesStats),
          backgroundColor: getColors(Object.values(this.incomesStats))
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
      if (this.year.length == 4 && this.day.length < 3) {
        this.$store.dispatch(
          expensesActionTypes.getExpensesBudgetsStats,
          `${this.period}${this.year}${this.month.value}${this.dashDay}`
        )
      }
    },
    fetchIncomes() {
      if (this.year.length == 4 && this.day.length < 3) {
        this.$store.dispatch(
          incomesActionTypes.getIncomesBudgetsStats,
          `${this.period}${this.year}${this.month.value}${this.dashDay}`
        )
      }
    },
    objectNotEmpty(obj) {
      return Object.keys(obj).length != 0
    }
  }
}
</script>
