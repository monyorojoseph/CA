from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model
from chat.models import Conversation, Message
from chat.serializers import MessageSerializer

User = get_user_model()


class MessageConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.conversation = None
        self.conversation_name = None
    
    def get_receiver(self):
        name = self.conversation_name
        ids = str(name).split('__')
        id1 = ids[0]
        id2 = ids[1]
        if id1 == self.user.id:
            return User.objects.get(id=id2)
        else:
            return User.objects.get(id=id1)

    
    def connect(self):
        # get  authenticated user or disconnect
        self.user = self.scope['user']
        if not self.user.is_authenticated:
            return
        # get conversation name
        self.conversation_name = self.scope["url_route"]["kwargs"]["conversation_name"]
        # get or create a conversation
        self.conversation, created = Conversation.objects.get_or_create(name=self.conversation_name)

        async_to_sync(self.channel_layer.group_add)(
            self.conversation_name, self.channel_name)
        
        self.accept()

    def disconnect(self, code):
        
        async_to_sync(self.channel_layer.group_discard)(
            self.conversation_name, self.channel_name
        )
    
    def receive_json(self, content, **kwargs):
        content_type = content['type']
        if content_type == 'chat_message':
            self.get_receiver()
            message = Message.objects.create(
                sender = self.user, receiver=self.get_receiver(),
                data=content['message'], conversation=self.conversation
            )

            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name, 
                {"type": "chat_message_echo", 
                 "message": MessageSerializer(message).data}
            )

    def chat_message_echo(self, event):
        self.send_json(event)