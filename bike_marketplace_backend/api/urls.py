from django.urls import path

from . import views

urlpatterns = [
    path("test/", views.TestView.as_view(), name="test"),
    path("auth/", views.Authentication.as_view(), name="auth"),
    path("listing/", views.Listings.as_view(), name="listings")
]