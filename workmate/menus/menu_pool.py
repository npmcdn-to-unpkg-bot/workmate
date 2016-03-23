# -*- coding: utf-8 -*-
import copy

from django.core.urlresolvers import NoReverseMatch

from workmate.menus.base import Menu
from workmate.menus.exceptions import NamespaceAlreadyRegistered
from workmate.utils.django_load import load


class MenuPool(object):
    def __init__(self):
        self.menus = {}
        self.modifiers = []
        self.discovered = False
        self._expanded = False

    def discover_menus(self):
        if self.discovered:
            return
        load('workmate_menus')
        from workmate.menus.modifiers import register
        register()
        self.discovered = True
        self._expanded = False

    def _expand_menus(self):
        if self._expanded:
            return
        expanded_menus = {}
        for menu_class_name, menu_cls in self.menus.items():
            expanded_menus[menu_class_name] = menu_cls()
        self._expanded = True
        self.menus = expanded_menus

    def register_menu(self, menu_cls):
        assert issubclass(menu_cls, Menu)
        self._expanded = False
        if menu_cls.__name__ in self.menus.keys():
            raise NamespaceAlreadyRegistered("[{0}] menu class already registered".format(menu_cls.__name__))
        self.menus[menu_cls.__name__] = menu_cls

    def register_modifier(self, modifier_class):
        from workmate.menus.base import Modifier
        assert issubclass(modifier_class, Modifier)
        if modifier_class not in self.modifiers:
            self.modifiers.append(modifier_class)

    def _build_nodes(self, request, namespace=None):
        self._expand_menus()

        all_menu_nodes = []
        final_nodes = []

        # find nodes from all menus
        for menu_class_name in self.menus:
            menu = self.menus[menu_class_name]
            try:
                nodes = menu.get_nodes(request)
            except NoReverseMatch:
                nodes = []
            # ensure each node has a namespace
            # note at this point a node may belong to another menu via parent_namespace
            for node in nodes:
                node.namespace = node.parent_namespace or menu_class_name
                node.parent_namespace = node.parent_namespace or node.namespace
            all_menu_nodes += nodes

        # redistribute the nodes across the menus they belong to
        reorganised_nodes = {}
        for node in all_menu_nodes:
            if node.namespace not in reorganised_nodes:
                reorganised_nodes[node.namespace] = []
            reorganised_nodes[node.namespace].append(node)

        # finally return the menus
        for menu_class in reorganised_nodes:
            if not namespace or namespace == menu_class:
                nodes_for_class = reorganised_nodes[menu_class]
                final_nodes += nodes_for_class

        return final_nodes

    def apply_modifiers(self, nodes, request, namespace=None, post_cut=False):
        for cls in self.modifiers:
            inst = cls()
            nodes = inst.modify(request, nodes, namespace, post_cut)
        return nodes

    def get_nodes(self, request, namespace=None):
        self.discover_menus()
        nodes = self._build_nodes(request, namespace)
        nodes = copy.deepcopy(nodes)
        nodes = self.apply_modifiers(nodes, request, namespace)
        return nodes


menu_pool = MenuPool()
