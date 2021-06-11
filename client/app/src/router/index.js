import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import BudgetsList from '@/views/BudgetsList'
import ExpensesList from '@/views/ExpensesList'
import ExpensesCategoriesList from '@/views/ExpensesCategoriesList'
import ExpensesTagsList from '@/views/ExpensesTagsList'
import IncomesList from '@/views/IncomesList'
import IncomesCategoriesList from '@/views/IncomesCategoriesList'
import IncomesTagsList from '@/views/IncomesTagsList'
import TransfersList from '@/views/TransfersList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Personal Budget'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Регистрация'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Вход'
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/expenses',
    name: 'expensesList',
    component: ExpensesList,
    meta: {
      title: 'Расходы'
    }
  },
  {
    path: '/expenses-categories',
    name: 'expensesCategoriesList',
    component: ExpensesCategoriesList,
    meta: {
      title: 'Категории'
    }
  },
  {
    path: '/expenses-tags',
    name: 'expensesTagsList',
    component: ExpensesTagsList,
    meta: {
      title: 'Теги'
    }
  },
  {
    path: '/incomes',
    name: 'incomesList',
    component: IncomesList,
    meta: {
      title: 'Доходы'
    }
  },
  {
    path: '/incomes-categories',
    name: 'incomesCategoriesList',
    component: IncomesCategoriesList,
    meta: {
      title: 'Категории'
    }
  },
  {
    path: '/incomes-tags',
    name: 'incomesTagsList',
    component: IncomesTagsList,
    meta: {
      title: 'Теги'
    }
  },
  {
    path: '/budgets',
    name: 'budgetsList',
    component: BudgetsList,
    meta: {
      title: 'Счета'
    }
  },
  {
    path: '/transfers',
    name: 'transfersList',
    component: TransfersList,
    meta: {
      title: 'Переводы'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
