from django.contrib.sites.managers import CurrentSiteManager
from django.db.models import ForeignKey, OneToOneField

from workmate.conf import settings
from workmate.models.abstract import SiteAbstract, SiteOneToOneAbstract
from workmate.test_utils.test_case import WorkmateTestCase


class SiteAbstractModelTests(WorkmateTestCase):

    def test_site(self):
        field = SiteAbstract._meta.get_field("site")
        self.assertEqual(field.__class__, ForeignKey)
        self.assertFalse(field.null)
        self.assertFalse(field.editable)
        self.assertEqual(field.default, settings.SITE_ID)


class SiteAbstractManagerTests(WorkmateTestCase):

    def test_default_manager(self):
        self.assertEqual(SiteAbstract._default_manager.__class__, CurrentSiteManager)


class SiteOneToOneAbstractModelTests(WorkmateTestCase):

    def test_site(self):
        field = SiteOneToOneAbstract._meta.get_field("site")
        self.assertEqual(field.__class__, OneToOneField)
        self.assertFalse(field.null)
        self.assertFalse(field.editable)
        self.assertEqual(field.default, settings.SITE_ID)


class SiteOneToOneAbstractManagerTests(WorkmateTestCase):

    def test_default_manager(self):
        self.assertEqual(SiteAbstract._default_manager.__class__, CurrentSiteManager)
