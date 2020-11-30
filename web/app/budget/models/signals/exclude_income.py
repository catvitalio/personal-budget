from django.db.models.signals import post_delete
from django.dispatch import receiver

from budget.models import Income
from budget.models import Budget


@receiver(post_delete, sender=Income)
def exclude_income(sender, instance, **kwargs):
    budget = Budget.objects.get(id=instance.budget.id)
    budget.value -= instance.value
    budget.save()
