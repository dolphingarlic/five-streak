from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from streaks.models import Streak
from streaks.serializers import UserSerializer, StreakSerializer


class UserViewSet(ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny),
    authentication_classes = ()


class StreakViewSet(ModelViewSet):
    """
    API endpoint that allows streaks to be viewed or edited.
    """
    queryset = Streak.objects.all().order_by('-start_date')
    serializer_class = StreakSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class TopTenActiveStreaksView(APIView):
    """
    API endpoint that returns the top 10 active streaks by length and action count.
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        top_ten = Streak.objects.filter(
            active=True).order_by('start_date', 'action_count')[:10]
        serializer = StreakSerializer(top_ten, many=True)
        return Response(serializer.data)


class MyStreaksView(APIView):
    """
    API endpoint that returns the current user's streaks.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        streaks = Streak.objects.filter(
            user=request.user).order_by('-active', '-start_date')
        serializer = StreakSerializer(streaks, many=True)
        return Response(serializer.data)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    """
    API endpoint that logs the current user out and blacklists their JWT tokens.
    """
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format=None):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    """
    API endpoint that returns the current user.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
