# -*- coding: utf-8 -*-
from django import forms
from django.contrib import admin
from django.contrib.sites.models import Site
from reversion.admin import VersionAdmin

from .models import Contact, SiteSetting


class ContactAdmin(VersionAdmin):

    list_display = ['__str__', 'email_address', 'mobile_number', 'work_number']
    list_filter = ('tags',)
    search_fields = ('first_name', 'last_name', 'email_address')


class SiteInline(admin.StackedInline):
    model = SiteSetting
    exclude = ['id']
    can_delete = False


class SiteAdmin(VersionAdmin):

    inlines = (SiteInline,)


admin.site.register(Contact, ContactAdmin)
admin.site.unregister(Site)
admin.site.register(Site, SiteAdmin)
