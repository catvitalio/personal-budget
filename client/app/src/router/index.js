import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import ExpensesList from '@/views/ExpensesList'
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
    path: '/incomes',
    name: 'incomesList',
    component: IncomesList
  },
  {
    path: '/sources',
    name: 'sourcesList'
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
