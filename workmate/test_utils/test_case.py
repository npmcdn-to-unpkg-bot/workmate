from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.test import TestCase

from tastypie.test import ResourceTestCaseMixin

from workmate.test_utils.helpers import create_site_settings, create_user_settings, get_context


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

    def create_user_settings(self, user):
        return create_user_settings(user)

    def login(self, username='username', is_staff=False, is_superuser=False):
        user = self.create_user(username, is_staff, is_superuser)
        user.set_password('password')
        user.save()
        return self.client.login(username=username, password='password')

    def get_context(self, user=None):
        return get_context(user=user)

    def get_request(self, path=None):
        path = path or '/'
        return self.client.get(path)


class WorkmateAPITestCase(ResourceTestCaseMixin, WorkmateTestCase):

    def setUp(self):
        super(WorkmateAPITestCase, self).setUp()
        self.create_site_settings()

    def clear_permissions(self, user):
        user.user_permissions.clear()

    def add_permissions(self, user, permissions):
        for permission in permissions:
            object = Permission.objects.get(codename=permission)
            user.user_permissions.add(object)

    def get_credentials(self, username='username', is_staff=False, is_superuser=False, permissions=[]):
        user = self.create_user(username, is_staff, is_superuser)
        user.set_password('password')
        user.save()
        self.clear_permissions(user)
        self.add_permissions(user, permissions)
        return self.api_client.client.login(username=username, password='password')
