from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User

from .models import Streak
from .serializers import UserSerializer, StreakSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = []


class StreakViewSet(ModelViewSet):
    queryset = Streak.objects.all().order_by('-start_date')
    serializer_class = StreakSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
