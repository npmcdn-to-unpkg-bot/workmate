# -*- coding: utf-8 -*-
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField

from .abstract import SiteAbstract, TagsAbstract
from ..utils.color_generator import generate_new_color


class Contact(SiteAbstract, TagsAbstract):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email_address = models.EmailField(null=True, blank=True)
    home_number = PhoneNumberField(null=True, blank=True, help_text=_('eg: +441234567890'))
    mobile_number = PhoneNumberField(null=True, blank=True, help_text=_('eg: +447234567890'))
    work_number = PhoneNumberField(null=True, blank=True, help_text=_('eg: +441234567890'))
    website = models.URLField(null=True, blank=True, help_text=_('eg: http://www.example.com'))
    notes = models.TextField(null=True, blank=True)
    color = models.CharField(null=True, blank=True, max_length=10, editable=False)

    class Meta:
        ordering = ('first_name', 'last_name')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.color:
            self.color = generate_new_color()
        super(Contact, self).save(*args, **kwargs)

    @property
    def name(self):
        return '{} {}'.format(self.first_name, self.last_name)

    def get_absolute_url(self):
        return reverse('contact-update', kwargs={'pk': self.pk})
