from tastypie.api import Api

from workmate.api.resources import *


v1_api = Api(api_name='v1')
v1_api.register(ContactResource())
v1_api.register(TagResource())
