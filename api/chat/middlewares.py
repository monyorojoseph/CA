from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from urllib.parse import parse_qs

User = get_user_model()

@database_sync_to_async
def get_user(token):
    acces_token_obj = AccessToken(token)
    try:
        return User.objects.get(id=acces_token_obj['user_id'])
    except User.DoesNotExist:
        return AnonymousUser()

class QueryAuthMiddleware:
    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).

        query_params = parse_qs(scope["query_string"].decode())
        token = query_params["token"][0]
        scope['token'] = token
        scope['user'] = await get_user(token)

        return await self.app(scope, receive, send)