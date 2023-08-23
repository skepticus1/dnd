from django.urls import path
from .views import CreateCharacter, Characters, CharacterData, SDModelsView, GenerateImage, GeneratePDFView


urlpatterns = [
    path("create/", CreateCharacter.as_view(), name='create'),
    path("characters/", Characters.as_view(), name='characters'),
    path("edit/<int:character_id>/", CharacterData.as_view(), name='edit'),
    path("delete/<int:character_id>/", CharacterData.as_view(), name='delete'),
    path("sd_models/", SDModelsView.as_view(), name='sd_models'),
    path("generate_image/", GenerateImage.as_view(), name='generate_image'),
    path("generate_pdf/", GeneratePDFView.as_view(), name='generate_pdf'),
]