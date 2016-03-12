# -*- coding: utf-8 -*-
from django.conf import settings
from django.contrib.sites.managers import CurrentSiteManager
from django.contrib.sites.models import Site
from django.db import models

from taggit_selectize.managers import TaggableManager


class SiteAbstract(models.Model):

    site = models.ForeignKey(Site, default=settings.SITE_ID, editable=False)

    onsite = CurrentSiteManager()
    objects = models.Manager()

    class Meta:
        abstract = True


class TagsAbstract(models.Model):

    tags = TaggableManager(blank=True)

    class Meta:
        abstract = True
