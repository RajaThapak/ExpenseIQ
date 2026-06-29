from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Expense
from .serializers import ExpenseSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .filters import ExpenseFilter


class ExpenseCreateView(generics.CreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


class ExpenseListView(generics.ListAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_class = ExpenseFilter

    search_fields = [
        "title",
        "notes",
    ]

    ordering_fields = [
        "amount",
        "date",
        "created_at",
    ]

    ordering = [
        "-date",
    ]

    def get_queryset(self):
        return Expense.objects.filter(
            user=self.request.user
        )