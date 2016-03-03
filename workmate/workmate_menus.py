from django.conf import settings
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _

from workmate.menus.base import Menu, NavigationNode
from workmate.menus.menu_pool import menu_pool


class MainMenu(Menu):

    staff_only_attr = {'visible_to_staff_only': True}

    def get_nodes(self, request):
        nodes = []
        n1 = NavigationNode(_('Admin'), '', 1, attr=self.staff_only_attr)
        n2 = NavigationNode(_('Site Administration'), reverse('admin:index'), 2, 1, attr=self.staff_only_attr)
        n3 = NavigationNode(_('Change Password'), reverse('password_change'), 1)
        n4 = NavigationNode(_('Logout'), settings.LOGOUT_URL, 2)
        nodes.append(n1)
        nodes.append(n2)
        nodes.append(n3)
        nodes.append(n4)
        return nodes


menu_pool.register_menu(MainMenu)
