# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-29 22:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workmate', '0013_story_order'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='storystate',
            options={'ordering': ('order',)},
        ),
        migrations.AddField(
            model_name='storystate',
            name='order',
            field=models.PositiveIntegerField(db_index=True, default=0, editable=False),
        ),
    ]
