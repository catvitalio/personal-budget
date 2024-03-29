# Generated by Django 3.1.2 on 2021-05-23 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0004_auto_20210521_1347'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expense',
            name='name',
        ),
        migrations.RemoveField(
            model_name='income',
            name='name',
        ),
        migrations.RemoveField(
            model_name='transfer',
            name='name',
        ),
        migrations.AlterField(
            model_name='budget',
            name='value',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='expense',
            name='date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='expense',
            name='value',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='income',
            name='date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='income',
            name='value',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='transfer',
            name='date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='transfer',
            name='value',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
