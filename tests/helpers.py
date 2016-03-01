# -*- coding: utf-8 -*-
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory


def get_request(language=None):
    request_factory = RequestFactory(HTTP_HOST=settings.ALLOWED_HOSTS[0])
    request = request_factory.get("/")
    request.session = {}
    request.LANGUAGE_CODE = language or settings.LANGUAGE_CODE
    request.user = AnonymousUser()
    return request
