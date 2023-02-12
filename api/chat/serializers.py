from rest_framework import serializers
from .models import Conversation, Message
from user.serializers import UserSerializer

# conversation serializer
class ConversationSerializer(serializers.ModelSerializer):
    # other_user = serializers.SerializerMethodField()
    class Meta:
        model = Conversation
        fields = ['name', 'approved']

# message serilialiser
class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'data', 'timestamp', 'read', 'reaction']