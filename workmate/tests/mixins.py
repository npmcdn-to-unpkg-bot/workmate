from django.conf import settings
from django.contrib.auth import get_user_model

from workmate.test_utils.helpers import create_default_site_settings


UserModel = get_user_model()


class AuthTestMixin(object):

    def get_url(self):
        raise NotImplementedError

    def setUp(self):
        create_default_site_settings()
        self.url = self.get_url()
        self.user = UserModel.objects.create_user(
            username='uname', email='u@u.com', password='pword')

    def test_login_required(self):
        response = self.client.get(self.url)
        self.assertRedirects(
            response, settings.LOGIN_URL + '?next=' + self.url)

    def test_logged_in_grants_access(self):
        self.client.login(username='uname', password='pword')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
