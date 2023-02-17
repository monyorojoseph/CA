from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

class CallConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.call_name = None
    
    def connect(self):
        print("[ CONNECTED ] :: CALL")
        self.user = self.scope['user']

        if not self.user.is_authenticated:
            return
        # user id from url
        user_id = self.scope["url_route"]["kwargs"]["user_id"]
        if not user_id:
            return
        
        self.call_name = f'call__{self.scope["url_route"]["kwargs"]["user_id"]}'

        async_to_sync(self.channel_layer.group_add)(
            self.call_name, self.channel_name
        )

        self.accept()
    
    def disconnect(self, code):
        print("[ DISCONNECTED ] :: CALL")
        async_to_sync(self.channel_layer.group_discard)(
            self.call_name, self.channel_name
        )
    
    def receive_json(self, content, **kwargs):
        target = content['target']
        offer_to = f'call__{target}'

        type = content['type']
        if type == "video-offer":
            async_to_sync(self.channel_layer.group_send)(
                offer_to, 
                {"content": content, 
                "type":"video_offer_echo"}
            )
            
        if type == "video-answer":
            async_to_sync(self.channel_layer.group_send)(
                offer_to, 
                {"content": content, 
                "type":"video_answer_echo"}
            )
        
        if type == "new-ice-candidate":
            async_to_sync(self.channel_layer.group_send)(
                offer_to, 
                {"content": content, 
                "type":"new_ice_candidate_echo"}
            )

        if type == "hang-up":
            async_to_sync(self.channel_layer.group_send)(
                offer_to, 
                {"content": content, 
                "type":"hang_up_echo"}
            )

    def video_offer_echo(self, event):
        self.send_json(event)

    def video_answer_echo(self, event):
        self.send_json(event)
    
    def new_ice_candidate_echo(self, event):
        self.send_json(event)
    
    def hang_up_echo(self, event):
        self.send_json(event)