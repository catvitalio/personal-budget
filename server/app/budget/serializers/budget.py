from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import CurrentUserDefault
from rest_framework.serializers import PrimaryKeyRelatedField
from rest_framework.serializers import ValidationError
from django.contrib.auth.models import User

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


class BudgetDetailSerializer(BudgetSerializer, BudgetSerializer.Meta):
    budget_type = BudgetTypeSerializer(read_only=True)


class ExpenseTagSerializer(ModelSerializer):
    def validate(self, data):
        user = self.context['request'].user.id
        tags = self.__class__.Meta.model.objects.filter(
            creator=user, name=data["name"]
        )
        if tags.exists():
            raise ValidationError({
                'name': 'Тег с таким именем уже существует'
            })
        return data

    creator = PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=CurrentUserDefault()
    )

    class Meta:
        model = ExpenseTag
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
    def validate(self, data):
        if data['value'] > data['budget'].value:
            raise ValidationError({
                'value': 'Недостаточно средств в единице бюджета'
            })
        return data

    class Meta:
        model = Expense
        fields = '__all__'


class ExpenseDetailSerializer(ExpenseSerializer, ExpenseSerializer.Meta):
    category = ExpenseCategorySerializer(read_only=True)
    budget = BudgetSerializer(read_only=True)
    tags = ExpenseTagSerializer(many=True, read_only=True)


class IncomeTagSerializer(ExpenseTagSerializer):
    class Meta:
        model = IncomeTag
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


class IncomeDetailSerializer(IncomeSerializer, IncomeSerializer.Meta):
    category = IncomeCategorySerializer(read_only=True)
    budget = BudgetSerializer(read_only=True)
    tags = IncomeTagSerializer(many=True, read_only=True)


class TransferTagSerializer(ExpenseTagSerializer):
    class Meta:
        model = TransferTag
        fields = '__all__'


class TransferSerializer(ModelSerializer):
    def validate(self, data):
        if data['value'] > data['budget_from'].value:
            raise ValidationError({
                'value': 'Недостаточно средств в единице бюджета (отправитель)'
            })
        return data

    class Meta:
        model = Transfer
        fields = '__all__'


class TransferDetailSerializer(TransferSerializer, TransferSerializer.Meta):
    budget_from = BudgetSerializer(read_only=True)
    budget_to = BudgetSerializer(read_only=True)
    tags = TransferTagSerializer(many=True, read_only=True)
