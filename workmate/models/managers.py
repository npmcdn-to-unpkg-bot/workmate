from django.conf import settings
from django.db import models

from workmate.models.query import BaseQuerySet


class TagManager(models.Manager):

    def get_queryset(self):
        return BaseQuerySet(self.model, using=self._db)

    def on_site(self, site_id=settings.SITE_ID):
        return self.get_queryset().on_site(site_id=site_id)
