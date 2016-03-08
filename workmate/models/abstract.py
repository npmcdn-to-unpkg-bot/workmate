from django.conf import settings
from django.contrib.sites.managers import CurrentSiteManager
from django.contrib.sites.models import Site
from django.db import models


class SiteAbstract(models.Model):

    site = models.ForeignKey(Site, default=settings.SITE_ID, editable=False)

    onsite = CurrentSiteManager()
    objects = models.Manager()

    class Meta:
        abstract = True
