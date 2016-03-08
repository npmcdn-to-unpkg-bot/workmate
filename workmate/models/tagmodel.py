from django.db import models

from .abstract import SiteAbstract


class Tag(SiteAbstract):
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ['name']
        unique_together = ('name', 'site')

    def __str__(self):
        return self.name
