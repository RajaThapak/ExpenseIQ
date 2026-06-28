from rest_framework import serializers
from expenses.models import Expense


class DashboardSummarySerializer(serializers.Serializer):
    total_spending = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    this_month = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    remaining_budget = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    transactions = serializers.IntegerField()

class RecentExpenseSerializer(serializers.ModelSerializer):

    category = serializers.CharField(source="category.name")

    class Meta:
        model = Expense
        fields = [
            "id",
            "title",
            "amount",
            "category",
            "date"
        ]


class CategoryBreakdownSerializer(serializers.Serializer):
    category = serializers.CharField(source="category__name")
    amount = serializers.DecimalField(
        max_digits=10,
        decimal_places=2
    )