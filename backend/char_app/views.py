from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Character, Skill, Language, Trait, Feature, Proficiency, Spell, Equipment
from user_app.models import User
from .serializers import CharacterSerializer
from pdfrw import PdfReader, PdfWriter, IndirectPdfDict
from django.http import FileResponse
from io import BytesIO
import os
import requests

def handle_character_create(character, data):
    
        try:
            user = User.objects.get(id=data.get('user_id'))
        except User.DoesNotExist:
            raise Exception('user not found')

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
                image_data=data.get('image_data'),
                sex=data.get('sex'),
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
                armorClass=data.get('armorClass'),
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
            print('character data error', {e})
            return character

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
            print("error at skills", e)
            return character
        
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
            return character

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
            return character

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
            return character

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
            return character

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
            return character 
        
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
            return character
        
        return character

def handle_character_update(character, data):
    
        try:
            user = User.objects.get(id=data.get('user_id'))
        except User.DoesNotExist:
            raise Exception('user not found')

        try:
            print('\ncharacter start')
            print('data level', data.get('level'))
            print('level type', int(data.get('level')))
             
            user=user,
            character.userName=data.get('userName', f"{user}")
            character.charName=data.get('charName')
            character.race=data.get('race')
            character.speed=data.get('speed')
            character.size=data.get('size')
            character.charClass=data.get('charClass')
            character.level=int(data.get('level'))
            character.background=data.get('background')
            character.alignment=data.get('alignment')
            #appearance
            character.age=data.get('age')
            character.height=data.get('height')
            character.weight=data.get('weight')
            character.eyes=data.get('eyes')
            character.skin=data.get('skin')
            character.hair=data.get('hair')
            character.image_data=data.get('image_data')
            character.sex=data.get('sex')
            #attributes
            character.strValue=data.get('strValue')
            character.strBonus=data.get('strBonus')
            character.dexValue=data.get('dexValue')
            character.dexBonus=data.get('dexBonus')
            character.conValue=data.get('conValue')
            character.conBonus=data.get('conBonus')
            character.intValue=data.get('intValue')
            character.intBonus=data.get('intBonus')
            character.wisValue=data.get('wisValue')
            character.wisBonus=data.get('wisBonus')
            character.chaValue=data.get('chaValue')
            character.chaBonus=data.get('chaBonus')
            # saving throws
            character.strSaving=data.get('strSaving')
            character.dexSaving=data.get('dexSaving')
            character.conSaving=data.get('conSaving')
            character.intSaving=data.get('intSaving')
            character.wisSaving=data.get('wisSaving')
            character.chaSaving=data.get('chaSaving')
            # death, hp, hitdice
            character.initiative=data.get('initiative')
            character.armorClass=data.get('armorClass')
            character.currentHitPoints=data.get('currentHitPoints')
            character.tempHitPoints=data.get('tempHitPoints')
            character.hitDice=data.get('hitDice')
            character.deathSuccess=data.get('deathSuccess')
            character.deathFailure=data.get('deathFailure')
            # bonds flaws ideals personality
            character.personalityTraits=data.get('personalityTraits')
            character.ideals=data.get('ideals')
            character.bonds=data.get('bonds')
            character.flaws=data.get('flaws')
            
            
            
            print('\ncharacter done')

        except Exception as e:
            print('character data error', {e})
            return character

        # skills
        try:
            Skill.objects.filter(character=character).delete()
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
            print("error at skills", e)
            return character
        
        # languages
        try:
            Language.objects.filter(character=character).delete()
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
            return character

        # traits
        try:
            Trait.objects.filter(character=character).delete()
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
            return character

        # features
        try:
            Feature.objects.filter(character=character).delete()
            print('\nfeatures')
            character_features = data.get('character_features', [])
            print('!!!!!\n', character_features)
            for feature_name in character_features:
                print(feature_name)
                Feature.objects.create(
                    name=feature_name,
                    character=character
                )
            print('feature done')
        except Exception as e:
            print('error with features', e)
            return character

        # proficiencies
        try:
            Proficiency.objects.filter(character=character).delete()
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
            return character

        # spells
        try:
            Spell.objects.filter(character=character).delete()
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
            return character 
        
        # equipment
        try:
            Equipment.objects.filter(character=character).delete()
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
            return character
        
        # character.full_clean() # will check new data against validators
        character.save()        # saves data to database
        return character

