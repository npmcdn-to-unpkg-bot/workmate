from django.conf import settings
from django.contrib import messages
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect

from workmate.models import SiteSetting


class SiteSettingMiddleware(object):

    def process_request(self, request):
        site_settings_url = reverse('admin:sites_site_change', args=(settings.SITE_ID,))
        exempt_urls = [
            reverse('admin:logout'),
            settings.LOGOUT_URL,
            site_settings_url,
        ]
        if request.user.is_authenticated() and request.path_info not in exempt_urls:
            try:
                SiteSetting.onsite.get(site_id=settings.SITE_ID)
            except SiteSetting.DoesNotExist:
                messages.add_message(
                    request,
                    messages.WARNING,
                    'You are required upon first use of this site to complete the site settings below, '
                    'such as company name and email address.')
                return HttpResponseRedirect(site_settings_url)
