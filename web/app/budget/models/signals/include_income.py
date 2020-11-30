from django.db.models.signals import post_save
from django.dispatch import receiver

from budget.models import Income
from budget.models import Budget


@receiver(post_save, sender=Income)
def include_income(sender, instance, created, **kwargs):
    budget = Budget.objects.get(id=instance.budget.id)
    if created:
        budget.value += instance.value
    if not created:
        fields = instance.tracker
        if 'budget' in fields.changed():
            prev_budget = Budget.objects.get(id=fields.changed()['budget'])
            if 'value' in fields.changed():
                prev_budget.value -= fields.changed()['value']
            else:
                prev_budget.value -= instance.value
            prev_budget.save()
            budget.value += instance.value
        else:
            budget.value += instance.value - fields.changed()['value']
    budget.save()
