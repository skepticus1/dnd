# Generated by Django 4.2.4 on 2023-08-17 17:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('char_app', '0009_character_otherproficiencies'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='character',
            name='otherProficiencies',
        ),
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='character_equipment', to='char_app.character')),
            ],
        ),
    ]
