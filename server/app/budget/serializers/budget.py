from rest_framework.serializers import ModelSerializer

from budget.models import (
    BudgetType,
    Budget,
    ExpenseCategory,
    Expense,
    IncomeCategory,
    Income,
    Transfer,
)


class BudgetTypeSerializer(ModelSerializer):
    class Meta:
        model = BudgetType
        fields = '__all__'
        extra_kwargs = {'creator': {'allow_null': False}}


class BudgetSerializer(ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'


class ExpenseCategorySerializer(ModelSerializer):
    class Meta:
        model = ExpenseCategory
        fields = '__all__'
        extra_kwargs = {'creator': {'allow_null': False}}


class ExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class IncomeCategorySerializer(ModelSerializer):
    class Meta:
        model = IncomeCategory
        fields = '__all__'
        extra_kwargs = {'creator': {'allow_null': False}}


class IncomeSerializer(ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'


class TransferSerializer(ModelSerializer):
    class Meta:
        model = Transfer
        fields = '__all__'
