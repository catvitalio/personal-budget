from rest_framework import routers

from users.viewsets import AuthViewSet
from users.viewsets import UserViewSet
from budget.viewsets import (
    BudgetTypeViewSet,
    BudgetViewSet,
    ExpenseCategoryViewSet,
    ExpenseViewSet,
    IncomeCategoryViewSet,
    IncomeViewSet,
)


router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('auth/token', AuthViewSet, basename='auth')
router.register('budget', BudgetViewSet, basename='budgets')
router.register('budget/type', BudgetTypeViewSet, basename='budget_types')
router.register('expense', ExpenseViewSet, basename='expenses')
router.register('expense/category', ExpenseCategoryViewSet, basename='expense_categories')
router.register('income', IncomeViewSet, basename='income')
router.register('income/category', IncomeCategoryViewSet, basename='income_categories')
