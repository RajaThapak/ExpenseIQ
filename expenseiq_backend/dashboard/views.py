from decimal import Decimal
from django.db import models
from datetime import date
from rest_framework.generics import ListAPIView
from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import DashboardSummarySerializer,CategoryBreakdownSerializer
from .serializers import RecentExpenseSerializer
from expenses.models import Expense
from budgets.models import Budget
from django.db.models import F, Sum
from django.db.models.functions import Coalesce


class DashboardSummaryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        today = date.today()

        # Total Spending
        total_spending = (
            Expense.objects.filter(
                user=request.user
            ).aggregate(
                total=Sum("amount")
            )["total"] or Decimal("0.00")
        )

        # This Month Spending
        this_month = (
            Expense.objects.filter(
                user=request.user,
                date__month=today.month,
                date__year=today.year
            ).aggregate(
                total=Sum("amount")
            )["total"] or Decimal("0.00")
        )

        # Total Budget
        total_budget = (
            Budget.objects.filter(
                user=request.user
            ).aggregate(
                total=Sum("amount")
            )["total"] or Decimal("0.00")
        )

        # Remaining Budget
        remaining_budget = total_budget - total_spending

        # Number of Transactions
        transactions = Expense.objects.filter(
            user=request.user
        ).count()

        data = {
            "total_spending": total_spending,
            "this_month": this_month,
            "remaining_budget": remaining_budget,
            "transactions": transactions,
        }

        serializer = DashboardSummarySerializer(data)

        return Response(serializer.data)

class RecentExpenseView(ListAPIView):

    serializer_class = RecentExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Expense.objects
            .filter(user=self.request.user)
            .select_related("category")
            .order_by("-date", "-created_at")[:5]
        )

class CategoryBreakdownView(ListAPIView):

    serializer_class = CategoryBreakdownSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Expense.objects
            .filter(user=self.request.user)
            .values("category__name")
            .annotate(
                amount=Sum("amount")
            )
            .order_by("-amount")
        )