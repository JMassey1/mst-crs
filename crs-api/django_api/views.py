from django.http import HttpResponse

from rest_framework import viewsets
from .serializers import RoomSerializer
from .models import Room


def index(request):
    return HttpResponse("API is working!! :D")

class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
