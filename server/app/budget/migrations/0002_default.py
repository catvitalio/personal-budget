from django.db import migrations
import csv


def import_budget_types():
    from budget.models import BudgetType
    try:
        objs = []
        with open('/app/budget/migrations/budget.csv') as csv_file:
            reader = csv.reader(csv_file)
            for column in reader:
                objs.append(BudgetType(name=column[0]))
        return objs
    except FileNotFoundError:
        print('CSV-файл с типами бюджетов не найден (budget.csv)')


def import_expense_categories():
    from budget.models import ExpenseCategory
    try:
        objs = []
        with open('/app/budget/migrations/expense.csv') as csv_file:
            reader = csv.reader(csv_file)
            for column in reader:
                objs.append(ExpenseCategory(name=column[0]))
        return objs
    except FileNotFoundError:
        print('CSV-файл с категориями затрат не найден (expense.csv)')


def import_income_categories():
    from budget.models import IncomeCategory
    try:
        objs = []
        with open('/app/budget/migrations/income.csv') as csv_file:
            reader = csv.reader(csv_file)
            for column in reader:
                objs.append(IncomeCategory(name=column[0]))
        return objs
    except FileNotFoundError:
        print('CSV-файл с категориями поступлений не найден (income.csv)')


def create_default_values(apps, schema_editor):
    BudgetType = apps.get_model('budget', 'BudgetType')
    ExpenseCategory = apps.get_model('budget', 'ExpenseCategory')
    IncomeCategory = apps.get_model('budget', 'IncomeCategory')

    budget_objs = import_budget_types()
    BudgetType.objects.bulk_create(budget_objs)
    expense_objs = import_expense_categories()
    ExpenseCategory.objects.bulk_create(expense_objs)
    income_objs = import_income_categories()
    IncomeCategory.objects.bulk_create(income_objs)


def remove_default_values(apps, schema_editor):
    BudgetType = apps.get_model('budget', 'BudgetType')
    ExpenseCategory = apps.get_model('budget', 'ExpenseCategory')
    IncomeCategory = apps.get_model('budget', 'IncomeCategory')
    try:
        budget_objs = import_budget_types()
        BudgetType.objects.filter(name__in=budget_objs).delete()
        expense_objs = import_expense_categories()
        ExpenseCategory.objects.filter(name__in=expense_objs).delete()
        income_objs = import_income_categories()
        IncomeCategory.objects.filter(name__in=income_objs).delete()
    except TypeError:
        print('Объектов из миграции на данный момент нет в БД')


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0001_initial')
    ]

    operations = [
        migrations.RunPython(create_default_values, remove_default_values)
    ]