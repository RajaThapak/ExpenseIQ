from decimal import Decimal
from datetime import date

from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import DashboardSummarySerializer

from expenses.models import Expense
from budgets.models import Budget


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