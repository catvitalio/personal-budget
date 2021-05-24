from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import ValidationError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from django.db.models import Q

from budget.serializers import (
    BudgetTypeSerializer,
    BudgetSerializer,
    BudgetDetailSerializer,
    ExpenseTagSerializer,
    ExpenseCategorySerializer,
    ExpenseSerializer,
    ExpenseDetailSerializer,
    IncomeTagSerializer,
    IncomeCategorySerializer,
    IncomeSerializer,
    IncomeDetailSerializer,
    TransferTagSerializer,
    TransferSerializer,
    TransferDetailSerializer
)
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
from budget.permissions import (
    ObjectCreatorPermission,
    BudgetCreatorPermission,
    TransferCreatorPermission
)
from budget.mixins import (
    ObjectStatsViewSet,
    ObjectTimePeriodStatsViewSetMixin
)
from budget.services import (
    get_category_stats,
    get_budget_stats,
    get_tag_stats
)


class BudgetTypeViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = BudgetTypeSerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return BudgetType.objects.filter(
            Q(creator=self.request.user) | Q(creator=None)
        )


class BudgetViewSet(ModelViewSet):
    pagination_class = None
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return Budget.objects.filter(
            Q(creator=self.request.user) | Q(creator=None)
        )

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return BudgetDetailSerializer
        else:
            return BudgetSerializer


class ExpenseTagViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = ExpenseTagSerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return ExpenseTag.objects.filter(creator=self.request.user)


class ExpenseCategoryViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = ExpenseCategorySerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return ExpenseCategory.objects.filter(
            Q(creator=self.request.user) | Q(creator=None)
        )


class ExpenseViewSet(ModelViewSet):
    permission_classes = [BudgetCreatorPermission]

    def get_queryset(self):
        return Expense.objects.filter(
            budget__creator=self.request.user
        ).order_by('-date')

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return ExpenseDetailSerializer
        else:
            return ExpenseSerializer


class IncomeTagViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = IncomeTagSerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return IncomeTag.objects.filter(creator=self.request.user)


class IncomeCategoryViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = IncomeCategorySerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return IncomeCategory.objects.filter(
            Q(creator=self.request.user) | Q(creator=None)
        )


class IncomeViewSet(ModelViewSet):
    permission_classes = [BudgetCreatorPermission]

    def get_queryset(self):
        return Income.objects.filter(
            budget__creator=self.request.user
        ).order_by('-date')

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return IncomeDetailSerializer
        else:
            return IncomeSerializer


class TransferTagViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = TransferTagSerializer
    permission_classes = [ObjectCreatorPermission]

    def get_queryset(self):
        return TransferTag.objects.filter(creator=self.request.user)


class TransferViewSet(ModelViewSet):
    permission_classes = [TransferCreatorPermission]

    def get_queryset(self):
        return Transfer.objects.filter(
            budget_from__creator=self.request.user
        ).order_by('-date')

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return TransferDetailSerializer
        else:
            return TransferSerializer


class ExpenseStatsViewSet(ViewSet, ObjectTimePeriodStatsViewSetMixin):
    model = Expense


class ExpenseCategoryStatsViewSet(ViewSet, ObjectStatsViewSet):
    model = Expense
    service = get_category_stats


class ExpenseBudgetStatsViewSet(ViewSet, ObjectStatsViewSet):
    model = Expense
    service = get_budget_stats


class ExpenseTagStatsViewSet(ViewSet, ObjectStatsViewSet):
    model = Expense
    service = get_tag_stats


class IncomeStatsViewSet(ViewSet, ObjectTimePeriodStatsViewSetMixin):
    model = Income


class IncomeCategoryStatsViewSet(ViewSet, ObjectStatsViewSet):
    model = Income
    service = get_category_stats


class IncomeBudgetStatsViewSet(ViewSet, ObjectStatsViewSet):
    model = Income
    service = get_budget_stats


class IncomeTagStatsViewSet(ViewSet, ObjectStatsViewSet):
    model = Income
    service = get_tag_stats
