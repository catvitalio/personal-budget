from django.contrib import admin

from budget.models import (
    BudgetType,
    Budget,
    ExpenseTag,
    ExpenseCategory,
    Expense,
    IncomeTag,
    IncomeCategory,
    Income,
    TransferTag,
    Transfer
)


@admin.register(
    BudgetType,
    Budget,
    ExpenseTag,
    ExpenseCategory,
    Expense,
    IncomeTag,
    IncomeCategory,
    Income,
    TransferTag,
    Transfer
)
class BudgetAdmin(admin.ModelAdmin):
    pass
