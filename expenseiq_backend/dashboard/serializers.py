from rest_framework import serializers


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