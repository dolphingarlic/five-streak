# Generated by Django 3.0.6 on 2020-05-12 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streaks', '0005_auto_20200507_2015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='streak',
            name='last_updated',
            field=models.DateField(auto_now=True),
        ),
    ]
