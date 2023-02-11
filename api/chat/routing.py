from django.urls import path

from .consumers import message

websocket_urlpatterns = [
    path("message/<str:conversation_name>/", message.MessageConsumer.as_asgi()),
]