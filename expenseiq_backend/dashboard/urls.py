from django.urls import path
from .views import DashboardSummaryView, RecentExpenseView, CategoryBreakdownView, TrendView, BudgetStatusView

urlpatterns = [
    path(
        "summary/",
        DashboardSummaryView.as_view(),
        name="dashboard-summary"
    ),
    path(
        "recent-expenses/",
        RecentExpenseView.as_view(),
        name="recent-expenses"
    ),
    path(
        "category-breakdown/",
        CategoryBreakdownView.as_view(),
        name="category-breakdown"
    ),
    path(
        "trend/",
        TrendView.as_view(),
        name="trend"
    ),
    path(
        "budget-status/",
        BudgetStatusView.as_view(),
        name="budget-status"
    )
]