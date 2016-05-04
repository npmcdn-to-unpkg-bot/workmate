from django.template import Template

from workmate.test_utils.test_case import WorkmateTestCase


class ClassNameTests(WorkmateTestCase):

    def test_returns_class_name(self):
        context = self.get_context()
        tpl = Template("{% load filter_tags %}{{ request.user|class_name }}")
        self.assertEqual(tpl.render(context), 'AnonymousUser')
