from django.urls import path, include
from . import views

urlpatterns = [

    path('logout', views.logout),
    path('', include('django.contrib.auth.urls')),
    path('', include('social_django.urls')),
    path('api/user', views.User.as_view()),
    path('api/auth', views.Authenticated.as_view()),
    path('api/login', views.GetLoginUrl.as_view()),
    path('api/logout', views.GetLogoutUrl.as_view())
]