# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-01 07:59
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workmate', '0015_story_created_modified'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='story',
            name='icebox',
        ),
        migrations.AlterField(
            model_name='story',
            name='created_by',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='stories_created', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='story',
            name='last_modified_by',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='stories_last_modified', to=settings.AUTH_USER_MODEL),
        ),
    ]
