from .views import *
from django.urls  import path

urlpatterns = [
    path('message-history/<str:conversation_name>/', MessageHistoryAPI.as_view(), name='message_history'),
    path('my-conversations/', ConversationsAPI.as_view(), name='my_conversations')    
]
