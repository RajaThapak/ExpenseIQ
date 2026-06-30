from django.urls import path
from .views import RegisterView, ProfileView
from .views import LoginView, RefreshTokenView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),
    path(
        "login/",
        LoginView.as_view(),
        name="login"
    ),
    path(
        "refresh/",
        RefreshTokenView.as_view(),
        name="refresh-token",
        
    ),
    path(
        "profile/",
        ProfileView.as_view()
    ),
]