from tastypie import fields

from .mixins import DefaultResourceMixin
from .tag import TagResource
from workmate.models import Contact


class ContactResource(DefaultResourceMixin):
    address = fields.CharField(attribute='address', readonly=True, default='')
    name = fields.CharField(attribute='name', readonly=True)
    tags = fields.ToManyField(TagResource, 'tags', null=True, full=True)

    class Meta(DefaultResourceMixin.Meta):
        include_absolute_url = True
        queryset = Contact.onsite.all().prefetch_related('tags')
        resource_name = 'contact'
