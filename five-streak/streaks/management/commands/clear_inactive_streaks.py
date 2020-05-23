from datetime import datetime

from django.core.management.base import BaseCommand, CommandError
from django.db.models import Q

from streaks.models import Streak


class Command(BaseCommand):
    help = 'Clears all streaks that weren\'t edited for more that 1 day'

    def handle(self, *args, **kwargs):
        Streak.objects.filter(~Q(last_updated=datetime.today()),
                              Q(active=True)).update(active=False)
        self.stdout.write(self.style.SUCCESS(
            'Successfully cleared inactive streaks'))
        return
