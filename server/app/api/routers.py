from rest_framework import routers

from users.viewsets import UserViewSet, AuthViewSet
from budget.viewsets import (
    BudgetTypeViewSet,
    BudgetViewSet,
    ExpenseTagViewSet,
    ExpenseCategoryViewSet,
    ExpenseViewSet,
    IncomeTagViewSet,
    IncomeCategoryViewSet,
    IncomeViewSet,
    TransferTagViewSet,
    TransferViewSet,
    ExpenseStatsViewSet,
    ExpenseCategoryStatsViewSet,
    ExpenseTagStatsViewSet,
    ExpenseBudgetStatsViewSet,
    IncomeStatsViewSet,
    IncomeCategoryStatsViewSet,
    IncomeTagStatsViewSet,
    IncomeBudgetStatsViewSet,
    IncomeTagStatsViewSet
)


router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('auth/token', AuthViewSet, basename='auth')
router.register('budget', BudgetViewSet, basename='budgets')
router.register('budget_type', BudgetTypeViewSet, basename='budget_types')
router.register('expense', ExpenseViewSet, basename='expenses')
router.register('expense_category', ExpenseCategoryViewSet, basename='expense_categories')
router.register('expense_tag', ExpenseTagViewSet, basename="expense_tags")
router.register('income', IncomeViewSet, basename='income')
router.register('income_category', IncomeCategoryViewSet, basename='income_categories')
router.register('income_tag', IncomeTagViewSet, basename="income_tags")
router.register('transfer', TransferViewSet, basename='transfers')
router.register('transfer_tag', IncomeTagViewSet, basename="transfer_tags")
router.register('expense_stats', ExpenseStatsViewSet, basename="expense_stats")
router.register('expense_category_stats', ExpenseCategoryStatsViewSet, basename="expense_category_stats")
router.register('expense_budget_stats',ExpenseBudgetStatsViewSet, basename='expense_budget_stats')
router.register('expense_tag_stats', ExpenseTagStatsViewSet, basename="expense_tag_stats")
router.register('income_stats', IncomeStatsViewSet, basename="income_stats")
router.register('income_category_stats', IncomeCategoryStatsViewSet, basename="income_category_stats")
router.register('income_budget_stats', IncomeBudgetStatsViewSet, basename='income_budget_stats')
router.register('income_tag_stats', IncomeTagStatsViewSet, basename="income_tag_stats")