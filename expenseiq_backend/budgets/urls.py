from django.urls import path
from .views import (
    BudgetCreateView,
    BudgetListView
)

urlpatterns = [
    path(
        "",
        BudgetCreateView.as_view(),
        name="create-budget"
    ),

    path(
        "list/",
        BudgetListView.as_view(),
        name="list-budget"
    ),
]