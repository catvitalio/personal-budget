from rest_framework import permissions

from budget.models import Budget


class ObjectCreatorPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_authenticated and
            obj.creator == request.user or
            obj.creator is None
        )


class BudgetCreatorPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if (
            'budget' in request.data and
            Budget.objects.filter(pk=request.data['budget']).exists()
        ):
            budget = Budget.objects.get(pk=request.data['budget'])
            return (
                request.user.is_authenticated and
                budget.creator == request.user
            )
        else:
            return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_authenticated and
            obj.budget.creator == request.user or
            obj.budget.creator is None
        )


class TransferCreatorPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if (
            'budget_to' in request.data and
            'budget_from' in request.data and
            Budget.objects.filter(pk=request.data['budget_to']).exists() and
            Budget.objects.filter(pk=request.data['budget_from']).exists()
        ):
            budget_to = Budget.objects.get(pk=request.data['budget_to'])
            budget_from = Budget.objects.get(pk=request.data['budget_from'])
            return (
                request.user.is_authenticated and
                budget_to.creator == request.user and
                budget_from.creator == request.user
            )
        else:
            return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_authenticated and
            obj.budget_from.creator == request.user and
            obj.budget_to.creator == request.user
        )
