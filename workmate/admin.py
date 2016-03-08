from django.contrib import admin

from reversion.admin import VersionAdmin

from workmate.models import Contact, Tag


class ContactAdmin(VersionAdmin):

    list_display = ['__str__', 'email_address', 'mobile_number', 'work_number']
    list_filter = ('tags',)
    filter_horizontal = ('tags',)
    search_fields = ('first_name', 'last_name', 'email_address')


admin.site.register(Contact, ContactAdmin)
admin.site.register(Tag, VersionAdmin)
