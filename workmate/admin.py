from django.contrib import admin

from workmate.models import Tag


class TagAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        queryset = super(TagAdmin, self).get_queryset(request)
        queryset = queryset.on_site()
        return queryset


admin.site.register(Tag, TagAdmin)
