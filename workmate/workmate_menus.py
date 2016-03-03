from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _

from workmate.menus.base import Menu, NavigationNode
from workmate.menus.menu_pool import menu_pool


class MainMenu(Menu):

    def get_nodes(self, request):
        nodes = []
        n1 = NavigationNode(_('Admin'), '', 1)
        n2 = NavigationNode(_('Site Administration'), reverse('admin:index'), 2, 1)
        n3 = NavigationNode(_('Change Password'), reverse('admin:password_change'), 3)
        n4 = NavigationNode(_('Logout'), reverse('admin:logout'), 4)
        nodes.append(n1)
        nodes.append(n2)
        nodes.append(n3)
        nodes.append(n4)
        return nodes


menu_pool.register_menu(MainMenu)
