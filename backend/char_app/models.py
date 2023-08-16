from django.db import models
from user_app.models import User


class Character(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='characters', default=None, null=True)

    userName = models.CharField(null=True, blank=True, max_length=100)
    charName = models.CharField(null=True, blank=True, max_length=100)
    race = models.CharField(null=True, blank=True, max_length=100)
    speed = models.IntegerField(null=True, blank=True)
    size = models.CharField(null=True, blank=True, max_length=100)
    age = models.CharField(null=True, blank=True, max_length=100)
    charClass = models.CharField(null=True, blank=True)
    level = models.IntegerField(null=True, blank=True)
    alignment = models.CharField(null=True, blank=True)
    background = models.CharField(null=True, blank=True)

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