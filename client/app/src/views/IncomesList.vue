<template>
  <div class="page">
    <transition name="slide">
      <app-create-income v-if="createForm" :show.sync="createForm" />
      <app-edit-income
        v-if="editForm"
        :show.sync="editForm"
        :initialValues="editIncome"
      />
    </transition>
    <transition name="slide">
      <button
        @click="createForm = !createForm"
        v-if="createForm === false && editForm === false"
        class="page-button"
      >
        +
      </button>
    </transition>
    <div class="buttons-list">
      <router-link :to="{name: 'incomesCategoriesList'}" exact>
        <button>
          Категории
        </button>
      </router-link>
      <router-link :to="{name: 'incomesTagsList'}" exact>
        <button>
          Теги
        </button>
      </router-link>
      <multiselect
        class="sort-choice"
        v-model="sortBy"
        label="name"
        :options="sortItemsList"
        :searchable="false"
        :show-labels="false"
        track-by="value"
        placeholder="Сортировка"
      ></multiselect>
    </div>
    <input class="search-field" v-model="search" placeholder="Поиск" />
    <app-loading v-if="isLoading" />
    <div v-if="incomes">
      <div class="cards-list">
        <div v-for="income in incomes" :key="income">
          <div class="card">
            <button @click="deleteIncome(income.id)">✖</button>
            <div class="content" @click="clickIncome(income)">
              <h3>{{ income.date }}</h3>
              <h1>{{ income.category.name }} ⇒ {{ income.budget.name }}</h1>
              <p>
                {{ income.value }}
              </p>
              <span
                v-for="tag in income.tags.map(tag => tag.name)"
                :key="tag"
                >{{ tag }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <transition name="fade">
        <app-pagination
          v-if="total > 5"
          :hasNextPage="hasNextPage"
          :hasPrevPage="hasPrevPage"
          :total="total"
          @currentPage="fetchIncomes"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Multiselect from 'vue-multiselect'
import {actionTypes} from '@/store/modules/incomesList'
import {actionTypes as editIncomeActionTypes} from '@/store/modules/editIncome'
import AppPagination from '@/components/Pagination'
import AppLoading from '@/components/Loading'
import AppCreateIncome from '@/components/CreateIncome'
import AppEditIncome from '@/components/EditIncome'

export default {
  name: 'AppIncomesList',
  components: {
    AppPagination,
    AppLoading,
    AppCreateIncome,
    AppEditIncome,
    Multiselect
  },
  data() {
    return {
      startPage: 1,
      createForm: false,
      editForm: false,
      editIncome: null,
      sortBy: {name: 'По дате добавления ↑', value: '-id'},
      sortItemsList: [
        {name: 'По дате добавления ↑', value: '-id'},
        {name: 'По дате добавления ↓', value: 'id'},
        {name: 'По дате ↑', value: '-date'},
        {name: 'По дате ↓', value: 'date'},
        {name: 'По категориям ↑', value: '-category'},
        {name: 'По категориям ↓', value: 'category'},
        {name: 'По счету ↑', value: '-budget'},
        {name: 'По счету ↓', value: 'budget'},
        {name: 'По значению ↑', value: '-value'},
        {name: 'По значению ↓', value: 'value'},
        {name: 'По тегам ↑', value: '-tags'},
        {name: 'По тегам ↓', value: 'tags'}
      ],
      search: ''
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.incomesList.isLoading,
      incomes: state => state.incomesList.data.results,
      error: state => state.incomesList.error,
      total: state => state.incomesList.data.count,
      hasNextPage: state => Boolean(state.incomesList.data.next),
      hasPrevPage: state => Boolean(state.incomesList.data.previous)
    })
  },
  watch: {
    createForm() {
      this.fetchIncomes(this.startPage)
    },
    editForm() {
      this.fetchIncomes(this.startPage)
    },
    sortBy() {
      this.fetchIncomes(this.startPage)
    },
    search() {
      this.fetchIncomes(this.startPage)
    }
  },
  mounted() {
    this.fetchIncomes(this.startPage)
  },
  methods: {
    fetchIncomes(pageNumber) {
      this.$store.dispatch(actionTypes.getIncomesList, {
        pageNumber: pageNumber,
        sortBy: this.sortBy.value,
        search: this.search
      })
    },
    clickIncome(incomeItem) {
      if (incomeItem === this.editIncome && this.editForm === true) {
        this.editForm = false
      } else if (incomeItem != this.income && this.editForm === true) {
        this.editIncome = incomeItem
      } else {
        this.editForm = !this.editForm
        this.editIncome = incomeItem
      }
      this.createForm = false
    },
    deleteIncome(incomeId) {
      this.$store
        .dispatch(editIncomeActionTypes.deleteIncome, {
          slug: incomeId
        })
        .then(() => {
          this.fetchIncomes(this.startPage)
          this.editForm = false
        })
    }
  }
}
</script>

<style lang="scss"></style>
