from django import template
register = template.Library()


@register.filter('class_name')
def class_name(ob):
    return ob.__class__.__name__
