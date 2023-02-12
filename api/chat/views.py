from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

channel_layer = get_channel_layer()

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
        serializer = ConversationSerializer(conversations, many=True, context={'user': request.user})
        return Response(serializer.data, status=status.HTTP_200_OK)

# conversation details
class ConversationDetailsAPI(APIView):
    permission_classes = [ IsAuthenticated ]
    def get(self, request, conversation_name, fomart=None):
        conversation = get_object_or_404(Conversation, name=conversation_name)
        serializer = ConversationSerializer(conversation, context={'user': request.user})
        return Response(serializer.data, status=status.HTTP_200_OK)

# make audio call
class AudioCallAPI(APIView):
    permission_classes = [ IsAuthenticated ]
    def post(self, request, format=None):
        data = request.data
        conversation_name = data['conversation_name']        
        async_to_sync(channel_layer.group_send)({
            conversation_name,            
            {"type": "audio_call_echo",
                "data": data['data']}
        })
        return Response(status=status.HTTP_200_OK)
        

    # make audio call
class VideoCallAPI(APIView):
    permission_classes = [ IsAuthenticated ]
    def post(self, request, format=None):
        data = request.data
        conversation_name = data['conversation_name']        
        async_to_sync(channel_layer.group_send)({
            conversation_name,            
            {"type": "video_call_echo",
                "data": data['data']}
        })
        return Response(status=status.HTTP_200_OK)

