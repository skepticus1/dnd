from rest_framework import serializers
from .models import Character, Skill, Language, Trait, Feature, Proficiency, Spell, Equipment

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class TraitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trait
        fields = '__all__'

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'

class ProficiencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Proficiency
        fields = '__all__'

class SpellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spell
        fields = '__all__'

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'

class CharacterSerializer(serializers.ModelSerializer):
    character_languages = serializers.SerializerMethodField()
    character_traits = serializers.SerializerMethodField()
    character_features = serializers.SerializerMethodField()
    character_proficiencies = serializers.SerializerMethodField()
    character_spells = serializers.SerializerMethodField()
    character_equipment = serializers.SerializerMethodField()
    character_skills = serializers.SerializerMethodField()

    def get_character_languages(self, obj):
        # return a list of language names
        return [language.name for language in obj.character_languages.all()]
    def get_character_traits(self, obj):
        return [trait.name for trait in obj.character_traits.all()]
    def get_character_features(self, obj):
        return [feature.name for feature in obj.character_features.all()]
    def get_character_proficiencies(self, obj):
        return [proficiency.name for proficiency in obj.character_proficiencies.all()]
    def get_character_spells(self, obj):
        return [spell.name for spell in obj.character_spells.all()]
    def get_character_equipment(self, obj):
        return [item.name for item in obj.character_equipment.all()]
    
    def get_character_skills(self, obj):
        skills = {}
        for skill in obj.character_skills.all():
            skills[skill.name] = skill.value
        return skills


    class Meta:
        model = Character
        fields = '__all__'