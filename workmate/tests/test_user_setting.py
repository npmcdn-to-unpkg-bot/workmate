from django.core.urlresolvers import reverse
from django.views.generic.edit import UpdateView

from workmate.models import UserSetting
from workmate.tests.mixins import AuthTestMixin
from workmate.test_utils.test_case import WorkmateTestCase
from workmate.views import UserSettingUpdate


class ModelTests(WorkmateTestCase):

    def test_user(self):
        field = UserSetting._meta.get_field("user")
        self.assertFalse(field.null)
        self.assertEqual(field.__class__.__name__, 'OneToOneField')

    def test_gradwell_token(self):
        field = UserSetting._meta.get_field("gradwell_token")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.max_length, 100)

    def test_gradwell_extension(self):
        field = UserSetting._meta.get_field("gradwell_extension")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.max_length, 20)

    def test_str_method(self):
        user = self.create_user()
        usersetting = UserSetting(user=user)
        self.assertEqual(usersetting.__str__(), user.__str__())


class UpdateViewTests(AuthTestMixin, WorkmateTestCase):

    def get_url(self):
        return reverse('usersetting-update')

    def test_is_correct_base_class(self):
        self.assertTrue(issubclass(UserSettingUpdate, UpdateView))

    def test_success_message_with_no_profile(self):
        self.login()
        data = {
            'gradwell_token': 'ABC123',
            'gradwell_extension': '123456'
        }
        response = self.client.post(self.url, data, follow=True)
        self.assertIn(
            'Your settings were updated successfully.', str(response.content)
        )

    def test_success_message_with_profile(self):
        user = self.create_user()
        UserSetting.objects.create(user=user)
        self.login()
        data = {
            'gradwell_token': 'ABC123',
            'gradwell_extension': '123456'
        }
        response = self.client.post(self.url, data, follow=True)
        self.assertIn(
            'Your settings were updated successfully.', str(response.content)
        )
