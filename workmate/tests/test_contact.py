from mock import patch

from django.core.urlresolvers import reverse
from django.views.generic import ListView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from workmate.models import Contact
from workmate.models.abstract import SiteAbstract
from workmate.test_utils.test_case import WorkmateTestCase
from workmate.tests.mixins import AuthTestMixin
from workmate.views import ContactCreate, ContactDelete, ContactList, ContactUpdate
from workmate.views.mixins import DeleteConformationMessageMixin, DeleteSuccessMessageMixin


class ModelTests(WorkmateTestCase):

    def test_base_class_is_site_abstract(self):
        self.assertTrue(issubclass(Contact, SiteAbstract))

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

    def test_address_line_1(self):
        field = Contact._meta.get_field("address_line_1")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.max_length, 100)

    def test_address_line_2(self):
        field = Contact._meta.get_field("address_line_2")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.max_length, 100)

    def test_city(self):
        field = Contact._meta.get_field("city")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.max_length, 100)

    def test_state(self):
        field = Contact._meta.get_field("state")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.max_length, 100)

    def test_code(self):
        field = Contact._meta.get_field("code")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.max_length, 10)

    def test_str_method(self):
        contact = Contact(first_name='Some', last_name='One')
        self.assertEqual(contact.__str__(), 'Some One')

    def test_address(self):
        contact = Contact(
            address_line_1='1 Foo Street',
            address_line_2='Foo',
            city='London',
            state='Foo',
            code='SW1A 1AA')
        self.assertEqual(contact.address, '1 Foo Street Foo London Foo SW1A 1AA')

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


class ListViewTests(AuthTestMixin, WorkmateTestCase):

    def get_url(self):
        return reverse('contact-list')

    def test_is_correct_base_class(self):
        self.assertTrue(issubclass(ContactList, ListView))


class CreateViewTests(AuthTestMixin, WorkmateTestCase):

    def get_url(self):
        return reverse('contact-create')

    def test_is_correct_base_class(self):
        self.assertTrue(issubclass(ContactCreate, CreateView))

    def test_created_success_message(self):
        self.login()
        data = {
            'first_name': 'Mr', 'last_name': 'Smith'
        }
        response = self.client.post(self.url, data, follow=True)
        self.assertIn(
            'The contact was created successfully.', str(response.content)
        )


class UpdateViewTests(AuthTestMixin, WorkmateTestCase):

    def get_url(self):
        contact = Contact.objects.create(first_name='Mr', last_name='Smith')
        return reverse('contact-update', kwargs={'pk': contact.id})

    def test_is_correct_base_class(self):
        self.assertTrue(issubclass(ContactUpdate, UpdateView))

    def test_updated_success_message(self):
        self.login()
        data = {
            'first_name': 'Mr', 'last_name': 'Smith'
        }
        response = self.client.post(self.url, data, follow=True)
        self.assertIn(
            'The contact was updated successfully.', str(response.content)
        )


class DeleteViewTests(AuthTestMixin, WorkmateTestCase):

    def get_url(self):
        contact = Contact.objects.create(first_name='Mr', last_name='Smith')
        return reverse('contact-delete', kwargs={'pk': contact.id})

    def test_is_correct_base_class(self):
        self.assertTrue(issubclass(ContactDelete, DeleteView))
        self.assertTrue(issubclass(ContactDelete, DeleteConformationMessageMixin))
        self.assertTrue(issubclass(ContactDelete, DeleteSuccessMessageMixin))

    def test_delete_conformation_message(self):
        self.login()
        response = self.get_request(self.url)
        self.assertIn(
            'Are you sure you want to delete Mr Smith?', str(response.content)
        )

    def test_deleted_success_message(self):
        self.login()
        response = self.client.post(self.url, follow=True)
        self.assertIn(
            'The contact was deleted successfully.', str(response.content)
        )
