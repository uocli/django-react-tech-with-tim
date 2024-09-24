from django.shortcuts import render
from rest_framework import generics

from music_controller.api.models import Room
from music_controller.api.serializers import RoomSerializer


# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
