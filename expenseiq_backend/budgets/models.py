from django.db import models
from django.conf import settings
from categories.models import Category
from dateutil.relativedelta import relativedelta


class Budget(models.Model):

    BUDGET_TYPE_CHOICES = (
        ("monthly", "Monthly"),
        ("yearly", "Yearly"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="budgets"
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="budgets"
    )

    budget_type = models.CharField(
        max_length=10,
        choices=BUDGET_TYPE_CHOICES
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    start_date = models.DateField()

    end_date = models.DateField(editable=False)

    description = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):

        if self.start_date:

            if self.budget_type == "monthly":
                self.end_date = self.start_date + relativedelta(months=1, days=-1)

            elif self.budget_type == "yearly":
                self.end_date = self.start_date + relativedelta(years=1, days=-1)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category.name} Budget"