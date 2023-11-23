from django.http import HttpResponse

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import RoomSerializer, BuildingSerializer, UserSerializer, BookingSerializer
from .models import Room, Building, User, Booking


def index(self):
    return HttpResponse("API is working!! :D")


class RoomsView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

    # route: /api/rooms/<number> returns the rooms which match the building id
    @action(detail=False, url_path="(?P<building_id>\d+)")
    def by_building(self, request, building_id=None):
        rooms = self.queryset.filter(building=building_id)
        serializer = self.get_serializer(rooms, many=True)
        return Response(serializer.data)


class BuildingsView(viewsets.ModelViewSet):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()
    
    # route: /api/buildings/<number> returns the building which matches the provided building id
    @action(detail=False, url_path="(?P<building_id>\d+)")
    def by_building_id(self, request, building_id=None):
        buildings = self.queryset.filter(id=building_id)
        serializer = self.get_serializer(buildings, many=True)
        return Response(serializer.data)


class UsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # route: /api/users/<number> returns the user which match the user id
    @action(detail=False, url_path="(?P<user_id>\d+)")
    def by_user_id(self, request, user_id=None):
        users = self.queryset.filter(id=user_id)
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
    
    #TODO: this one doesnt work, getting an error when testing
    # route: /api/users/<email> returns the user which matches the user email
    @action(detail=False, url_path="(?P<user_email>(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$))")
    def by_email(self, request, user_email=None):
        users = self.queryset.filter(email=user_email)
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)


class BookingsView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

    # route: /api/bookings/<number> returns the rooms which match the user id
    @action(detail=False, url_path="(?P<user_id>\d+)")
    def by_user(self, request, user_id=None):
        bookings = self.queryset.filter(created_by=user_id)
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)