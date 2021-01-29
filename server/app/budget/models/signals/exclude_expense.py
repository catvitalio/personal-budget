from django.db.models.signals import post_delete
from django.dispatch import receiver

from budget.models import Expense
from budget.models import Budget


@receiver(post_delete, sender=Expense)
def exclude_expense(sender, instance, **kwargs):
    budget = Budget.objects.get(id=instance.budget.id)
    budget.value += instance.value
    budget.save()
