from django.urls import path, re_path, include

from frontend.views import index

urlpatterns = [
    path('', include('pwa.urls')),
    path('', index),
    re_path(r'^.*/$', index),
]
