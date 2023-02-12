from django.urls import path
from .views import ListPeopleAPI

urlpatterns = [
    path('list-people/', ListPeopleAPI.as_view(), name='list_people')
]
