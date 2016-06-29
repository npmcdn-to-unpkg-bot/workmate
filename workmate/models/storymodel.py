# -*- coding: utf-8 -*-
from django.db import models

from .abstract import SiteAbstract
from .tagsmodel import Tag


class StoryState(SiteAbstract):
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0, editable=False, db_index=True)

    class Meta:
        ordering = ('order',)

    def __str__(self):
        return self.title


class StoryTask(models.Model):
    story = models.ForeignKey('Story', related_name='tasks')
    description = models.TextField()
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return self.description


class StoryType(SiteAbstract):
    title = models.CharField(max_length=100)

    class Meta:
        ordering = ('title',)

    def __str__(self):
        return self.title


class Story(SiteAbstract):

    DEFAULT_STORY_STATE_ID = 1
    DEFAULT_STORY_TYPE_ID = 1

    title = models.TextField()
    type = models.ForeignKey(StoryType, default=DEFAULT_STORY_TYPE_ID)
    state = models.ForeignKey(StoryState, default=DEFAULT_STORY_STATE_ID)
    effort = models.DecimalField(decimal_places=1, max_digits=2, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    icebox = models.BooleanField(default=True)
    order = models.DecimalField(decimal_places=8, max_digits=16)

    class Meta:
        ordering = ('order',)

    def __str__(self):
        return self.title
