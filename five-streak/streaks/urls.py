from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from .views import UserViewSet, StreakViewSet, TopTenActiveStreaksView, MyStreaksView, LogoutAndBlacklistRefreshTokenForUserView, CurrentUserView

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'streaks', StreakViewSet)

urlpatterns = [
    path('top-ten/', TopTenActiveStreaksView.as_view()),
    path('my-streaks/', MyStreaksView.as_view()),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(),
         name='blacklist'),
    path('users/current/', CurrentUserView.as_view(), name='current_user'),
    path('', include(router.urls)),
]
