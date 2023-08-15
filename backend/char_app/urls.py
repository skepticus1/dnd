from django.urls import path
from .views import CreateCharacter, Characters


urlpatterns = [
    path("create/", CreateCharacter.as_view(), name='create'),
    path("characters/", Characters.as_view(), name='characters'),
]