from rest_framework import routers

from users.views import UserViewSet
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
router.register('budget', BudgetViewSet, basename='budgets')
router.register('budget_type', BudgetTypeViewSet, basename='budget_types')
router.register('expense', ExpenseViewSet, basename='expenses')
router.register('expense_category', ExpenseCategoryViewSet, basename='expense_categories')
router.register('income', IncomeViewSet, basename='income')
router.register('income_category', IncomeCategoryViewSet, basename='income_categories')
