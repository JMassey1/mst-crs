from django.http import HttpResponse

from rest_framework import viewsets
from .serializers import RoomSerializer, BuildingSerializer
from .models import Room, Building


def index(request):
    return HttpResponse("API is working!! :D")

class RoomsView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    
class BuildingsView(viewsets.ModelViewSet):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()