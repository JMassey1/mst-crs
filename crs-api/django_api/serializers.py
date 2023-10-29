from rest_framework import serializers
from .models import Room, Building

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'identifier', 'capacity', 'size', 'tv', 'projector', 'whiteboard', 'computers', 'building')

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('id', 'name', 'address', 'floors', 'open_time', 'close_time')