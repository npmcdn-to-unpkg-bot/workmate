from tastypie import fields
from tastypie.resources import ModelResource

from .mixins import DefaultResourceMixin
from .tag import TagResource
from workmate.api.validation import ModelFormValidation
from workmate.forms import StoryForm
from workmate.models import Story, StoryState, StoryTask, StoryType


class StoryTaskResource(ModelResource):
    story = fields.ToOneField('workmate.api.resources.StoryResource', 'story')

    class Meta(DefaultResourceMixin.Meta):
        queryset = StoryTask.objects.all()
        resource_name = 'story_task'


class StoryTypeResource(DefaultResourceMixin):

    class Meta(DefaultResourceMixin.Meta):
        queryset = StoryType.onsite.all()
        resource_name = 'story_type'


class StoryStateResource(ModelResource):

    class Meta(DefaultResourceMixin.Meta):
        queryset = StoryState.onsite.all()
        resource_name = 'story_state'


class StoryResource(ModelResource):
    tags = fields.ToManyField(TagResource, 'tags', null=True, full=True)
    tasks = fields.ToManyField(StoryTaskResource, 'tasks', related_name='story', null=True, full=True)
    type = fields.ForeignKey(StoryTypeResource, 'type', full=True)
    state = fields.ForeignKey(StoryStateResource, 'state', full=True)

    class Meta(DefaultResourceMixin.Meta):
        queryset = Story.onsite.all().select_related('state', 'type').prefetch_related('tags', 'tasks')
        resource_name = 'story'

        @property
        def validation(self):
            return ModelFormValidation(form_class=StoryForm, resource=StoryResource)
