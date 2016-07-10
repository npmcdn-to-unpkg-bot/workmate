from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie.serializers import Serializer


class DefaultResourceMixin(ModelResource):
    class Meta:
        authentication = SessionAuthentication()
        authorization = Authorization()
        always_return_data = True
        detail_allowed_methods = ['get', 'put', 'delete']
        list_allowed_methods = ['get', 'post']
        object_class = None
        serializer = Serializer()
