# Generated by Django 4.2.4 on 2023-08-14 15:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('char_app', '0002_rename_name_character_charname_character_chabonus_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='character',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='character_skills', to='char_app.character'),
        ),
    ]