import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Expense from '@/views/Expense'
import EditExpense from '@/views/EditExpense'
import ExpensesList from '@/views/ExpensesList'

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
    path: '/expenses/:slug',
    name: 'expense',
    component: Expense
  },
  {
    path: '/expenses/:slug/edit',
    name: 'editExpense',
    component: EditExpense
  },
  {
    path: '/expenses',
    name: 'expensesList',
    component: ExpensesList
  },
  {
    path: '/incomes',
    name: 'incomesList'
  },
  {
    path: '/sources',
    name: 'sourcesList'
  },
  {
    path: '/transfers',
    name: 'transfersList'
  }
]

const router = new VueRouter({
  routes
})

export default router
