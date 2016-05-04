# -*- coding: utf-8 -*-
from django.apps import apps


def installed_apps():
    return [app.name for app in apps.get_app_configs()]


def get_module(app, modname):
    module_name = '%s.%s' % (app, modname)
    try:
        module = __import__(module_name)
    except ImportError:
        module = None
    return module


def load(modname):
    for app in installed_apps():
        get_module(app, modname)
