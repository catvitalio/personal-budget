from django.db.models.signals import post_save
from django.dispatch import receiver

from budget.models import Expense
from budget.models import Budget


@receiver(post_save, sender=Expense)
def include_expense(sender, instance, created, **kwargs):
    budget = Budget.objects.get(id=instance.budget.id)
    if created:
        budget.value -= instance.value
    if not created:
        changed = instance.tracker.changed()
        if 'budget' in changed:
            prev_budget = Budget.objects.get(id=changed['budget'])
            if 'value' in changed:
                prev_budget.value += changed['value']
            else:
                prev_budget.value += instance.value
            prev_budget.save()
            budget.value -= instance.value
        elif 'value' in changed:
            budget.value -= instance.value - changed['value']
    budget.save()
