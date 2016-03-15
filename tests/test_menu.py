from django.core.urlresolvers import reverse
from django.template import Template
from django.template.context import Context
from django.test import TestCase

from .helpers import get_request
from workmate.menus.base import Menu, NavigationNode
from workmate.menus.menu_pool import menu_pool
from workmate.menus.exceptions import NamespaceAlreadyRegistered


class StaticMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode('A', '/A/', 1)
        node2 = NavigationNode('B', '/B/', 2, 1)
        node3 = NavigationNode('C', '/C/', 3, 2)
        node4 = NavigationNode('D', '/D/', 4, 2)
        node5 = NavigationNode('E', '/E/', 5)
        nodes = [node1, node2, node3, node4, node5]
        return nodes


class StaticMenu2(StaticMenu):

    def get_nodes(self, request):
        node1 = NavigationNode('F', '/F/', 1)
        node2 = NavigationNode('G', '/G/', 2, 1)
        node3 = NavigationNode('H', '/H/', 3, 2)
        node4 = NavigationNode('I', '/I/', 4, 2)
        node5 = NavigationNode('J', '/J/', 5)
        nodes = [node1, node2, node3, node4, node5]
        return nodes


class StaticExtendedMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode('C EX', '/C_EX/', 1, 3, parent_namespace='StaticMenu')
        node2 = NavigationNode('F', '/F/', 1)
        nodes = [node1, node2]
        return nodes


