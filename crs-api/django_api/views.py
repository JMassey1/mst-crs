from django.http import HttpResponse

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import RoomSerializer, BuildingSerializer
from .models import Room, Building


def index():
    return HttpResponse("API is working!! :D")


class RoomsView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

    @action(detail=False, url_path="(?P<building_id>\d+)")
    def by_building(self, request, building_id=None):
        rooms = self.queryset.filter(building=building_id)
        serializer = self.get_serializer(rooms, many=True)
        return Response(serializer.data)


class BuildingsView(viewsets.ModelViewSet):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()
