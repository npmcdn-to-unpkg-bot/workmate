from mock import patch

from django.core.urlresolvers import reverse
from django.test import TestCase

from workmate.tests.mixins import AuthTestMixin
from workmate.models import Contact
from workmate.models.abstract import SiteAbstract


class ModelTests(TestCase):

    def test_base_class_is_site_abstract(self):
        self.assertEqual(Contact.__base__, SiteAbstract)

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

    def test_color(self):
        field = Contact._meta.get_field("color")
        self.assertTrue(field.blank)
        self.assertTrue(field.null)
        self.assertFalse(field.editable)
        self.assertEqual(field.max_length, 10)

    def test_str_method(self):
        contact = Contact(first_name='Some', last_name='One')
        self.assertEqual(contact.__str__(), 'Some One')

    def test_get_absolute_url(self):
        contact = Contact.objects.create(first_name='Mr', last_name='Smith')
        self.assertEqual(contact.get_absolute_url(), reverse('contact-update', kwargs={'pk': contact.id}))

    @patch('workmate.models.contactmodel.generate_new_color')
    def test_save_method_updates_color(self, fn_mock):
        fn_mock.return_value = '#000000'
        contact = Contact.objects.create(first_name='Mr', last_name='Smith')
        self.assertEqual(contact.color, fn_mock.return_value)

    @patch('workmate.models.contactmodel.generate_new_color')
    def test_save_method_does_not_change_existing_color(self, fn_mock):
        fn_mock.return_value = '#000000'
        contact = Contact.objects.create(first_name='Mr', last_name='Smith', color='#ffffff')
        self.assertEqual(contact.color, '#ffffff')


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
