# Generated by Django 4.2.4 on 2023-08-18 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('char_app', '0013_character_armorclass'),
    ]

    operations = [
        migrations.AddField(
            model_name='character',
            name='initiative',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]