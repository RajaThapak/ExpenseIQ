from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Budget
from .serializers import BudgetSerializer


class BudgetCreateView(generics.CreateAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


class BudgetListView(generics.ListAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(
            user=self.request.user
        ).order_by("-created_at")