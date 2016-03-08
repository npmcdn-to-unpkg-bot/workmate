from django.conf import settings
from django.contrib.sites.managers import CurrentSiteManager
from django.contrib.sites.models import Site
from django.core.urlresolvers import reverse
from django.db.models import Manager
from django.test import TestCase

from .mixins import AuthTestMixin
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

    def test_get_absolute_url(self):
        contact = Contact.objects.create(first_name='Mr', last_name='Smith')
        self.assertEqual(contact.get_absolute_url(), reverse('contact-update', kwargs={'pk': contact.id}))


class ModelManagerTests(TestCase):

    def test_default_manager(self):
        self.assertEqual(Contact._default_manager.__class__, CurrentSiteManager)

    def test_objects_manager(self):
        self.assertEqual(Contact.objects.__class__, Manager)

    def test_queryset_all(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Contact.objects.create(first_name='Some', last_name='One')
        Contact.objects.create(first_name='Some', last_name='One Else', site=another_site)
        self.assertEqual(Contact.objects.count(), 2)

    def test_queryset_onsite(self):
        another_site = Site.objects.create(
            name='another.com', domain='another.com')
        Contact.objects.create(first_name='Some', last_name='One')
        Contact.objects.create(first_name='Some', last_name='One Else', site=another_site)
        self.assertEqual(Contact.onsite.count(), 1)


class ListViewTests(AuthTestMixin, TestCase):

    def get_url(self):
        return reverse('contact-list')


class CreateViewTests(AuthTestMixin, TestCase):

    def get_url(self):
        return reverse('contact-create')


class UpdateViewTests(AuthTestMixin, TestCase):

    def get_url(self):
        contact = Contact.objects.create(first_name='Mr', last_name='Smith')
        return reverse('contact-update', kwargs={'pk': contact.id})


class DeleteViewTests(AuthTestMixin, TestCase):

    def get_url(self):
        contact = Contact.objects.create(first_name='Mr', last_name='Smith')
        return reverse('contact-delete', kwargs={'pk': contact.id})
