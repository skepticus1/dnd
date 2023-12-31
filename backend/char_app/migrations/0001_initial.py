# Generated by Django 4.2.4 on 2023-08-13 13:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('race', models.CharField(blank=True, max_length=100, null=True)),
                ('speed', models.IntegerField(blank=True, null=True)),
                ('size', models.CharField(blank=True, max_length=100, null=True)),
                ('age', models.CharField(blank=True, max_length=100, null=True)),
                ('char_class', models.CharField(blank=True, null=True)),
                ('level', models.IntegerField(blank=True, null=True)),
                ('alignment', models.CharField(blank=True, null=True)),
                ('background', models.CharField(blank=True, null=True)),
                ('user', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='characters', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Trait',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_traits', to='char_app.character')),
            ],
        ),
        migrations.CreateModel(
            name='Spell',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_spells', to='char_app.character')),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_skills', to='char_app.character')),
            ],
        ),
        migrations.CreateModel(
            name='Proficiency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_proficiencies', to='char_app.character')),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_languages', to='char_app.character')),
            ],
        ),
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_features', to='char_app.character')),
            ],
        ),
    ]
