# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-04 00:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workmate', '0006_usersetting'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersetting',
            name='gradwell_extension',
            field=models.CharField(blank=True, help_text='Your gradwell telephone extension number', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='usersetting',
            name='gradwell_token',
            field=models.CharField(blank=True, help_text='Your gradwell api authentication token associated to your account', max_length=100, null=True),
        ),
    ]
