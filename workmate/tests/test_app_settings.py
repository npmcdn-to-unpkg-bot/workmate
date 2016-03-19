from django.core.urlresolvers import reverse

from workmate.conf import settings
from workmate.models import SiteSetting
from workmate.models.abstract import SiteOneToOneAbstract
from workmate.test_utils.test_case import WorkmateTestCase


class ModelTests(WorkmateTestCase):

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


class MiddleWareTests(WorkmateTestCase):

    def setUp(self):
        self.site_settings_url = reverse('admin:sites_site_change', args=(settings.SITE_ID,))

    def test_no_site_settings_redirects_to_change_form_when_authed(self):
        self.login(is_superuser=True)
        request = self.get_request()
        self.assertEqual(request.status_code, 302)
        self.assertTrue(request.url.endswith(self.site_settings_url))

    def test_with_site_settings_no_redirect(self):
        self.create_site_settings()
        self.login(is_superuser=True)
        request = self.get_request()
        self.assertEqual(request.status_code, 200)

    def test_login_url_is_excluded(self):
        request = self.get_request(settings.LOGIN_URL)
        self.assertEqual(request.status_code, 200)

    def test_admin_login_url_is_excluded(self):
        request = self.get_request(reverse('admin:login'))
        self.assertEqual(request.status_code, 200)

    def test_no_site_settings_redirects_to_login_when_unauthed(self):
        request = self.get_request()
        self.assertRedirects(request, settings.LOGIN_URL + '?next=/')
