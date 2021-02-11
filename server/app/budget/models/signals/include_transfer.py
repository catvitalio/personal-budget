from django.db.models.signals import post_save
from django.dispatch import receiver

from budget.models import Budget
from budget.models import Transfer


@receiver(post_save, sender=Transfer)
def include_transfer(sender, instance, created, **kwargs):
    budget_from = Budget.objects.get(id=instance.budget_from.id)
    budget_to = Budget.objects.get(id=instance.budget_to.id)
    if created:
        budget_from.value -= instance.value
        budget_to.value += instance.value
    if not created:
        changed = instance.tracker.changed()
        if 'budget_from' in changed or 'budget_to' in changed:
            if 'budget_from' in changed:
                prev_budget_from = Budget.objects.get(
                    id=changed['budget_from'])
                if 'value' in changed:
                    prev_budget_from.value += changed['value']
                    budget_to.value += instance.value - changed['value']
                else:
                    prev_budget_from.value += instance.value
                prev_budget_from.save()
                budget_from.value -= instance.value
            if 'budget_to' in changed:
                prev_budget_to = Budget.objects.get(
                    id=changed['budget_to'])
                if 'value' in changed:
                    prev_budget_to.value -= changed['value']
                    budget_from.value -= instance.value - changed['value']
                else:
                    prev_budget_to.value -= instance.value
                prev_budget_to.save()
                budget_to.value += instance.value
        elif 'value' in changed:
            budget_from.value -= instance.value - changed['value']
            budget_to.value += instance.value - changed['value']
    budget_from.save()
    budget_to.save()
