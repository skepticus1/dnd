from django.db import models

class Trait(models.Model):
    name = models.CharField(max_length=100)
    # Other fields

class Skill(models.Model):
    name = models.CharField(max_length=100)
    # Other fields

class Proficiency(models.Model):
    name = models.CharField(max_length=100)
    # Other fields

class Language(models.Model):
    name = models.CharField(max_length=100)
    # Other fields

class Spell(models.Model):
    name = models.CharField(max_length=100)
    # Other fields

class Feature(models.Model):
    name = models.CharField(max_length=100)

class Character(models.Model):
    name = models.CharField(max_length=100)
    race = models.CharField(max_length=100)
    speed = models.IntegerField()
    size = models.CharField(max_length=100)
    age = models.CharField(max_length=100)
    char_class = models.CharField()
    level = models.IntegerField()
    alignment = models.CharField()
    background = models.CharField()


    traits = models.ForeignKey(Trait, on_delete=models.CASCADE, related_name="characters_trait")
    skills = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name="characters_skill")
    proficiencies = models.ForeignKey(Proficiency, on_delete=models.CASCADE, related_name="characters_proficiency")
    languages = models.ForeignKey(Language, on_delete=models.CASCADE, related_name="characters_language")
    spells = models.ForeignKey(Spell, on_delete=models.CASCADE, related_name="characters_spell")
    features = models.ForeignKey(Feature, on_delete=models.CASCADE, related_name="characters_feature")
    # Other fields