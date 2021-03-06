from django.template import Template
from django.utils.translation import ugettext_lazy as _

from workmate.menus.base import Menu, NavigationNode
from workmate.menus.menu_pool import menu_pool
from workmate.test_utils.test_case import WorkmateTestCase


class StaticMenu(Menu):

    name = _("Static Menu")

    def get_nodes(self, request):
        node1 = NavigationNode('A', '/A/', 1, attr={'visible_for_anonymous': False})
        node2 = NavigationNode('B', '/B/', 2, attr={'visible_for_authenticated': False})
        node3 = NavigationNode('C', '/C/', 3)
        node4 = NavigationNode('D', '/D/', 4, attr={'staff_only': True})
        nodes = [node1, node2, node3, node4]
        return nodes


class MenuAuthTests(WorkmateTestCase):

    def setUp(self):
        menu_pool.discovered = False
        self.old_menu = menu_pool.menus
        menu_pool.menus = {}
        menu_pool.discover_menus()

    def tearDown(self):
        menu_pool._expanded = False
        menu_pool.menus = self.old_menu

    def test_menu_for_anonymous(self):
        menu_pool.register_menu(StaticMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['nodes']
        self.assertEqual(len(nodes), 2)
        self.assertEqual(nodes[0].title, 'B')
        self.assertEqual(nodes[1].title, 'C')

    def test_menu_for_authenticated(self):
        menu_pool.register_menu(StaticMenu)
        user = self.create_user()
        context = self.get_context(user=user)
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['nodes']
        self.assertEqual(len(nodes), 2)
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[1].title, 'C')

    def test_menu_for_staff(self):
        menu_pool.register_menu(StaticMenu)
        user = self.create_user(is_staff=True)
        context = self.get_context(user=user)
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['nodes']
        self.assertEqual(len(nodes), 3)
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[1].title, 'C')
        self.assertEqual(nodes[2].title, 'D')
