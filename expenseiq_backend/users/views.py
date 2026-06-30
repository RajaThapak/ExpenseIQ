from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class LoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):

        response = super().post(request, *args, **kwargs)

        access = response.data["access"]
        refresh = response.data["refresh"]

        response = Response(
            {
                "message": "Login successful"
            }
        )

        response.set_cookie(
            key="access_token",
            value=access,
            httponly=True,
            secure=False,      # True in production (HTTPS)
            samesite="Lax",
            max_age=60 * 60,
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh,
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 60 * 24 * 7,
        )

        return response

        
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "email": request.user.email,
            "username": request.user.username
        })
