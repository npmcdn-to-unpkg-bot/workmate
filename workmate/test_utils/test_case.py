from django.contrib.auth import get_user_model
from django.test import TestCase

from workmate.test_utils.helpers import create_site_settings, get_context


UserModel = get_user_model()


class WorkmateTestCase(TestCase):

    def create_user(self, username='username', is_staff=False, is_superuser=False):
        user, created = UserModel.objects.get_or_create(username=username)
        if is_staff or is_superuser:
            user.is_staff = is_staff
            user.is_superuser = is_superuser
            user.save()
        return user

    def create_site_settings(self):
        return create_site_settings()

    def login(self, username='username', is_staff=False, is_superuser=False):
        user = self.create_user(username, is_staff, is_superuser)
        user.set_password('password')
        user.save()
        self.client.login(username=username, password='password')

    def get_context(self, user=None):
        return get_context(user=user)

    def get_request(self, path=None):
        path = path or '/'
        return self.client.get(path)
