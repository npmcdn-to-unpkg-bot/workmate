# -*- coding: utf-8 -*-
from django.conf import settings
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _

from workmate.menus.base import Menu, NavigationNode
from workmate.menus.menu_pool import menu_pool


class MainMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode(_('Contacts'), reverse('contact-list'), 1)
        node2 = NavigationNode(_('Admin'), '', 2, attr={'staff_only': True}, sort_order=1000)
        node3 = NavigationNode(_('Site Administration'), reverse('admin:index'), 3, 2, attr={'staff_only': True})
        node4 = NavigationNode(_('Change Password'), reverse('password_change'), 4, sort_order=1000)
        node5 = NavigationNode(_('Logout'), settings.LOGOUT_URL, 5, sort_order=1000)
        nodes = [node1, node2, node3, node4, node5]
        return nodes


menu_pool.register_menu(MainMenu)
