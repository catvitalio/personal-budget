from rest_framework import permissions


class ObjectCreatorPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_authenticated and
            obj.creator == request.user or
            obj.creator == None
        )


class BudgetCreatorPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_authenticated and
            obj.budget.creator == request.user or
            obj.budget.creator == None
        )
