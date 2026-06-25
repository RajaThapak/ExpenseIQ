from django.urls import path
from .views import (
    CategoryCreateView,
    CategoryListView
)

urlpatterns = [
    path(
        "",
        CategoryCreateView.as_view(),
        name="create-category"
    ),

    path(
        "list/",
        CategoryListView.as_view(),
        name="list-category"
    ),
]