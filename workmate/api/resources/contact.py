from django.conf.urls import url

from tastypie import fields, http
from tastypie.utils import trailing_slash

from .mixins import DefaultResourceMixin
from .tag import TagResource
from workmate.conf import settings
from workmate.gateways import get_gateway_class
from workmate.models import Contact


class ContactResource(DefaultResourceMixin):
    address = fields.CharField(attribute='address', readonly=True, default='')
    name = fields.CharField(attribute='name', readonly=True)
    tags = fields.ToManyField(TagResource, 'tags', null=True, full=True)

    class Meta(DefaultResourceMixin.Meta):
        include_absolute_url = True
        queryset = Contact.onsite.all().prefetch_related('tags')
        resource_name = 'contact'

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/(?P<pk>\w[\w/-]*)/call%s$" % (self._meta.resource_name, trailing_slash()),
                self.wrap_view('call'), name="api_call"),
        ]

    def call(self, request, **kwargs):
        self.method_check(request, allowed=['post'])
        self.is_authenticated(request)
        self.throttle_check(request)

        data = self.deserialize(request, request.body, format=request.META.get('CONTENT_TYPE', 'application/json'))
        number_type = data.get('type')
        allowed_types = ['home_number', 'mobile_number', 'work_number']

        if not number_type or number_type not in allowed_types:
            return self.error_response(
                request,
                {'status': 'error',
                 'message': 'Requires type parameter, allowed values are : %s' % ', '.join(allowed_types)})
        try:
            object = Contact.objects.get(pk=kwargs.get('pk'))
            number_attr = getattr(object, number_type)
            number = number_attr.as_national.replace(' ', '')
            call_gateway = get_gateway_class(settings.WORKMATE_CALL_GATEWAY)()

            success, message = call_gateway.make_call(request.user, number)
            if success:
                return self.create_response(request, {'status': 'success', 'message': message})
            return self.error_response(request, {'status': 'error', 'message': message})

        except Contact.DoesNotExist:
            return self.error_response(request, {}, http.HttpNotFound)

        return self.error_response(request, {'status': 'error', 'message': 'Oops, Something went wrong'})
