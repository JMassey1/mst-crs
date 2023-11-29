from rest_framework import serializers
from .models import Room, Building, User, Booking


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = (
            "id",
            "name",
            "address",
            "latitude",
            "longitude",
            "floors",
            "open_time",
            "close_time",
        )


class RoomSerializer(serializers.ModelSerializer):
    building = BuildingSerializer(read_only=True)

    class Meta:
        model = Room
        fields = (
            "id",
            "identifier",
            "floor",
            "capacity",
            "size",
            "tv",
            "projector",
            "whiteboard",
            "computers",
            "building",
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "name", "password")


class BookingSerializer(serializers.ModelSerializer):
    room = RoomSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = (
            "id",
            "start_date",
            "end_date",
            "num_people",
            "name",
            "room",
            "created_by",
        )
