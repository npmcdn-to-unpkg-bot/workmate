# -*- coding: utf-8 -*-
from django.core.urlresolvers import reverse
from django.db import models
from django.db.models.signals import post_delete, post_save
from django.utils.translation import ugettext_lazy as _

from localflavor.gb.gb_regions import GB_REGION_CHOICES
from phonenumber_field.modelfields import PhoneNumberField

from .abstract import SiteAbstract
from .tagsmodel import Tag
from workmate.signals.notifications import post_delete_notification, post_save_notification
from workmate.utils.color_generator import generate_new_color
from workmate.utils.misc import xstr


class Contact(SiteAbstract):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email_address = models.EmailField(null=True, blank=True)
    home_number = PhoneNumberField(null=True, blank=True, help_text=_('eg: +441234567890'))
    mobile_number = PhoneNumberField(null=True, blank=True, help_text=_('eg: +447234567890'))
    work_number = PhoneNumberField(null=True, blank=True, help_text=_('eg: +441234567890'))
    website = models.URLField(null=True, blank=True, help_text=_('eg: http://www.example.com'))
    notes = models.TextField(null=True, blank=True)
    color = models.CharField(null=True, blank=True, max_length=10, editable=False)
    tags = models.ManyToManyField(Tag, blank=True)

    address_line_1 = models.CharField(_('Address Line 1'), null=True, blank=True, max_length=100)
    address_line_2 = models.CharField(_('Address Line 2'), null=True, blank=True, max_length=100)
    city = models.CharField(_('Town'), null=True, blank=True, max_length=100)
    state = models.CharField(_('County'), null=True, blank=True, max_length=100, choices=GB_REGION_CHOICES)
    code = models.CharField(_('Postcode'), null=True, blank=True, max_length=10)

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

    @property
    def address(self):
        if self.address_line_1 or self.address_line_2 or self.city or self.state or self.code:
            return '{}{}{}{}{}'.format(
                xstr(self.address_line_1),
                xstr(self.address_line_2),
                xstr(self.city),
                xstr(self.state),
                xstr(self.code)).strip()

    def get_absolute_url(self):
        return reverse('contact-update', kwargs={'pk': self.pk})


post_save.connect(post_save_notification, sender=Contact)
post_delete.connect(post_delete_notification, sender=Contact)
