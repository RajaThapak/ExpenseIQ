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

class TrendSerializer(serializers.Serializer):
    period = serializers.SerializerMethodField()
    amount = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )
    def get_period(self, obj):

        request = self.context["request"]
        period = request.query_params.get("period", "monthly")
        

        if period == "yearly":
            return obj["period"].strftime("%Y")

        return obj["period"].strftime("%b")

class BudgetStatusSerializer(serializers.Serializer):
    budget = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )
    spent = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )
    remaining = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )
    percentage_used = serializers.FloatField()
    status = serializers.CharField()