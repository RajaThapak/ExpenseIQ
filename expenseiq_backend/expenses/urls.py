from django.urls import path
from .views import (
    ExpenseCreateView,
    ExpenseListView
)

urlpatterns = [
    path(
        "",
        ExpenseCreateView.as_view(),
        name="create-expense"
    ),

    path(
        "list/",
        ExpenseListView.as_view(),
        name="list-expense"
    ),
]