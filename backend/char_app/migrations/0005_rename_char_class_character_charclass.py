# Generated by Django 4.2.4 on 2023-08-16 16:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('char_app', '0004_skill_value'),
    ]

    operations = [
        migrations.RenameField(
            model_name='character',
            old_name='char_class',
            new_name='charClass',
        ),
    ]