from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Character, Skill
from user_app.models import User
from .serializers import CharacterSerializer

class CreateCharacter(APIView):

    def post(self, request):
        data = request.data
        print(data)

        try:
            user = User.objects.get(id=data.get('id'))
            print('\n', user, '\n')
        except User.DoesNotExist:
            return Response({"error":"User not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            print('\ncharacter start\n')
            character = Character.objects.create(
                user=user,
                userName=data.get('playerName', f"{user}"),
                charName=data.get('characterName'),
                background=data.get('background'),
                char_class=data.get('characterClass'),
                race=data.get('race'),
                alignment=data.get('alignment'),
                #attributes
                strValue=data.get('strValue'),
                strBonus=data.get('strBonus'),
                dexValue=data['dexValue'],
                dexBonus=data['dexBonus'],
                conValue=data['conValue'],
                conBonus=data['conBonus'],
                intValue=data['intValue'],
                intBonus=data['intBonus'],
                wisValue=data['wisValue'],
                wisBonus=data['wisBonus'],
                chaValue=data['chaValue'],
                chaBonus=data['chaBonus'],
            )
            print('\ncharacter done\n')

        except Exception as e:
            return Response({"error character": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            print('\nskills\n')
            skills = data.get('skills', {})
            print(character)
            for skill_name, skill_value in skills.items():
                print(skill_name, skill_value)
                Skill.objects.create(
                    name=skill_name,
                    value=skill_value,
                    character=character
                )
            print('\nskills done\n')


            return Response({"id": character.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("error", e)
            return Response({"error skills": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class Characters(APIView):

    def get(self, request):
        print(request.user)
        characters = Character.objects.filter(user_id=request.user.id)
        print(characters)
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data)