from tastypie import fields
from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie.serializers import Serializer

from .tag import TagResource
from workmate.models import Story


class StoryResource(ModelResource):
    tags = fields.ToManyField(TagResource, 'tags', null=True, full=True)

    class Meta:
        authentication = SessionAuthentication()
        authorization = Authorization()
        always_return_data = True
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
        include_absolute_url = False
        list_allowed_methods = ['get', 'post']
        queryset = Story.onsite.all().prefetch_related('tags')
        resource_name = 'story'
        serializer = Serializer()
