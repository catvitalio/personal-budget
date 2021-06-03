import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import BudgetsList from '@/views/BudgetsList'
import ExpensesList from '@/views/ExpensesList'
import ExpensesCategoriesList from '@/views/ExpensesCategoriesList'
import IncomesList from '@/views/IncomesList'
import TransfersList from '@/views/TransfersList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/expenses',
    name: 'expensesList',
    component: ExpensesList
  },
  {
    path: '/expenses-categories',
    name: 'expensesCategoriesList',
    component: ExpensesCategoriesList
  },
  {
    path: '/incomes',
    name: 'incomesList',
    component: IncomesList
  },
  {
    path: '/budgets',
    name: 'budgetsList',
    component: BudgetsList
  },
  {
    path: '/transfers',
    name: 'transfersList',
    component: TransfersList
  }
]

const router = new VueRouter({
  routes
})

export default router
