from rest_framework.viewsets import ModelViewSet
from django.db.models import Q

from budget.serializers import (
    BudgetTypeSerializer,
    BudgetSerializer,
    BudgetDetailSerializer,
    ExpenseCategorySerializer,
    ExpenseSerializer,
    ExpenseDetailSerializer,
    IncomeCategorySerializer,
    IncomeSerializer,
    IncomeDetailSerializer,
    TransferSerializer,
    TransferDetailSerializer
)
from budget.models import (
    BudgetType,
    Budget,
    ExpenseCategory,
    Expense,
    IncomeCategory,
    Income,
    Transfer,
)
from budget.permissions import (
    ObjectCreatorPermission, 
    BudgetCreatorPermission,
    TransferCreatorPermission,
)


class BudgetTypeViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = BudgetTypeSerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return BudgetType.objects.filter(
            Q(creator=self.request.user) | Q(creator=None))


class BudgetViewSet(ModelViewSet):
    pagination_class = None
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return Budget.objects.filter(
            Q(creator=self.request.user) | Q(creator=None))

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return BudgetDetailSerializer
        else:
            return BudgetSerializer


class ExpenseCategoryViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = ExpenseCategorySerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return ExpenseCategory.objects.filter(
            Q(creator=self.request.user) | Q(creator=None))


class ExpenseViewSet(ModelViewSet):
    permission_classes = [BudgetCreatorPermission]

    def get_queryset(self):
        return Expense.objects.filter(
            Q(budget__creator=self.request.user) | Q(budget__creator=None))

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return ExpenseDetailSerializer
        else:
            return ExpenseSerializer


class IncomeCategoryViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = IncomeCategorySerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return IncomeCategory.objects.filter(
            Q(creator=self.request.user) | Q(creator=None))


class IncomeViewSet(ModelViewSet):
    permission_classes = [BudgetCreatorPermission]

    def get_queryset(self):
        return Income.objects.filter(
            Q(budget__creator=self.request.user) | Q(budget__creator=None))

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return IncomeDetailSerializer
        else:
            return IncomeSerializer


class TransferViewSet(ModelViewSet):
    permission_classes = [TransferCreatorPermission]

    def get_queryset(self):
        return Transfer.objects.filter(
                Q(budget_from__creator=self.request.user) | 
                Q(budget_to__creator=self.request.user))

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return TransferDetailSerializer
        else:
            return TransferSerializer
