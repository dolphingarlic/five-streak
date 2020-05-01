from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from .views import UserViewSet, StreakViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'streaks', StreakViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh')
]