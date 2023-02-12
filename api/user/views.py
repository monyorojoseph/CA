from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()

class ListPeopleAPI(APIView):
    def get(self, request, format=None):
        people = User.objects.exclude(id=request.user.id)
        serializer = UserSerializer(people, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)