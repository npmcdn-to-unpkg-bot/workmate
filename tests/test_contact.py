from django.conf import settings
from django.contrib.admin.sites import AdminSite
from django.contrib.sites.models import Site
from django.test import TestCase

from .helpers import get_request
from workmate.admin import ContactAdmin
from workmate.models import Contact


class ModelTests(TestCase):

    def test_first_name(self):
        field = Contact._meta.get_field("first_name")
        self.assertFalse(field.null)
        self.assertEqual(field.max_length, 255)

    def test_last_name(self):
        field = Contact._meta.get_field("last_name")
        self.assertFalse(field.null)
        self.assertEqual(field.max_length, 255)

    def test_email_address(self):
        field = Contact._meta.get_field("email_address")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.__class__.__name__, 'EmailField')

    def test_home_number(self):
        field = Contact._meta.get_field("home_number")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.__class__.__name__, 'PhoneNumberField')

    def test_mobile_number(self):
        field = Contact._meta.get_field("mobile_number")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.__class__.__name__, 'PhoneNumberField')

    def test_work_number(self):
        field = Contact._meta.get_field("work_number")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.__class__.__name__, 'PhoneNumberField')

    def test_website(self):
        field = Contact._meta.get_field("website")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.__class__.__name__, 'URLField')

    def test_tags(self):
        field = Contact._meta.get_field("tags")
        self.assertTrue(field.blank)

    def test_notes(self):
        field = Contact._meta.get_field("notes")
        self.assertTrue(field.blank)
        self.assertTrue(field.null)

    def test_site(self):
        field = Contact._meta.get_field("site")
        self.assertFalse(field.null)
        self.assertFalse(field.editable)
        self.assertEqual(field.default, settings.SITE_ID)

    def test_str_method(self):
        contact = Contact(first_name='Some', last_name='One')
        self.assertEqual(contact.__str__(), 'Some One')


class ModelManagerTests(TestCase):

    def test_queryset_all(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Contact.objects.create(first_name='Some', last_name='One')
        Contact.objects.create(first_name='Some', last_name='One Else', site=another_site)
        self.assertEqual(Contact.objects.all().count(), 2)

    def test_queryset_on_site(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Contact.objects.create(first_name='Some', last_name='One')
        Contact.objects.create(first_name='Some', last_name='One Else', site=another_site)
        self.assertEqual(Contact.objects.on_site().count(), 1)


class AdminTests(TestCase):

    def setUp(self):
        self.request = get_request('en')

    def test_queryset_filters_for_current_site(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Contact.objects.create(first_name='Some', last_name='One')
        Contact.objects.create(first_name='Some', last_name='One Else', site=another_site)
        contact_admin = ContactAdmin(Contact, AdminSite())
        self.assertTrue(contact_admin.get_queryset(self.request).count(), 1)
