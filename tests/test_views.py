from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse
from django.test import TestCase


UserModel = get_user_model()


class MainTests(TestCase):

    def setUp(self):
        self.url = reverse('workmate-main')
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
