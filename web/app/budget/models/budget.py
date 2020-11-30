from django.contrib.auth.models import User
from django.db import models
from model_utils import FieldTracker


class BudgetType(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class Budget(models.Model):
    name = models.CharField(max_length=255)
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )
    budget_type = models.ForeignKey(
        BudgetType,
        on_delete=models.CASCADE,
    )
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class ExpenseCategory(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class Expense(models.Model):
    name = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )
    category = models.ForeignKey(
        ExpenseCategory,
        on_delete=models.CASCADE,
    )
    budget = models.ForeignKey(
        Budget,
        on_delete=models.CASCADE,
    )
    tracker = FieldTracker(fields=['value', 'budget'])


class IncomeCategory(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class Income(models.Model):
    name = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
    )
    category = models.ForeignKey(
        IncomeCategory,
        on_delete=models.CASCADE,
    )
    budget = models.ForeignKey(
        Budget,
        on_delete=models.CASCADE,
    )
    tracker = FieldTracker(fields=['value', 'budget'])
