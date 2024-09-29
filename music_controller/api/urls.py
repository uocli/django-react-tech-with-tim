from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoomView, UserInRoomView

urlpatterns = [
    path("", RoomView.as_view()),
    path("create-room", CreateRoomView.as_view()),
    path("get-room", GetRoom.as_view()),
    path("join-room", JoinRoomView.as_view()),
    path("user-in-room", UserInRoomView.as_view()),
]
