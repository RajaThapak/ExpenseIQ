from rest_framework import serializers
from .models import Budget


class BudgetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Budget
        fields = [
            "id",
            "category",
            "budget_type",
            "amount",
            "start_date",
            "end_date",
            "description",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "end_date",
            "created_at",
            "updated_at",
        ]

    def validate_category(self, value):
        request = self.context["request"]

        if value.user != request.user:
            raise serializers.ValidationError(
                "You cannot use another user's category."
            )

        return value