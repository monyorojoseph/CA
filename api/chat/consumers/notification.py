from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

class NotificationConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.notification_name = None
    
    def connect(self):
        print("[ CONNECTED ] :: NOTIFICATION")
        self.user = self.scope['user']

        if not self.user.is_authenticated:
            return
        
        self.notification_name = f'notification__{self.scope["url_route"]["kwargs"]["user_id"]}'

        async_to_sync(self.channel_layer.group_add)(
            self.notification_name, self.channel_name
        )

        self.accept()
    
    def disconnect(self, code):
        print("[ DISCONNECTED ] :: NOTIFICATION")
        async_to_sync(self.channel_layer.group_discard)(
            self.notification_name, self.channel_name
        )
    
    def receive_json(self, content, **kwargs):
        type = content['type']
        if type == "video-offer":
            print(content)
            pass
            
        if type == "video-answer":
            print(content)
            pass
        
        if type == "new-ice-candidate":
            print(content)
            pass

        if type == "hang-up":
            print(content)
            pass

    # def audio_call_echo(self, event):
    #     self.send_json(event) 

    def video_offer_echo(self, event):
        self.send_json(event)

    def video_answer_echo(self, event):
        self.send_json(event)
    
    def new_ice_candidate_echo(self, event):
        self.send_json(event)
    
    def hang_up_echo(self, event):
        self.send_json(event)