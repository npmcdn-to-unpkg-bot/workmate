from django.conf import settings
from django.contrib.sites.models import Site
from django.db import models

from .managers import TagManager


class Tag(models.Model):
    name = models.CharField(max_length=50)
    site = models.ForeignKey(Site, default=settings.SITE_ID, editable=False)

    objects = TagManager()

    class Meta:
        ordering = ['name']
        unique_together = ('name', 'site')

    def __str__(self):
        return self.name
