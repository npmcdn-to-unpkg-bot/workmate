# -*- coding: utf-8 -*-
from django.contrib import admin

from reversion.admin import VersionAdmin

from .models import Contact


class ContactAdmin(VersionAdmin):

    list_display = ['__str__', 'email_address', 'mobile_number', 'work_number']
    list_filter = ('tags',)
    search_fields = ('first_name', 'last_name', 'email_address')


admin.site.register(Contact, ContactAdmin)
