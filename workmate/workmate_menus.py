# -*- coding: utf-8 -*-
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _

from workmate.conf import settings
from workmate.menus.base import Menu, NavigationNode
from workmate.menus.menu_pool import menu_pool


class MainMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode(_('Contacts'), reverse('contact-list'), 1)
        nodes = [node1, ]
        return nodes


menu_pool.register_menu(MainMenu)


class AdminMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode(_('Admin'), '', 1, attr={'staff_only': True}, sort_order=999)
        node2 = NavigationNode(_('Site Administration'), reverse('admin:index'), 2, 1, attr={'staff_only': True})
        nodes = [node1, node2]
        return nodes


menu_pool.register_menu(AdminMenu)


class AccountMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode(_('Change Password'), reverse('password_change'), 4, sort_order=1000)
        node2 = NavigationNode(_('Logout'), settings.LOGOUT_URL, 5, sort_order=1000)
        nodes = [node1, node2]
        return nodes


menu_pool.register_menu(AccountMenu)
