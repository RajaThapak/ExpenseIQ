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
from .serializers import TrendSerializer,BudgetStatusSerializer
from django.db.models.functions import TruncMonth, TruncYear
from django.utils import timezone


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

class TrendView(ListAPIView):

    serializer_class = TrendSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        period = self.request.query_params.get(
            "period",
            "monthly"
        )
        today = date.today()

        queryset = Expense.objects.filter(
            user=self.request.user
        )

        if period == "yearly":

            current_year = today.year

            return (
                queryset
                .filter(
                    date__year__gte=current_year - 4
                )
                .annotate(
                    period=TruncYear("date")
                )
                .values("period")
                .annotate(
                    amount=Sum("amount")
                )
                .order_by("period")
            )

        return (
            queryset
            .filter(
                date__year=today.year
            )
            .annotate(
                period=TruncMonth("date")
            )
            .values("period")
            .annotate(
                amount=Sum("amount")
            )
            .order_by("period")
        )

class BudgetStatusView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()

        budget = (
            Budget.objects.filter(
                user=request.user,
                start_date__lte=today,
                end_date__gte=today
            ).first()
        )

        if not budget:
            return Response({
                "budget": "0.00",
                "spent": "0.00",
                "remaining": "0.00",
                "percentage_used": 0,
                "status": "No Budget"
            })

        spent = (
            Expense.objects
            .filter(
                user=request.user,
                date__gte=budget.start_date,
                date__lte=budget.end_date
            )
            .aggregate(
                total=Coalesce(Sum("amount"), Decimal("0.00"))
            )["total"]
        )

        remaining = budget.amount - spent

        percentage = (
            float(spent / budget.amount * 100)
            if budget.amount > 0
            else 0
        )

        status = (
            "Over Budget"
            if spent > budget.amount
            else "Within Budget"
        )

        serializer = BudgetStatusSerializer({
            "budget": budget.amount,
            "spent": spent,
            "remaining": remaining,
            "percentage_used": round(percentage, 2),
            "status": status
        })

        return Response(serializer.data)