from django.conf import settings
from django.contrib.sites.models import Site
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField

from .managers import ContactManager
from .tagmodel import Tag


class Contact(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email_address = models.EmailField(null=True, blank=True)
    home_number = PhoneNumberField(null=True, blank=True, help_text=_('eg: +441234567890'))
    mobile_number = PhoneNumberField(null=True, blank=True, help_text=_('eg: +447234567890'))
    work_number = PhoneNumberField(null=True, blank=True, help_text=_('eg: +441234567890'))
    website = models.URLField(null=True, blank=True, help_text=_('eg: http://www.example.com'))
    tags = models.ManyToManyField(Tag, blank=True, related_name='contacts')
    notes = models.TextField(null=True, blank=True)
    site = models.ForeignKey(Site, default=settings.SITE_ID, editable=False)

    objects = ContactManager()

    class Meta:
        ordering = ('first_name', 'last_name')

    def __str__(self):
        return self.name

    @property
    def name(self):
        return '{} {}'.format(self.first_name, self.last_name)

    def get_absolute_url(self):
        return reverse('contact-update', kwargs={'pk': self.pk})
