# -*- coding: utf-8 -*-
from workmate.menus.base import Modifier
from workmate.menus.menu_pool import menu_pool


class Level(Modifier):
    post_cut = True

    def modify(self, request, nodes, namespace, post_cut):
        for node in nodes:

            if not node.parent:
                if post_cut:
                    node.menu_level = 0
                else:
                    node.level = 0
                self.mark_levels(node, post_cut)

        return nodes

    def mark_levels(self, node, post_cut):
        for child in node.children:
            if post_cut:
                child.menu_level = node.menu_level + 1
            else:
                child.level = node.level + 1
            self.mark_levels(child, post_cut)


class AuthVisibility(Modifier):

    def modify(self, request, nodes, namespace, post_cut):
        if post_cut:
            return nodes
        final = []
        for node in nodes:

            is_allowed_access = False

            if (node.attr.get('visible_for_authenticated', True) and
                    request.user.is_authenticated()) or \
                (node.attr.get('visible_for_anonymous', True) and not
                    request.user.is_authenticated()):
                is_allowed_access = True

            if is_allowed_access:
                final.append(node)
            else:
                if node.parent and node in node.parent.children:
                    node.parent.children.remove(node)

        return final


class RequireStaff(Modifier):

    def modify(self, request, nodes, namespace, post_cut):
        if post_cut:
            return nodes
        final = []
        for node in nodes:

            is_allowed_access = True

            if (node.attr.get('staff_only', False) and not
                    request.user.is_staff):
                is_allowed_access = False

            if is_allowed_access:
                final.append(node)
            else:
                if node.parent and node in node.parent.children:
                    node.parent.children.remove(node)

        return final


def register():
    menu_pool.register_modifier(AuthVisibility)
    menu_pool.register_modifier(RequireStaff)
    menu_pool.register_modifier(Level)
