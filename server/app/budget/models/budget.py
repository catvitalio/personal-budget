from django.contrib.auth.models import User
from django.db import models
from model_utils import FieldTracker


class BudgetType(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name


class Budget(models.Model):
    name = models.CharField(max_length=255)
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
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


class ExpenseTag(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class ExpenseCategory(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name


class Expense(models.Model):
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    category = models.ForeignKey(
        ExpenseCategory,
        on_delete=models.CASCADE,
    )
    budget = models.ForeignKey(
        Budget,
        on_delete=models.CASCADE,
    )
    date = models.DateField()
    tags = models.ManyToManyField(ExpenseTag, blank=True)
    tracker = FieldTracker(fields=['value', 'budget'])


class IncomeTag(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class IncomeCategory(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name


class Income(models.Model):
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    category = models.ForeignKey(
        IncomeCategory,
        on_delete=models.CASCADE,
    )
    budget = models.ForeignKey(
        Budget,
        on_delete=models.CASCADE,
    )
    date = models.DateField()
    tags = models.ManyToManyField(IncomeTag, blank=True)
    tracker = FieldTracker(fields=['value', 'budget'])


class TransferTag(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Transfer(models.Model):
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    budget_from = models.ForeignKey(
        Budget,
        on_delete=models.CASCADE,
        related_name='transfer_from',
    )
    budget_to = models.ForeignKey(
        Budget,
        on_delete=models.CASCADE,
        related_name='transfer_to',
    )
    date = models.DateField()
    tags = models.ManyToManyField(TransferTag, blank=True)
    tracker = FieldTracker(fields=['value', 'budget_from', 'budget_to'])
