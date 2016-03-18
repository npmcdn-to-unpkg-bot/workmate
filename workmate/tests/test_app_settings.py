from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse
from django.test import TestCase

from workmate.models import SiteSetting
from workmate.models.abstract import SiteOneToOneAbstract
from workmate.test_utils.helpers import create_default_site_settings


UserModel = get_user_model()


class ModelTests(TestCase):

    def test_base_class_is_site_abstract(self):
        self.assertEqual(SiteSetting.__base__, SiteOneToOneAbstract)

    def test_company_name(self):
        field = SiteSetting._meta.get_field("company_name")
        self.assertFalse(field.null)
        self.assertEqual(field.max_length, 255)

    def test_company_email_address(self):
        field = SiteSetting._meta.get_field("company_email_address")
        self.assertFalse(field.null)
        self.assertEqual(field.__class__.__name__, 'EmailField')

    def test_str_method(self):
        site_setting = SiteSetting(company_name='Foo Inc.')
        self.assertEqual(site_setting.__str__(), site_setting.site.domain)


class MiddleWareTests(TestCase):

    def setUp(self):
        self.user = UserModel.objects.create_superuser('admin', 'admin@example.com', 'password')
        self.site_settings_url = reverse('admin:sites_site_change', args=(settings.SITE_ID,))

    def test_no_site_settings_redirects_to_change_form_when_authed(self):
        self.client.login(username='admin', password='password')
        request = self.client.get('/')
        self.assertRedirects(request, self.site_settings_url)

    def test_with_site_settings_no_redirect(self):
        create_default_site_settings()
        self.client.login(username='admin', password='password')
        request = self.client.get('/')
        self.assertEqual(request.status_code, 200)

    def test_login_url_is_excluded(self):
        request = self.client.get(settings.LOGIN_URL)
        self.assertEqual(request.status_code, 200)

    def test_admin_login_url_is_excluded(self):
        request = self.client.get(reverse('admin:login'))
        self.assertEqual(request.status_code, 200)

    def test_no_site_settings_redirects_to_login_when_unauthed(self):
        request = self.client.get('/')
        self.assertRedirects(request, settings.LOGIN_URL + '?next=/')
