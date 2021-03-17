from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import CurrentUserDefault
from rest_framework.serializers import PrimaryKeyRelatedField
from rest_framework.serializers import ValidationError
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
    budget_type = BudgetTypeSerializer(read_only=True)

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
    category = ExpenseCategorySerializer(read_only=True)
    budget = BudgetSerializer(read_only=True)

    def validate(self, data):
        if data['value'] > data['budget'].value:
            raise ValidationError({
                'value': 'Недостаточно средств в единице бюджета'
            })

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
    category = IncomeCategorySerializer(read_only=True)
    budget = BudgetSerializer(read_only=True)

    class Meta:
        model = Income
        fields = '__all__'


class TransferSerializer(ModelSerializer):
    budget_from = BudgetSerializer(read_only=True)
    budget_to = BudgetSerializer(read_only=True)

    def validate(self, data):
        if data['value'] > data['budget_from'].value:
            raise ValidationError({
                'value': 'Недостаточно средств в единице бюджета (отправитель)'
            })

    class Meta:
        model = Transfer
        fields = '__all__'
