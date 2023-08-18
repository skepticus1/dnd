from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Character, Skill, Language, Trait, Feature, Proficiency, Spell, Equipment
from user_app.models import User
from .serializers import CharacterSerializer

class CreateCharacter(APIView):

    def post(self, request):
        data = request.data
        print(data)

        try:
            user = User.objects.get(id=data.get('id'))
        except User.DoesNotExist:
            return Response({"error":"User not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            print('\ncharacter start')
            character = Character.objects.create(
                user=user,
                userName=data.get('userName', f"{user}"),
                charName=data.get('charName'),
                race=data.get('race'),
                speed=data.get('speed'),
                size=data.get('size'),
                charClass=data.get('charClass'),
                level=data.get('level'), # need to add to charsheetheader.jsx
                background=data.get('background'),
                alignment=data.get('alignment'),
                #appearance
                age=data.get('age'),
                height=data.get('height'),
                weight=data.get('weight'),
                eyes=data.get('eyes'),
                skin=data.get('skin'),
                hair=data.get('hair'),
                #attributes
                strValue=data.get('strValue'),
                strBonus=data.get('strBonus'),
                dexValue=data.get('dexValue'),
                dexBonus=data.get('dexBonus'),
                conValue=data.get('conValue'),
                conBonus=data.get('conBonus'),
                intValue=data.get('intValue'),
                intBonus=data.get('intBonus'),
                wisValue=data.get('wisValue'),
                wisBonus=data.get('wisBonus'),
                chaValue=data.get('chaValue'),
                chaBonus=data.get('chaBonus'),
                # saving throws
                strSaving=data.get('strSaving'),
                dexSaving=data.get('dexSaving'),
                conSaving=data.get('conSaving'),
                intSaving=data.get('intSaving'),
                wisSaving=data.get('wisSaving'),
                chaSaving=data.get('chaSaving'),
                # death, hp, hitdice
                currentHitPoints=data.get('currentHitPoints'),
                tempHitPoints=data.get('tempHitPoints'),
                hitDice=data.get('hitDice'),
                deathSuccess=data.get('deathSuccess'),
                deathFailure=data.get('deathFailure'),
                # bonds flaws ideals personality
                personalityTraits=data.get('personalityTraits'),
                ideals=data.get('ideals'),
                bonds=data.get('bonds'),
                flaws=data.get('flaws'),
                
                
            )
            print('\ncharacter done')

        except Exception as e:
            return Response({"error character": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # skills
        try:
            print('\nskills')
            character_skills = data.get('character_skills', {})
            print(character_skills)
            for skill_name, skill_value in character_skills.items():
                print(skill_name, skill_value)
                Skill.objects.create(
                    name=skill_name,
                    value=skill_value,
                    character=character
                )
            print('skills done')

        except Exception as e:
            print("error", e)
            return Response({"error skills": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        # languages
        try:
            print('\nlanguages')
            character_languages = data.get('character_languages', [])
            for language_name in character_languages:
                print(language_name)
                Language.objects.create(
                    name=language_name,
                    character=character
                )
            print('languages done')
        except Exception as e:
            print('error with languages', e)
            return Response({'error languages': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # traits
        try:
            print('\ntraits')
            character_traits = data.get('character_traits', [])
            for trait_name in character_traits:
                print(trait_name)
                Trait.objects.create(
                    name=trait_name,
                    character=character
                )
            print('traits done')
        except Exception as e:
            print('error with traits', e)
            return Response({'error traits': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # features
        try:
            print('\nfeatures')
            character_features = data.get('features', [])
            for feature_name in character_features:
                print(feature_name)
                Feature.objects.create(
                    name=feature_name,
                    character=character
                )
            print('feature done')
        except Exception as e:
            print('error with features', e)
            return Response({'error features': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # proficiencies
        try:
            print('\nproficiencies')
            character_proficiencies = data.get('character_proficiencies', [])
            for proficiency_name in character_proficiencies:
                print(proficiency_name)
                Proficiency.objects.create(
                    name=proficiency_name,
                    character=character
                )
            print('proficiencies done')
        except Exception as e:
            print('error with proficiencies', e)
            return Response({'error proficiencies': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # spells
        try:
            print('\nspells')
            character_spells = data.get('character_spells', [])
            for spell_name in character_spells:
                print(spell_name)
                Spell.objects.create(
                    name=spell_name,
                    character=character
                )
            print('spells done')
        except Exception as e:
            print('error with spells', e)
            return Response({'error spells': str(e)}, status=status.HTTP_400_BAD_REQUEST)   
        
        # equipment
        try:
            print('\nequipment')
            character_equipment = data.get('character_equipment', [])
            for item_name in character_equipment:
                print(item_name)
                Equipment.objects.create(
                    name=item_name,
                    character=character
                )
            print('sequipment done')
        except Exception as e:
            print('error with equipment', e)
            return Response({'error equipment': str(e)}, status=status.HTTP_400_BAD_REQUEST)   
        
        return Response({"id": character.id}, status=status.HTTP_201_CREATED)

class Characters(APIView):

    def get(self, request):
        # print(request.user)
        characters = Character.objects.filter(user_id=request.user.id)
        # print(characters)
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data)
    
class CharacterData(APIView):

    # retreive character data for displaying on edit character page.
    def get(self, request, character_id):
        
        print('\ncharacterdata api')
        # character = get_object_or_404(Character, pk=character_id)
        character = Character.objects.get(pk=character_id)
        serializer = CharacterSerializer(character)
        print('\n', serializer.data)
        return Response(serializer.data)
    
    # save character edits.
    def put(self, request, character_id):
        print('put request, reqeust.data\n\n\n', request.data)
        character = get_object_or_404(Character, pk=character_id)
        serializer = CharacterSerializer(character, data=request.data)

        if serializer.is_valid():
            serializer.save()
            print('put request, serialized data\n\n\n', serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #delete character
    def delete(self, request, character_id):
        character = get_object_or_404(Character, pk=character_id)

        character.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)