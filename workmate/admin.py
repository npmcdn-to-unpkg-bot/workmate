from django.contrib import admin

from reversion.admin import VersionAdmin

from workmate.models import Contact, Tag


class ModelAdmin(VersionAdmin):

    def get_queryset(self, request):
        queryset = super(ModelAdmin, self).get_queryset(request)
        queryset = queryset.on_site()
        return queryset


class ContactAdmin(ModelAdmin):

    list_display = ['__str__', 'email_address', 'mobile_number', 'work_number']
    list_filter = ('tags',)
    filter_horizontal = ('tags',)
    search_fields = ('first_name', 'last_name', 'email_address')


class TagAdmin(ModelAdmin):
    pass


admin.site.register(Contact, ContactAdmin)
admin.site.register(Tag, TagAdmin)
