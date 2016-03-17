from django.conf import settings
from django.contrib.sites.managers import CurrentSiteManager
from django.db.models import ForeignKey, Manager, OneToOneField
from django.test import TestCase

from workmate.models.abstract import SiteAbstract, SiteOneToOneAbstract


class SiteAbstractModelTests(TestCase):

    def test_site(self):
        field = SiteAbstract._meta.get_field("site")
        self.assertEqual(field.__class__, ForeignKey)
        self.assertFalse(field.null)
        self.assertFalse(field.editable)
        self.assertEqual(field.default, settings.SITE_ID)


class SiteAbstractManagerTests(TestCase):

    def test_default_manager(self):
        self.assertEqual(SiteAbstract._default_manager.__class__, CurrentSiteManager)


class SiteOneToOneAbstractModelTests(TestCase):

    def test_site(self):
        field = SiteOneToOneAbstract._meta.get_field("site")
        self.assertEqual(field.__class__, OneToOneField)
        self.assertFalse(field.null)
        self.assertFalse(field.editable)
        self.assertEqual(field.default, settings.SITE_ID)


class SiteOneToOneAbstractManagerTests(TestCase):

    def test_default_manager(self):
        self.assertEqual(SiteAbstract._default_manager.__class__, CurrentSiteManager)
