# -*- coding: utf-8 -*-
from django.contrib.sites.managers import CurrentSiteManager
from django.contrib.sites.models import Site
from django.db import models

from workmate.conf import settings


class SiteAbstract(models.Model):

    site = models.ForeignKey(Site, default=settings.SITE_ID, editable=False)

    onsite = CurrentSiteManager()
    objects = models.Manager()

    class Meta:
        abstract = True


class SiteOneToOneAbstract(models.Model):

    site = models.OneToOneField(Site, default=settings.SITE_ID, editable=False)

    onsite = CurrentSiteManager()
    objects = models.Manager()

    class Meta:
        abstract = True
