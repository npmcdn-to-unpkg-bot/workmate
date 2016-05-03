from workmate.models import UserSetting
from workmate.test_utils.test_case import WorkmateTestCase


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
