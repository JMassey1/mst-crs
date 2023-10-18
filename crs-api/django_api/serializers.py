from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'identifier', 'capacity', 'size', 'tv', 'projector', 'whiteboard', 'computers', 'building')