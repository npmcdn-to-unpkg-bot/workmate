# -*- coding: utf-8 -*-
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _

from workmate.conf import settings
from workmate.menus.base import Menu, NavigationNode
from workmate.menus.menu_pool import menu_pool


class MainMenu(Menu):

    title = _('Main Menu')
    sort_order = -1

    def get_nodes(self, request):
        node1 = NavigationNode(_('Home'), '/', 1, icon='home', sort_order=1)
        node2 = NavigationNode(_('Contacts'), reverse('contact-list'), 2, icon='users', sort_order=2)
        nodes = [node1, node2]
        return nodes


menu_pool.register_menu(MainMenu)


class AdminMenu(Menu):

    title = _('Administration')
    sort_order = 99

    def get_nodes(self, request):
        node1 = NavigationNode(_('Site Administration'), reverse('admin:index'), 1, icon='cogs',
                               attr={'staff_only': True})
        nodes = [node1]
        return nodes


menu_pool.register_menu(AdminMenu)


class AccountMenu(Menu):

    title = _('Account')
    sort_order = 100

    def get_nodes(self, request):
        node1 = NavigationNode(_('My Settings'), reverse('usersetting-update'), 1, icon='setting', sort_order=1)
        node2 = NavigationNode(_('Change Password'), reverse('password_change'), 2, icon='key', sort_order=2)
        node3 = NavigationNode(_('Logout'), settings.LOGOUT_URL, 3, icon='lock', sort_order=3)
        nodes = [node1, node2, node3]
        return nodes


menu_pool.register_menu(AccountMenu)
