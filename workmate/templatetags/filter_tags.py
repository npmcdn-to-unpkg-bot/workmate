from django import template
from django.db.models import Count

from classytags.arguments import StringArgument
from classytags.core import Options
from classytags.helpers import InclusionTag

from workmate.models import Tag


register = template.Library()


@register.filter('class_name')
def class_name(ob):
    return ob.__class__.__name__


class ShowTagsFilter(InclusionTag):
    name = 'show_tags_filter'
    template = 'workmate/filters/tags_filter.html'

    options = Options(
        StringArgument('related_model', default=None, required=True),
        StringArgument('url', default=None, required=True),
    )

    def get_context(self, context, related_model, url):
        request = context['request']
        tag_id = request.GET.get('tag')
        tags = Tag.onsite.all().annotate(count=Count(related_model))
        context['tags'] = tags
        context['url'] = url
        context['selected_tag'] = tags.filter(id__iexact=int(tag_id))[0] if tag_id else None
        return context


register.tag(ShowTagsFilter)
