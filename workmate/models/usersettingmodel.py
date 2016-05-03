from django.conf import settings
from django.db import models


class UserSetting(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL)
    gradwell_token = models.CharField(max_length=100, null=True, blank=True)
    gradwell_extension = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.user.__str__()
