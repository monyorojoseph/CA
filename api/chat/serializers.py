from rest_framework import serializers
from .models import Conversation, Message
from user.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

# conversation serializer
class ConversationSerializer(serializers.ModelSerializer):
    other_user = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['name', 'approved', 'other_user', 'last_message']
    
    def get_other_user(self, obj):
        ids = obj.name.split('__')
        me = self.context['user']
        ids.remove(str(me.id))
        return User.objects.get(id=ids[0]).full_name

    def get_last_message(self, obj):
        msg = obj.conversation_messages.last()
        return MessageSerializer(msg).data

# message serilialiser
class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'data', 'timestamp', 'read', 'reaction']