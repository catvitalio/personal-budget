from django.db.models.signals import post_delete
from django.dispatch import receiver

from budget.models import Budget
from budget.models import Transfer


@receiver(post_delete, sender=Transfer)
def exclude_transfer(sender, instance, **kwargs):
    budget_from = Budget.objects.get(id=instance.budget_from.id)
    budget_from.value += instance.value
    budget_from.save()

    budget_to = Budget.objects.get(id=instance.budget_to.id)
    budget_to.value -= instance.value
    budget_to.save()
