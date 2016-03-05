# -*- coding: utf-8 -*-
import imp
import traceback
from importlib import import_module

from django.apps import apps


def installed_apps():
    return [app.name for app in apps.get_app_configs()]


def get_module(app, modname, verbose, failfast):
    """
    Internal function to load a module from a single app.
    """
    module_name = '%s.%s' % (app, modname)
    # the module *should* exist - raise an error if it doesn't
    app_mod = import_module(app)
    try:
        imp.find_module(modname, app_mod.__path__ if hasattr(app_mod, '__path__') else None)
    except ImportError:
        # this ImportError will be due to the module not existing
        # so here we can silently ignore it.  But an ImportError
        # when we import_module() should not be ignored
        if failfast:
            raise
        elif verbose:
            print(u"Could not find %r from %r" % (modname, app))  # changed
            traceback.print_exc()  # changed
        return None

    module = import_module(module_name)

    if verbose:
        print(u"Loaded %r from %r" % (modname, app))
    return module


def load(modname, verbose=False, failfast=False):
    """
    Loads all modules with name 'modname' from all installed apps.
    If verbose is True, debug information will be printed to stdout.
    If failfast is True, import errors will not be surpressed.
    """
    for app in installed_apps():
        get_module(app, modname, verbose, failfast)
