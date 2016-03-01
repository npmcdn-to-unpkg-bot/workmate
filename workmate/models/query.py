from django.conf import settings
from django.db import models


class BaseQuerySet(models.QuerySet):

    def on_site(self, site_id=settings.SITE_ID):
        return self.filter(site__id=site_id)
