from math import floor
from django.http import HttpResponse

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import (
    RoomSerializer,
    BuildingSerializer,
    UserSerializer,
    BookingSerializer,
)
from .models import Room, Building, User, Booking


def index(self):
    return HttpResponse("API is working!! :D")


class RoomsView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

    # route: /api/rooms/<number> returns the room which matches the provided room id
    @action(detail=False, url_path="(?P<room_id>\d+)")
    def by_room_id(self, request, room_id=None):
        rooms = self.queryset.filter(id=room_id)
        serializer = self.get_serializer(rooms, many=True)
        return Response(serializer.data)

    # route: /api/rooms/search returns a list of all the rooms in the database
    @action(detail=False, methods=["post"], url_path="search")
    def filter_rooms(self, request):
        params = request.data

        building_id = params.get("building_id", None)
        min_capacity = params.get("min_capacity", None)
        max_capacity = params.get("max_capacity", None)
        floor = params.get("floor", None)

        rooms = self.queryset

        if building_id is not None:
            rooms = rooms.filter(building=building_id)
        if floor is not None:
            rooms = rooms.filter(floor=floor)

        if min_capacity is not None and max_capacity is not None:
            rooms = rooms.filter(capacity__range=(min_capacity, max_capacity))
        elif min_capacity is not None:
            rooms = rooms.filter(capacity__gte=min_capacity)

        serializer = self.get_serializer(rooms, many=True)
        return Response(serializer.data)

    # route: /api/rooms/floors returns a list of all the floors in the database
    @action(detail=False, methods=["get"], url_path="floors")
    def get_floors(self, request):
        floors = Room.objects.values_list("floor", flat=True).distinct()
        return Response(list(floors))

    # route: /api/rooms/capacities returns a list of all the capacities in the database
    @action(detail=False, methods=["get"], url_path="capacities")
    def get_capacities(self, request):
        capacities = Room.objects.values_list("capacity", flat=True).distinct()
        return Response(list(capacities))


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

    # TODO: this one doesnt work, getting an error when testing
    # route: /api/users/<email> returns the user which matches the user email
    @action(
        detail=False,
        url_path="(?P<user_email>(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$))",
    )
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
