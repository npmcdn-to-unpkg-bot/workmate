# -*- coding: utf-8 -*-
from django.db import models

from .abstract import SiteAbstract
from .tagsmodel import Tag


class Story(SiteAbstract):
    title = models.TextField()
    effort = models.DecimalField(decimal_places=1, max_digits=2, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    description = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ('title',)

    def __str__(self):
        return self.title
