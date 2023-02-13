from django.urls import path

from .consumers import message, notification

websocket_urlpatterns = [
    path("message/<str:conversation_name>/", message.MessageConsumer.as_asgi()),
    path("notification/<str:user_id>/", notification.NotificationConsumer.as_asgi() )
]