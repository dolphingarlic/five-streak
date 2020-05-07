from django.urls import path, re_path, include
from rest_framework import routers, permissions
from rest_framework_simplejwt import views as jwt_views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import UserViewSet, StreakViewSet, TopTenActiveStreaksView, MyStreaksView, LogoutAndBlacklistRefreshTokenForUserView, CurrentUserView

schema_view = get_schema_view(
    openapi.Info(
        title="Five Streak API",
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

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

    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger',
                                           cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc',
                                         cache_timeout=0), name='schema-redoc'),
]
