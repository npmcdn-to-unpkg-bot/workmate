# -*- coding: utf-8 -*-
from django.db import models
from django.db.models.signals import post_delete, post_save

from .abstract import SiteAbstract
from workmate.signals.notifications import post_delete_notification, post_save_notification


class Tag(SiteAbstract):
    title = models.CharField(max_length=255)

    class Meta:
        ordering = ('title', )

    def __str__(self):
        return self.title


post_delete.connect(post_delete_notification, sender=Tag)
post_save.connect(post_save_notification, sender=Tag)
