# -*- coding: utf-8 -*-
from django.contrib.auth.models import AnonymousUser
from django.template.context import Context
from django.test import RequestFactory

from workmate.conf import settings
from workmate.models import SiteSetting, UserSetting


def create_site_settings():
    return SiteSetting.onsite.create(
        company_name='Foo Inc.',
        company_email_address='foo@inc.com'
    )


def create_user_settings(user):
    setting = UserSetting.objects.create(
        user=user,
        gradwell_token='ABC123',
        gradwell_extension='123456'
    )
    return setting


def get_request(language=None, user=None, path=None):
    request_factory = RequestFactory(HTTP_HOST=settings.ALLOWED_HOSTS[0])
    request = request_factory.get(path or "/")
    request.session = {}
    request.LANGUAGE_CODE = language or settings.LANGUAGE_CODE
    request.user = user or AnonymousUser()
    return request


def get_context(path=None, user=None):
    path = path or '/'
    context = {}
    request = get_request(user=user, path=path)
    context['request'] = request
    return Context(context)
