# -*- coding: utf-8 -*-
from django.db import models

from .abstract import SiteOneToOneAbstract


class SiteSetting(SiteOneToOneAbstract):

    company_name = models.CharField(max_length=255)
    company_email_address = models.EmailField()

    def __str__(self):
        return self.site.domain
