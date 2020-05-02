from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from .models import Streak
from .serializers import UserSerializer, StreakSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny),
    authentication_classes = ()


class StreakViewSet(ModelViewSet):
    queryset = Streak.objects.all().order_by('-start_date')
    serializer_class = StreakSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class TopTenActiveStreaksView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        top_ten = Streak.objects.filter(
            active=True).order_by('start_date')[:10]
        serializer = StreakSerializer(top_ten, many=True)
        return Response(serializer.data)


class MyStreaksView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        streaks = Streak.objects.filter(
            user=request.user).order_by('-active', '-start_date')
        serializer = StreakSerializer(streaks, many=True)
        return Response(serializer.data)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
