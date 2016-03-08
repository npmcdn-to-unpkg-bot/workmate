from django.contrib import admin

from reversion.admin import VersionAdmin

from .forms import ExcludedUniqueForm
from .models import Contact, Tag


class ContactAdmin(VersionAdmin):

    list_display = ['__str__', 'email_address', 'mobile_number', 'work_number']
    list_filter = ('tags',)
    filter_horizontal = ('tags',)
    search_fields = ('first_name', 'last_name', 'email_address')


class TagForm(ExcludedUniqueForm):

    class Meta:
        model = Tag
        fields = '__all__'


class TagAdmin(VersionAdmin):

    form = TagForm


admin.site.register(Contact, ContactAdmin)
admin.site.register(Tag, TagAdmin)
