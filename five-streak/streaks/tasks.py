from datetime import datetime

from django.db.models import Q
from celery.schedules import crontab
from celery.task import periodic_task

from .models import Streak


@periodic_task(run_every=crontab(hour=0, minute=0))
def clear_inactive_streaks():
    print('Clearing inactive streaks...')
    Streak.objects.filter(~Q(last_edited=datetime.today()),
                          Q(active=True)).update(active=False)
