# -*- coding: utf-8 -*-
import imp
from importlib import import_module

from django.apps import apps


def installed_apps():
    return [app.name for app in apps.get_app_configs()]


def get_module(app, modname):
    module_name = '%s.%s' % (app, modname)
    app_mod = import_module(app)
    try:
        imp.find_module(modname, app_mod.__path__ if hasattr(app_mod, '__path__') else None)
    except ImportError:
        return None
    return import_module(module_name)


def load(modname):
    for app in installed_apps():
        get_module(app, modname)
