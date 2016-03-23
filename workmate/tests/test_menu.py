from django.core.urlresolvers import reverse
from django.template import Template

from workmate.menus.base import Menu, NavigationNode
from workmate.menus.exceptions import NamespaceAlreadyRegistered
from workmate.menus.menu_pool import menu_pool
from workmate.test_utils.test_case import WorkmateTestCase


class StaticMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode('A', '/A/', 1)
        node2 = NavigationNode('B', '/B/', 2)
        node3 = NavigationNode('C', '/C/', 3)
        node4 = NavigationNode('D', '/D/', 4)
        node5 = NavigationNode('E', '/E/', 5)
        nodes = [node1, node2, node3, node4, node5]
        return nodes


class StaticMenu2(StaticMenu):

    def get_nodes(self, request):
        node1 = NavigationNode('F', '/F/', 1)
        nodes = [node1]
        return nodes


class StaticExtendedMenu(Menu):

    def get_nodes(self, request):
        node1 = NavigationNode('C EX', '/C_EX/', 1, parent_namespace='StaticMenu')
        node2 = NavigationNode('F', '/F/', 1)
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
        node2 = NavigationNode('B', '/B/', 2)
        node3 = NavigationNode('C', '/C/', 3)
        node4 = NavigationNode('D', '/D/', 4, visible=False)
        node5 = NavigationNode('E', '/E/', 5, visible=False)
        node6 = NavigationNode('F', '/F/', 6)
        nodes = [node1, node2, node3, node4, node5, node6]
        return nodes


class InvalidMenuClass(object):

    pass


class NavigationNodeTests(WorkmateTestCase):

    def setUp(self):
        self.node = NavigationNode(
            title='foo',
            url='/',
            id=1,
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


class MenuDescoveryTests(WorkmateTestCase):

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


class MenuTemplateTagTests(WorkmateTestCase):

    def setUp(self):
        menu_pool.discovered = False
        self.old_menu = menu_pool.menus
        menu_pool.menus = {}
        menu_pool.discover_menus()

    def tearDown(self):
        menu_pool._expanded = False
        menu_pool.menus = self.old_menu

    def test_menu_nodes(self):
        menu_pool.register_menu(StaticMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['nodes']
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[0].get_absolute_url(), '/A/')
        self.assertEqual(nodes[1].title, 'B')
        self.assertEqual(nodes[1].get_absolute_url(), '/B/')
        self.assertEqual(nodes[2].title, 'C')
        self.assertEqual(nodes[2].get_absolute_url(), '/C/')
        self.assertEqual(nodes[3].title, 'D')
        self.assertEqual(nodes[3].get_absolute_url(), '/D/')
        self.assertEqual(nodes[4].title, 'E')
        self.assertEqual(nodes[4].get_absolute_url(), '/E/')

    def test_menu_nodes_from_multiple_menus(self):
        menu_pool.register_menu(StaticMenu)
        menu_pool.register_menu(StaticMenu2)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['nodes']
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[1].title, 'B')
        self.assertEqual(nodes[2].title, 'C')
        self.assertEqual(nodes[3].title, 'D')
        self.assertEqual(nodes[4].title, 'E')
        self.assertEqual(nodes[5].title, 'F')

    def test_menu_from_single_namespace(self):
        menu_pool.register_menu(StaticMenu)
        menu_pool.register_menu(StaticMenu2)
        context = self.get_context()
        tpl = Template('{% load menu_tags %}{% show_menu "workmate/menu/menu.html" "StaticMenu" %}')
        tpl.render(context)
        nodes = context['nodes']
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[1].title, 'B')
        self.assertEqual(nodes[2].title, 'C')
        self.assertEqual(nodes[3].title, 'D')
        self.assertEqual(nodes[4].title, 'E')

    def test_invalid_reverse_in_node_renders_empty_menu(self):
        menu_pool.register_menu(InvalidURLMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['nodes']
        self.assertEqual(len(nodes), 0)

    def test_appending_nodes_to_existing_namespace(self):
        menu_pool.register_menu(StaticMenu)
        menu_pool.register_menu(StaticExtendedMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['nodes']
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[1].title, 'B')
        self.assertEqual(nodes[2].title, 'C')
        self.assertEqual(nodes[3].title, 'C EX')
        self.assertEqual(nodes[4].title, 'D')
        self.assertEqual(nodes[5].title, 'E')
        self.assertEqual(nodes[6].title, 'F')

    def test_node_visibility(self):
        menu_pool.register_menu(VisibilityMenu)
        context = self.get_context()
        tpl = Template("{% load menu_tags %}{% show_menu %}")
        tpl.render(context)
        nodes = context['nodes']
        self.assertEqual(len(nodes), 4)
        self.assertEqual(nodes[0].title, 'A')
        self.assertEqual(nodes[1].title, 'B')
        self.assertEqual(nodes[2].title, 'C')
        self.assertEqual(nodes[3].title, 'F')
