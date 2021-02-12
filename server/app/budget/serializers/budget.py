from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import CurrentUserDefault
from rest_framework.serializers import PrimaryKeyRelatedField
from django.contrib.auth.models import User

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
    creator = PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=CurrentUserDefault()
    )

    class Meta:
        model = BudgetType
        fields = '__all__'


class BudgetSerializer(ModelSerializer):
    creator = PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=CurrentUserDefault()
    )

    class Meta:
        model = Budget
        fields = '__all__'


class ExpenseCategorySerializer(ModelSerializer):
    creator = PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=CurrentUserDefault()
    )

    class Meta:
        model = ExpenseCategory
        fields = '__all__'


class ExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class IncomeCategorySerializer(ModelSerializer):
    creator = PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=CurrentUserDefault()
    )

    class Meta:
        model = IncomeCategory
        fields = '__all__'


class IncomeSerializer(ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'


class TransferSerializer(ModelSerializer):
    class Meta:
        model = Transfer
        fields = '__all__'
