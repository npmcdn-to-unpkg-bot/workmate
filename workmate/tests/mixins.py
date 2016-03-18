from django.conf import settings


class AuthTestMixin(object):

    def get_url(self):
        raise NotImplementedError

    def setUp(self):
        self.create_site_settings()
        self.url = self.get_url()

    def test_login_required(self):
        response = self.get_request(self.url)
        self.assertRedirects(response, settings.LOGIN_URL + '?next=' + self.url)

    def test_logged_in_grants_access(self):
        self.login()
        response = self.get_request(self.url)
        self.assertEqual(response.status_code, 200)
