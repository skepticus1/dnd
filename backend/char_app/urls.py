from django.urls import path
from .views import CreateCharacter, Characters, CharacterData


urlpatterns = [
    path("create/", CreateCharacter.as_view(), name='create'),
    path("characters/", Characters.as_view(), name='characters'),
    path("edit/<int:character_id>/", CharacterData.as_view(), name='edit'),
]