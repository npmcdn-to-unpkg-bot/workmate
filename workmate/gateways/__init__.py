from django.utils.module_loading import import_string


def get_gateway_class(import_path):
    return import_string(import_path)
