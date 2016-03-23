# -*- coding: utf-8 -*-
from django.db import models

from .abstract import SiteAbstract


class Tag(SiteAbstract):
    title = models.CharField(max_length=255)

    class Meta:
        ordering = ('title', )

    def __str__(self):
        return self.title
