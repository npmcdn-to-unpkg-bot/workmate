# -*- coding: utf-8 -*-
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory

from workmate.models import SiteSetting


def create_default_site_settings():
    SiteSetting.onsite.create(
        company_name='Foo Inc.',
        company_email_address='foo@inc.com'
    )


def get_request(language=None, user=None, path=None):
    request_factory = RequestFactory(HTTP_HOST=settings.ALLOWED_HOSTS[0])
    request = request_factory.get(path or "/")
    request.session = {}
    request.LANGUAGE_CODE = language or settings.LANGUAGE_CODE
    request.user = user or AnonymousUser()
    return request