class ParentNodeFirst(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode('B', '/B/', 2, 1)
        node2 = NavigationNode('A', '/A/', 1)
        nodes = [node1, node2]
        return nodes


class InvalidURLMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode('invalid', reverse('foo'), 1)
        nodes = [node1]
        return nodes


class VisibilityMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode('A', '/A/', 1)
        node2 = NavigationNode('B', '/B/', 2, 1)
        node3 = NavigationNode('C', '/C/', 3, 2)
        node4 = NavigationNode('D', '/D/', 4, 2, visible=False)
        node5 = NavigationNode('E', '/E/', 5, visible=False)
        node6 = NavigationNode('F', '/F/', 6, 5)
        nodes = [node1, node2, node3, node4, node5, node6]
        return nodes


class InvalidMenuClass(object):

    pass


class NavigationNodeTests(TestCase):

    def setUp(self):
        self.node = NavigationNode(
            title='foo',
            url='/',
            id=1,
            parent_id=2,
            parent_namespace='AnotherMenu',
            attr={'foo': True},
            visible=False,
            sort_order=1000
        )

    def test_repr(self):
        self.assertEqual(str(self.node), '<Navigation Node: foo>')

    def test_get_menu_title(self):
        self.assertEqual(self.node.get_menu_title(), self.node.title)

    def test_get_absolute_url(self):
        self.assertEqual(self.node.get_absolute_url(), self.node.url)


class MenuDescoveryTests(TestCase):

    def setUp(self):
        menu_pool.discovered = False
        self.old_menu = menu_pool.menus
        menu_pool.menus = {}
        menu_pool.discover_menus()
        menu_pool.register_menu(StaticMenu)
        menu_pool.register_menu(StaticMenu2)

    def tearDown(self):
        menu_pool._expanded = False
        menu_pool.menus = self.old_menu

    def test_menu_types_class(self):
        for key, menu in menu_pool.menus.items():
            self.assertTrue(issubclass(menu, Menu))

    def test_invalid_menu_class_raises_exception(self):
        with self.assertRaises(AssertionError):
            menu_pool.register_menu(InvalidMenuClass)

    def test_duplicate_menu_class_raises_exception(self):
        with self.assertRaises(NamespaceAlreadyRegistered):
            menu_pool.register_menu(StaticMenu)
            menu_pool._expand_menus()


class MenuTemplateTagTests(TestCase):

    def setUp(self):
        menu_pool.discovered = False
        self.old_menu = menu_pool.menus
        menu_pool.menus = {}
        menu_pool.discover_menus()

    def tearDown(self):
        menu_pool._expanded = False
        menu_pool.menus = self.old_menu

    def get_context(self, path=None):
        context = {}
        request = get_request(path)
        context['request'] = request
        return Context(context)

    def test_menu_full_level(self):
        menu_pool.register_menu(StaticMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].get_absolute_url(), '/A/')
        self.assertEqual(nodes[0].children[0].title, 'B')
        self.assertEqual(nodes[0].children[0].get_absolute_url(), '/B/')
        self.assertEqual(nodes[0].children[0].children[0].title, 'C')
        self.assertEqual(nodes[0].children[0].children[0].get_absolute_url(), '/C/')
        self.assertEqual(nodes[0].children[0].children[1].title, 'D')
        self.assertEqual(nodes[0].children[0].children[1].get_absolute_url(), '/D/')
        self.assertEqual(nodes[1].title, 'E')
        self.assertEqual(nodes[1].get_absolute_url(), '/E/')

    def test_menu_from_multiple_menus(self):
        menu_pool.register_menu(StaticMenu)
        menu_pool.register_menu(StaticMenu2)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].children[0].title, 'B')
        self.assertEqual(nodes[0].children[0].children[0].title, 'C')
        self.assertEqual(nodes[0].children[0].children[1].title, 'D')
        self.assertEqual(nodes[1].title, 'E')
        self.assertEqual(nodes[2].title, 'F')
        self.assertEqual(nodes[2].children[0].title, 'G')
        self.assertEqual(nodes[2].children[0].children[0].title, 'H')
        self.assertEqual(nodes[2].children[0].children[1].title, 'I')
        self.assertEqual(nodes[3].title, 'J')

    def test_menu_from_single_namespace(self):
        menu_pool.register_menu(StaticMenu)
        menu_pool.register_menu(StaticMenu2)
        context = self.get_context()
        tpl = Template('{% load menu_tags %}{% show_menu 0 100 "workmate/menu/menu.html" "StaticMenu" %}')
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(len(nodes), 2)
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].children[0].title, 'B')
        self.assertEqual(nodes[0].children[0].children[0].title, 'C')
        self.assertEqual(nodes[0].children[0].children[1].title, 'D')
        self.assertEqual(nodes[1].title, 'E')

    def test_menu_from_level(self):
        menu_pool.register_menu(StaticMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu 1 %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(nodes[0].title, 'B')
        self.assertEqual(nodes[0].children[0].title, 'C')
        self.assertEqual(nodes[0].children[1].title, 'D')

    def test_menu_to_level(self):
        menu_pool.register_menu(StaticMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu 0 1 %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].children[0].title, 'B')
        self.assertFalse(nodes[0].children[0].children)
        self.assertEqual(nodes[1].title, 'E')

    def test_invalid_reverse_in_node_renders_empty_menu(self):
        menu_pool.register_menu(InvalidURLMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(len(nodes), 0)

    def test_parent_node_added_before_child(self):
        menu_pool.register_menu(ParentNodeFirst)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].children[0].title, 'B')

    def test_appending_nodes_to_existing_namespace(self):
        menu_pool.register_menu(StaticMenu)
        menu_pool.register_menu(StaticExtendedMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].children[0].title, 'B')
        self.assertEqual(nodes[0].children[0].children[0].title, 'C')
        self.assertEqual(nodes[0].children[0].children[0].children[0].title, 'C EX')
        self.assertEqual(nodes[0].children[0].children[1].title, 'D')
        self.assertEqual(nodes[1].title, 'E')
        self.assertEqual(nodes[2].title, 'F')

    def test_node_visibility(self):
        menu_pool.register_menu(VisibilityMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['children']
        self.assertEqual(len(nodes), 1)
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].children[0].title, 'B')
        self.assertEqual(len(nodes[0].children[0].children), 1)
        self.assertEqual(nodes[0].children[0].children[0].title, 'C')
