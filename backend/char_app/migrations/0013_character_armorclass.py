# Generated by Django 4.2.4 on 2023-08-18 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('char_app', '0012_alter_character_speed'),
    ]

    operations = [
        migrations.AddField(
            model_name='character',
            name='armorClass',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
