from django.db import models
from django.conf import settings

class Category(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)

    type = models.CharField(
        max_length=20
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
        models.UniqueConstraint(
            fields=["user", "name"],
            name="unique_category_per_user"
        )
        ]

    def __str__(self):
        return self.name