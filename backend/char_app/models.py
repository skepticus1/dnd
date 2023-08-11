from django.db import models
from user_app.models import User


class Character(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='characters', default=None, null=True)

    name = models.CharField(null=True, blank=True, max_length=100)
    race = models.CharField(null=True, blank=True, max_length=100)
    speed = models.IntegerField(null=True, blank=True)
    size = models.CharField(null=True, blank=True, max_length=100)
    age = models.CharField(null=True, blank=True, max_length=100)
    char_class = models.CharField(null=True, blank=True)
    level = models.IntegerField(null=True, blank=True)
    alignment = models.CharField(null=True, blank=True)
    background = models.CharField(null=True, blank=True)


   
class Trait(models.Model):
    name = models.CharField(max_length=100)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_traits")

class Skill(models.Model):
    name = models.CharField(max_length=100)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name="character_skills")

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