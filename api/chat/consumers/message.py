from channels.generic.websocket import AsyncJsonWebsocketConsumer

from chat.models import Conversation, Message


class MessageConsumer(AsyncJsonWebsocketConsumer):
    async def __init__(self, *args, **kwargs):
        self.user = None
        self.conversation = None
        self.conversation_name = None
    
    async def connect(self):
        # get  authenticated user or disconnect
        self.user = self.scope['user']
        if not self.user.is_authenticated:
            return
        # get conversation name
        self.conversation_name = self.scope["url_route"]["kwargs"]["conversation_name"]
        # get or create a conversation
        # self.conversation, created = Conversation.objects.get_or_create(name=self.conversation_name)

        await self.channel_layer.group_add(
            self.conversation_name, self.channel_name)
        
        await self.accept()


        print('[ CONNECTED ] :: ', self.conversation_name)

    async def disconnect(self, code):
        print('[ DISCONNECTED ] :: ', self.conversation_name)
        
        await self.channel_layer.group_discard(
            self.conversation_name, self.channel_name
        )
    
    async def receive_json(self, content, **kwargs):
        message = content['message']
      # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message}
        )

    async def chat_message(self, event):
        await self.send(event)