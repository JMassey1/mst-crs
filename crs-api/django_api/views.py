from django.http import HttpResponse
import pytz
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Booking, Building, Room, User
from datetime import datetime
from dateutil import parser
from .serializers import (
    BookingSerializer,
    BuildingSerializer,
    RoomSerializer,
    UserSerializer,
)


def index(self):
    return HttpResponse("API is working!! :D")


class CustomAuthToken(ObtainAuthToken):
    # This kinda sucks, but to get tokens to actually work, we need to reset the database schema and that's a pain
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        )


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
    permission_classes = [IsAuthenticated]

    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

    # route: /api/bookings/create creates a new booking
    @action(detail=False, methods=["post"], url_path="create")
    def create_booking(self, request):
        params = request.data
        user = request.user

        room_id = params.get("room_id", None)

        start_time_str = params.get("start_time", None)
        end_time_str = params.get("end_time", None)

        start_time = parser.isoparse(start_time_str)
        end_time = parser.isoparse(end_time_str)
        num_people = params.get("num_people", None)

        name = user.username

        if room_id is None:
            return Response({"error": "room_id is required"})
        if start_time is None:
            return Response({"error": "start_time is required"})
        if end_time is None:
            return Response({"error": "end_time is required"})
        if num_people is None:
            return Response({"error": "num_people is required"})

        # check if room exists
        room = Room.objects.filter(id=room_id)
        if not room.exists():
            return Response({"error": "room does not exist"})
        room = room.first()

        # check if room is available
        bookings = Booking.objects.filter(room=room_id)
        for booking in bookings:
            if booking.start_date <= start_time < booking.end_date:
                # Does booking start during another booking?
                return Response({"error": "Room is Not Available 1"}, status=404)
            if booking.start_date < end_time <= booking.end_date:
                # Does booking end during another booking?
                return Response({"error": "Room is Not Available 2"}, status=404)
            if start_time <= booking.start_date < end_time:
                # Does another booking start during this booking?
                return Response({"error": "Room is Not Available 3"}, status=404)
            if start_time < booking.end_date <= end_time:
                # Does another booking end during this booking?
                return Response({"error": "Room is Not Available 4"}, status=404)

        booking = Booking(
            name=name,
            room=room,
            start_date=start_time,
            end_date=end_time,
            num_people=num_people,
        )
        booking.save()

        return Response({"id": booking.id}, status=201)
