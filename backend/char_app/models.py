from django.db import models
from user_app.models import User


class Character(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='characters', default=None, null=True)

    userName = models.CharField(null=True, blank=True, max_length=100)
    charName = models.CharField(null=True, blank=True, max_length=100)
    charClass = models.CharField(null=True, blank=True)
    race = models.CharField(null=True, blank=True, max_length=100)
    speed = models.CharField(null=True, blank=True, max_length=100)
    size = models.CharField(null=True, blank=True, max_length=100)
    level = models.IntegerField(null=True, blank=True)
    alignment = models.CharField(null=True, blank=True)
    background = models.CharField(null=True, blank=True)
    #appearance
    age = models.CharField(null=True, blank=True, max_length=100)
    height = models.CharField(null=True, blank=True, max_length=100)
    weight = models.CharField(null=True, blank=True, max_length=100)
    eyes = models.CharField(null=True, blank=True, max_length=100)
    skin = models.CharField(null=True, blank=True, max_length=100)
    hair = models.CharField(null=True, blank=True, max_length=100)
    image_data = models.TextField(null=True, blank=True)
    sex = models.CharField(null=True, blank=True, max_length=100)


    #attributes
    strValue = models.IntegerField(null=True, blank=True)
    strBonus = models.IntegerField(null=True, blank=True)
    dexValue = models.IntegerField(null=True, blank=True)
    dexBonus = models.IntegerField(null=True, blank=True)
    conValue = models.IntegerField(null=True, blank=True)
    conBonus = models.IntegerField(null=True, blank=True)
    intValue = models.IntegerField(null=True, blank=True)
    intBonus = models.IntegerField(null=True, blank=True)
    wisValue = models.IntegerField(null=True, blank=True)
    wisBonus = models.IntegerField(null=True, blank=True)
    chaValue = models.IntegerField(null=True, blank=True)
    chaBonus = models.IntegerField(null=True, blank=True)

    #savingThrows
    strSaving = models.IntegerField(null=True, blank=True)
    dexSaving = models.IntegerField(null=True, blank=True)
    conSaving = models.IntegerField(null=True, blank=True)
    intSaving = models.IntegerField(null=True, blank=True)
    wisSaving = models.IntegerField(null=True, blank=True)
    chaSaving = models.IntegerField(null=True, blank=True)
    
    #hitdice,hp,death throws
    initiative = models.IntegerField(null=True, blank=True)
    armorClass = models.IntegerField(null=True, blank=True)
    currentHitPoints = models.IntegerField(null=True, blank=True)
    tempHitPoints = models.IntegerField(null=True, blank=True)
    hitDice = models.IntegerField(null=True, blank=True)
    deathSuccess = models.IntegerField(null=True, blank=True)
    deathFailure = models.IntegerField(null=True, blank=True)

    personalityTraits = models.CharField(null=True, blank=True)
    ideals = models.CharField(null=True, blank=True)
    bonds = models.CharField(null=True, blank=True)
    flaws = models.CharField(null=True, blank=True)
    
   
class Trait(models.Model):
    name = models.CharField(max_length=100)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_traits")

class Skill(models.Model):
    name = models.CharField(max_length=100)
    value = models.IntegerField(null=True, blank=True, default=0)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_skills", default=0)

class Proficiency(models.Model):
    name = models.CharField(max_length=100)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_proficiencies")

class Language(models.Model):
    name = models.CharField(max_length=100)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_languages")

class Spell(models.Model):
    name = models.CharField(max_length=100)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_spells")

class Feature(models.Model):
    name = models.CharField(max_length=100)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_features")
    
class Equipment(models.Model):
    name = models.CharField(max_length=100)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_equipment")