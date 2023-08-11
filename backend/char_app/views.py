from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Character

class CreateCharacter(APIView):

    def post(self, request):
        data = request.data

        print(data)

        try:
            character = Character.objects.create(
                name=data['characterName'],
                background=data['background'],
                char_class=data['characterClass'],
                race=data['race'],
                alignment=data['alignment'],


            )
            return Response({"id": character.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)