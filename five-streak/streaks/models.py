from django.db import models
from django.contrib.auth.models import User


class Streak(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    action_count = models.IntegerField(default=0)
    active = models.BooleanField(default=True)

    start_date = models.DateField(auto_now=True)
    end_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f'{self.user.username}\'s {"active" if self.active else "inactive"} streak'
