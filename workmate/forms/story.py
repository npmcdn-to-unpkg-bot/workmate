# -*- coding: utf-8 -*-
from django import forms

from workmate.models import Story


class StoryForm(forms.ModelForm):

    class Meta:
        model = Story
        fields = '__all__'
