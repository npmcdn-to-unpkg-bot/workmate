# -*- coding: utf-8 -*-
from django.contrib.sites.models import Site

from workmate.conf import settings


def workmate_settings(request):
    """
    Adds workmate-related variables to the context.
    """

    return {
        'site': Site.objects.get_current(),
        'socket_url': settings.SOCKET_URL
    }
