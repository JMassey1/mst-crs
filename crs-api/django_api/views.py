from django.http import HttpResponse


def index(request):
    return HttpResponse("API is working!! :D")
