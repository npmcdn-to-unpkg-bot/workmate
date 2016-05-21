from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie.serializers import Serializer


class DefaultResourceMixin(ModelResource):
    class Meta:
        authentication = SessionAuthentication()
        authorization = Authorization()
        always_return_data = True
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
        list_allowed_methods = ['get', 'post']
        serializer = Serializer()
