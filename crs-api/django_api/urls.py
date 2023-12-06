from django.contrib import admin
from django.urls import path, include
from . import views

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"rooms", views.RoomsView, basename="rooms")
router.register(r"buildings", views.BuildingsView, basename="buildings")
router.register(r"bookings", views.BookingsView, basename="bookings")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index, name="index"),
    path("api/", include(router.urls)),
    path("auth/", views.CustomAuthToken.as_view(), name="auth"),
]
