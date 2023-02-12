from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

# old messages
class MessageHistoryAPI(APIView):
    permission_classes = [ IsAuthenticated ]
    def get(self, request, conversation_name, format=None):
        conversation = get_object_or_404(Conversation, name=conversation_name)
        messages = Message.objects.filter(conversation=conversation)
        serializer = MessageSerializer(messages,  many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# my conversations list
class ConversationsAPI(APIView):
    permission_classes = [ IsAuthenticated ]
    def get(self, request, format=None):
        user = request.user
        conversations = user.my_conversations()
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)