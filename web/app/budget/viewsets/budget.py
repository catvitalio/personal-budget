from rest_framework.viewsets import ModelViewSet
from django.db.models import Q

from budget.serializers import (
    BudgetTypeSerializer,
    BudgetSerializer,
    ExpenseCategorySerializer,
    ExpenseSerializer,
    IncomeCategorySerializer,
    IncomeSerializer,
)
from budget.models import (
    BudgetType,
    Budget,
    ExpenseCategory,
    Expense,
    IncomeCategory,
    Income,
)
from budget.permissions import ObjectCreatorPermission, BudgetCreatorPermission


class BudgetTypeViewSet(ModelViewSet):
    serializer_class = BudgetTypeSerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return BudgetType.objects.filter(
                Q(creator=self.request.user) | Q(creator=None)
        )


class BudgetViewSet(ModelViewSet):
    serializer_class = BudgetSerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return Budget.objects.filter(
                Q(creator=self.request.user) | Q(creator=None)
        )


class ExpenseCategoryViewSet(ModelViewSet):
    serializer_class = ExpenseCategorySerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return ExpenseCategory.objects.filter(
                Q(creator=self.request.user) | Q(creator=None)
        )


class ExpenseViewSet(ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [BudgetCreatorPermission]

    def get_queryset(self):
        return Expense.objects.filter(
                Q(budget__creator=self.request.user) | Q(budget__creator=None)
        )


class IncomeCategoryViewSet(ModelViewSet):
    serializer_class = IncomeCategorySerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return IncomeCategory.objects.filter(
                Q(creator=self.request.user) | Q(creator=None)
        )


class IncomeViewSet(ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
    permission_classes = [BudgetCreatorPermission]

    def get_queryset(self):
        return Income.objects.filter(
                Q(budget__creator=self.request.user) | Q(budget__creator=None)
        )
