# -*- coding: utf-8 -*-
from django.utils.encoding import smart_str


class Menu(object):
    namespace = None

    def __init__(self):
        self.namespace = self.__class__.__name__

    def get_nodes(self, request):
        raise NotImplementedError


class Modifier(object):

    def modify(self, request, nodes, namespace, post_cut):
        raise NotImplementedError


class NavigationNode(object):

    def __init__(self, title, url, id, parent_namespace=None, attr=None, visible=True, sort_order=0):
        self.children = []
        self.parent = None
        self.namespace = None
        self.title = title
        self.url = url
        self.id = id
        self.parent_namespace = parent_namespace
        self.visible = visible
        self.sort_order = sort_order
        self.attr = attr or {}

    def __repr__(self):
        return "<Navigation Node: %s>" % smart_str(self.title)

    def get_menu_title(self):
        return self.title

    def get_absolute_url(self):
        return self.url
