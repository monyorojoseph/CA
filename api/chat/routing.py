from django.urls import path

from .consumers import message, call

websocket_urlpatterns = [
    path("message/<str:conversation_name>/", message.MessageConsumer.as_asgi()),
    path("call/<str:user_id>/", call.CallConsumer.as_asgi() )
]