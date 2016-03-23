# -*- coding: utf-8 -*-
from workmate.menus.base import Modifier
from workmate.menus.menu_pool import menu_pool


class AuthVisibility(Modifier):

    def modify(self, request, nodes, namespace):
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

        return final


class RequireStaff(Modifier):

    def modify(self, request, nodes, namespace):
        final = []
        for node in nodes:

            is_allowed_access = True

            if (node.attr.get('staff_only', False) and not
                    request.user.is_staff):
                is_allowed_access = False

            if is_allowed_access:
                final.append(node)

        return final


def register():
    menu_pool.register_modifier(AuthVisibility)
    menu_pool.register_modifier(RequireStaff)
