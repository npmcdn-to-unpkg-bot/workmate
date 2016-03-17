from django.contrib.auth.models import AnonymousUser, User
from django.template import Template
from django.template.context import Context
from django.test import TestCase
from django.utils.translation import ugettext_lazy as _

from workmate.menus.base import Menu, NavigationNode
from workmate.menus.menu_pool import menu_pool
from workmate.test_utils.helpers import get_request


class StaticMenu(Menu):

    name = _("Static Menu")

    def get_nodes(self, request):
        node1 = NavigationNode('A', '/A/', 1, attr={'visible_for_anonymous': False})
        node2 = NavigationNode('A1', '/A1/', 4, 1)
        node3 = NavigationNode('B', '/B/', 2, attr={'visible_for_authenticated': False})
        node4 = NavigationNode('B1', '/B1/', 5, 2)
        node5 = NavigationNode('C', '/C/', 3)
        node6 = NavigationNode('C1', '/C1/', 6, 3, attr={'staff_only': True})
        nodes = [node1, node2, node3, node4, node5, node6]
        return nodes


class MenuAuthTests(TestCase):

    def setUp(self):
        menu_pool.discovered = False
        self.old_menu = menu_pool.menus
        menu_pool.menus = {}
        menu_pool.discover_menus()
        self.user = User.objects._create_user('user', 'user@ex.com', 'password', is_staff=False, is_superuser=False)
        self.staff = User.objects._create_user('staff', 'staff@ex.com', 'password', is_staff=True, is_superuser=False)

    def tearDown(self):
        menu_pool._expanded = False
        menu_pool.menus = self.old_menu

    def get_context(self, user=None):
        context = {}
        request = get_request(user=user)
        context['request'] = request
        return Context(context)

    def test_menu_for_anonymous(self):
        menu_pool.register_menu(StaticMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(len(nodes), 2)
        self.assertEqual(nodes[0].title, 'B')
        self.assertEqual(nodes[0].children[0].title, 'B1')
        self.assertEqual(nodes[1].title, 'C')

    def test_menu_for_authenticated(self):
        menu_pool.register_menu(StaticMenu)
        context = self.get_context(user=self.user)
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(len(nodes), 2)
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].children[0].title, 'A1')
        self.assertEqual(nodes[1].title, 'C')

    def test_menu_for_staff(self):
        menu_pool.register_menu(StaticMenu)
        context = self.get_context(user=self.staff)
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(len(nodes), 2)
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].children[0].title, 'A1')
        self.assertEqual(nodes[1].title, 'C')
        self.assertEqual(nodes[1].children[0].title, 'C1')