class CreateCharacter(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print('POST DATA:\n', request.data)
        data = request.data
        character = handle_character_create(None, data)
        print('post character.data', character)
        return Response({"id": character.id}, status=status.HTTP_201_CREATED)

class Characters(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # print(request.user)
        characters = Character.objects.filter(user_id=request.user.id)
        # print(characters)
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data)
    
class CharacterData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # retreive character data for displaying on edit character page.
    def get(self, request, character_id):
        
        # character = get_object_or_404(Character, pk=character_id)
        character = Character.objects.get(pk=character_id)
        serializer = CharacterSerializer(character)
        return Response(serializer.data)
    
    # save character edits.
    def put(self, request, character_id):
        print('PUT DATA:\n\n', request.data)
        data = request.data
        character = get_object_or_404(Character, pk=character_id)
        print(character)

        try:
            updated_character = handle_character_update(character, data)
            # serializer = CharacterSerializer(updated_character)
            print('put request, update_character_data\n\n\n', updated_character)
            return Response({"id": updated_character.id}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {e}")
            return Response('something went wrong', status=status.HTTP_400_BAD_REQUEST)
    
    #delete character
    def delete(self, request, character_id):
        character = get_object_or_404(Character, pk=character_id)

        character.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class SDModelsView(APIView):
    def get(self, request):
        api_url = 'http://127.0.0.1:7860/sdapi/v1/sd-models'

        try:
            response = requests.get('http://172.24.160.1:7860/sdapi/v1/sd-models')
            if response.status_code == 200:
                return Response(response.json(), status=status.HTTP_200_OK)
            else:
                return Response({"error": "failed to fetch sd models"}, status=status.HTTP_400_BAD_REQUEST)
        except requests.RequestException as e:
            return Response({"error": f"Network error while fetching SD models: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GenerateImage(APIView):

    def post(self, request):
        prompt_data = request.data

        response = requests.post('http://172.24.160.1:7860/sdapi/v1/txt2img', json=prompt_data)

        if response.status_code == 200:
            response
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response({"error": "failed to generate image"}, status=status.HTTP_400_BAD_REQUEST)
        
class GeneratePDFView(APIView):

        def post(self, request):
            data = request.data

            # # special case for ClassLevel pdf field
            # class_data = data.get("class", "")
            # level_data = data.get("level", "")
            # class_level_data = f"{class_data} {level_data}"

            # # get data for fields to fill in on the pdf
            # fields = {
            #     "ClassLevel": class_level_data,
            #     "(CharacterName)": data.get("charName", ""),
            #     "Background": data.get("background", ""),
            #     "Race": data.get("race", ""),
            #     "Alignment": data.get("alignment", ""),


            # }
            # charName = data.get("charName", "")

            # BASE_DIR = os.path.dirname(os.path.abspath(__file__))
            # pdf_path = os.path.join(BASE_DIR, 'data', 'dnd_char_sheet.pdf')
            

            # print('this is my current working directory', os.getcwd())
            # # load the pdf template
            # template_pdf = PdfReader(pdf_path)

            # # fill in the pdf
            # for field in template_pdf.pages[0]['/Annots']:
            #     key = field['/T']
            #     value = fields.get(key)
            #     if value:
            #         field.update(pdfrw.PdfDict(V='{}'.format(value)))

            # # save the filled pdf to a temp file or memory
            # output = BytesIO()
            # with open('debug_filled.pdf', 'wb') as f:
            #     PdfWriter().write(f, template_pdf)
            # PdfWriter().write(output, template_pdf)

            # # rewind buff
            # output.seek(0)

            # # serve the filled pdf as a response
            # response = FileResponse(output, content_type='application/pdf')
            # response['Content-Disposition'] = 'attachment; filename="filled_character_sheet.pdf"'

            # return response