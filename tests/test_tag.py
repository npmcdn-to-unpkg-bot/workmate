from django.conf import settings
from django.contrib.sites.managers import CurrentSiteManager
from django.contrib.sites.models import Site
from django.db.models import Manager
from django.test import TestCase

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

    def test_default_manager(self):
        self.assertEqual(Tag._default_manager.__class__, CurrentSiteManager)

    def test_objects_manager(self):
        self.assertEqual(Tag.objects.__class__, Manager)

    def test_queryset_all(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Tag.objects.create(name='tag')
        Tag.objects.create(name='tag', site=another_site)
        self.assertEqual(Tag.objects.count(), 2)

    def test_queryset_onsite(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Tag.objects.create(name='tag')
        Tag.objects.create(name='tag', site=another_site)
        self.assertEqual(Tag.onsite.count(), 1)
