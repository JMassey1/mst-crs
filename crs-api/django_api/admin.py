from django.contrib import admin
from .models import User, Room, Building, Booking

admin.site.register(User)
admin.site.register(Room)
admin.site.register(Building)
admin.site.register(Booking)
