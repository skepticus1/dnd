from django.urls import path
from .views import CreateCharacter


urlpatterns = [
    path("create/", CreateCharacter.as_view(), name='create'),
]