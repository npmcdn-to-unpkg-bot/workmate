from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie.serializers import Serializer

from workmate.models import Tag


class TagResource(ModelResource):
    class Meta:
        authentication = SessionAuthentication()
        authorization = Authorization()
        always_return_data = True
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
        list_allowed_methods = ['get', 'post']
        queryset = Tag.onsite.all()
        resource_name = 'tag'
        serializer = Serializer()
