from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.permissions import AllowAny

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        access = serializer.validated_data["access"]
        refresh = serializer.validated_data["refresh"]

        response = Response(
            {
                "message": "Login successful"
            },
            status=status.HTTP_200_OK
        )

        response.set_cookie(
            key="access_token",
            value=access,
            httponly=True,
            secure=False,          # True in production
            samesite="Lax",
            max_age=60 * 60,
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh,
            httponly=True,
            secure=False,          # True in production
            samesite="Lax",
            max_age=60 * 60 * 24 * 7,
        )

        return response

class RefreshTokenView(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):

        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token is None:
            return Response(
                {"detail": "Refresh token not found."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            refresh = RefreshToken(refresh_token)

            access_token = str(refresh.access_token)

            response = Response(
                {
                    "message": "Token refreshed successfully."
                },
                status=status.HTTP_200_OK
            )

            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=False,      # True in production
                samesite="Lax",
                max_age=60 * 60,
            )

            return response

        except TokenError:

            return Response(
                {
                    "detail": "Invalid or expired refresh token."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                pass

        response = Response(
            {
                "message": "Logout successful."
            },
            status=status.HTTP_200_OK
        )

        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "email": request.user.email,
            "username": request.user.username
        })
