# Generated by Django 3.0.5 on 2020-05-07 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streaks', '0003_auto_20200501_1246'),
    ]

    operations = [
        migrations.AlterField(
            model_name='streak',
            name='start_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
