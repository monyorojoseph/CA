import uuid
from django.db import models

# conversation
class Conversation(models.Model):
    name = models.CharField(unique=True, max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)
    
# conversation message
class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey('user.CustomUser', related_name='sender_messages', on_delete=models.SET_NULL, null=True)
    reciever = models.ForeignKey('user.CustomUser', related_name='reciever_messages', on_delete=models.SET_NULL, null=True)
    data = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    reaction = models.CharField(max_length=200, null=True, blank=True)
    
    def __str__(self):
        return f"Message from {self.sender} to {self.reciever}"
    
    class Meta:
        ordering = ['timestamp']