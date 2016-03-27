from django.core.urlresolvers import reverse
from django.template import Template

from workmate.models import Contact, Tag
from workmate.test_utils.test_case import WorkmateTestCase


class TagsFilterTest(WorkmateTestCase):

    def setUp(self):
        tag1 = Tag.onsite.create(title='Tag 1')
        tag2 = Tag.onsite.create(title='Tag 2')
        Tag.onsite.create(title='Tag 3')
        c1 = Contact.onsite.create(first_name='Some', last_name='One')
        c2 = Contact.onsite.create(first_name='Some', last_name='Other')
        c3 = Contact.onsite.create(first_name='Some', last_name='Else')
        c1.tags.add(tag1)
        c1.save
        c2.tags.add(tag1)
        c2.save
        c3.tags.add(tag1)
        c3.tags.add(tag2)
        c3.save
        self.context = self.get_context()
        tpl = Template("{% load filter_tags %}{% show_tags_filter 'contact' 'contact-list' %}")
        tpl.render(self.context)

    def test_tags_in_context(self):
        tags = self.context['tags']
        self.assertEqual(len(tags), 3)
        self.assertEqual(tags[0].count, 3)
        self.assertEqual(tags[1].count, 1)
        self.assertEqual(tags[2].count, 0)

    def test_url_in_context(self):
        url = self.context['url']
        self.assertEqual(url, 'contact-list')
