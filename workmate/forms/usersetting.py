# -*- coding: utf-8 -*-
from django import forms

from workmate.models import UserSetting


class UserSettingForm(forms.ModelForm):

    class Meta:
        model = UserSetting
        exclude = ('user',)
