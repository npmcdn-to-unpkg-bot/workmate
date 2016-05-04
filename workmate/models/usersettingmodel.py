# -*- coding: utf-8 -*-
from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _


class UserSetting(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL)
    gradwell_token = models.CharField(
        max_length=100, null=True, blank=True,
        help_text=_('Your gradwell api authentication token associated to your account'))
    gradwell_extension = models.CharField(
        max_length=20, null=True, blank=True, help_text=_('Your gradwell telephone extension number'))

    def __str__(self):
        return self.user.__str__()
