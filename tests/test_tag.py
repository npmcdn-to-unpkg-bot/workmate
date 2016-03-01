from django.conf import settings
from django.contrib.admin.sites import AdminSite
from django.contrib.sites.models import Site
from django.test import TestCase

from .helpers import get_request
from workmate.admin import TagAdmin
from workmate.models import Tag


class ModelTests(TestCase):

    def test_name(self):
        field = Tag._meta.get_field("name")
        self.assertFalse(field.null)
        self.assertEqual(field.max_length, 50)

    def test_site(self):
        field = Tag._meta.get_field("site")
        self.assertFalse(field.null)
        self.assertFalse(field.editable)
        self.assertEqual(field.default, settings.SITE_ID)

    def test_str_method(self):
        tag = Tag(name='some tag')
        self.assertEqual(tag.__str__(), tag.name)


class ModelManagerTests(TestCase):

    def test_queryset_all(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Tag.objects.create(name='tag')
        Tag.objects.create(name='tag', site=another_site)
        self.assertEqual(Tag.objects.all().count(), 2)

    def test_queryset_on_site(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Tag.objects.create(name='tag')
        Tag.objects.create(name='tag', site=another_site)
        self.assertEqual(Tag.objects.on_site().count(), 1)


class AdminTests(TestCase):

    def setUp(self):
        self.request = get_request('en')

    def test_queryset_filters_for_current_site(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Tag.objects.create(name='tag')
        Tag.objects.create(name='tag', site=another_site)
        tag_admin = TagAdmin(Tag, AdminSite())
        self.assertTrue(tag_admin.get_queryset(self.request).count(), 1)
