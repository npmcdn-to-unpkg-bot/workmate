# -*- coding: utf-8 -*-
import copy

from django.core.exceptions import ValidationError
from django.core.urlresolvers import NoReverseMatch

from workmate.menus.base import Menu
from workmate.menus.exceptions import NamespaceAlreadyRegistered
from workmate.utils.django_load import load


def _build_nodes_inner_for_one_menu(nodes, menu_class_name):
    done_nodes = {}
    final_nodes = []
    list_total_length = len(nodes)

    while nodes:
        should_add_to_final_list = True
        node = nodes.pop(0)
        node._counter = getattr(node, '_counter', 0) + 1

        if not node.namespace:
            node.namespace = menu_class_name
        if node.namespace not in done_nodes:
            done_nodes[node.namespace] = {}

        if node.parent_id in done_nodes[node.namespace]:
            if not node.parent_namespace:
                node.parent_namespace = menu_class_name
            parent = done_nodes[node.namespace][node.parent_id]
            parent.children.append(node)
            node.parent = parent
        elif node.parent_id:
            if node._counter < list_total_length:
                nodes.append(node)
            should_add_to_final_list = False

        if should_add_to_final_list:
            final_nodes.append(node)
            done_nodes[node.namespace][node.id] = node
    return final_nodes


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
            if hasattr(menu_cls, "get_nodes"):
                expanded_menus[menu_class_name] = menu_cls()
            else:
                raise ValidationError("Something was registered as a menu, but isn't.")
        self._expanded = True
        self.menus = expanded_menus

    def register_menu(self, menu_cls):
        assert issubclass(menu_cls, Menu)
        self._expanded = False
        if menu_cls.__name__ in self.menus.keys():
            raise NamespaceAlreadyRegistered(
                "[{0}] a menu with this name is already registered".format(menu_cls.__name__))
        self.menus[menu_cls.__name__] = menu_cls

    def register_modifier(self, modifier_class):
        from workmate.menus.base import Modifier
        assert issubclass(modifier_class, Modifier)
        if modifier_class not in self.modifiers:
            self.modifiers.append(modifier_class)

    def _build_nodes(self, request, namespace=None):
        self._expand_menus()
        final_nodes = []
        for menu_class_name in self.menus:
            menu = self.menus[menu_class_name]
            try:
                if isinstance(menu, type):
                    menu = menu()
                nodes = menu.get_nodes(request)
            except NoReverseMatch:
                nodes = []
            if not namespace or namespace == menu_class_name:
                final_nodes += _build_nodes_inner_for_one_menu(nodes, menu_class_name)
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
        nodes = self.apply_modifiers(nodes, request, namespace, post_cut=False)
        return nodes


menu_pool = MenuPool()
