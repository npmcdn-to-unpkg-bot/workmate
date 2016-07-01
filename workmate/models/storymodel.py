# -*- coding: utf-8 -*-
from django.conf import settings
from django.db import models

from .abstract import SiteAbstract
from .tagsmodel import Tag
from workmate.utils.threadlocal import get_current_user


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
    order = models.DecimalField(decimal_places=8, max_digits=16)
    created_on = models.DateTimeField(auto_now_add=True, blank=True, null=True, editable=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, related_name='stories_created', editable=False)
    last_modified_on = models.DateTimeField(auto_now=True, blank=True, null=True, editable=False)
    last_modified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, related_name='stories_last_modified', editable=False)

    class Meta:
        ordering = ('order',)

    def __str__(self):
        return self.title

    def created_by_string(self):
        if self.created_by:
            return self.created_by.__str__()

    def last_modified_by_string(self):
        if self.last_modified_by:
            return self.last_modified_by.__str__()

    def save(self, *args, **kwargs):
        user = get_current_user()
        if user and not user.is_anonymous():
            self.last_modified_by = user
            if not self.pk:
                self.created_by = user
        super(Story, self).save(*args, **kwargs)
