from .mixins import DefaultResourceMixin
from workmate.models import Tag


class TagResource(DefaultResourceMixin):

    class Meta(DefaultResourceMixin.Meta):
        queryset = Tag.onsite.all()
        resource_name = 'tag'
