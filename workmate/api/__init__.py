from tastypie.api import Api

from workmate.api.resources import *


v1_api = Api(api_name='v1')
v1_api.register(ContactResource())
v1_api.register(StoryResource())
v1_api.register(StoryStateResource())
v1_api.register(StoryTaskResource())
v1_api.register(StoryTypeResource())
v1_api.register(TagResource())
