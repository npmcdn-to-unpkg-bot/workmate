from functools import reduce
import operator

from django.db.models import Q

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

    def apply_filters(self, request, applicable_filters):
        base_object_list = super(ContactResource, self).apply_filters(request, applicable_filters)
        query = request.GET.get('query', None)
        search_args = []
        if query:
            for term in query.split(' '):
                for qry in ('first_name__icontains', 'last_name__icontains'):
                    search_args.append(Q(**{qry: term}))
            base_object_list = base_object_list.filter(reduce(operator.or_, search_args)).distinct()
        return base_object_list
