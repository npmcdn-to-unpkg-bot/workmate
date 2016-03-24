#####
Menus
#####

You can add your own menus and navigation items as guided below:

Create a ``workmate_menus.py`` in your application, with the following::

    from django.utils.translation import ugettext_lazy as _
    from workmate.menus.base import Menu, NavigationNode
    from workmate.menus.menu_pool import menu_pool

    class TestMenu(Menu):

        title = _('Test Menu')  # The menu title the nodes are grouped under
        sort_order = 1  # The ordering of the top level menus

        def get_nodes(self, request):
            node1 = NavigationNode(_('Test Page'), '/foo/', 1)
            node2 = NavigationNode(_('Another Test Page'), '/bar/', 2)
            nodes = [node1, node2]
            return nodes

    menu_pool.register_menu(TestMenu)

Refreshing the page will show the new items in the menu.
The ``get_nodes`` function should return a list of
:class:`NavigationNode <workmate.menus.base.NavigationNode>` instances. A
:class:`NavigationNode` takes the following arguments:

``title``
  Text for the menu node

``url``
  URL for the menu node link

``id``
  A unique id for this menu node

``parent_namespace=None``
  If you want the menu item to appear in another menu then this can be set
  to the class name of that menu

``attr=None``
  A dictionary of additional attributes you may want to use in a modifier or
  in the template

``visible=True``
  Whether or not this menu item should be visible

``sort_order=None``
  Whether or not this menu item should be visible

Customise menus at runtime
##########################

To adapt your menus according to request dependent conditions (say: anonymous/logged in user), you
can use `Navigation Modifiers`_ or you can make use of existing ones.

For example it's possible to add ``{'visible_for_anonymous':
False}``/``{'visible_for_authenticated': False}``/``{'staff_only': True}`` attributes recognised by the
``AuthVisibility`` and ``RequireStaff`` modifiers.

Complete example::

    class UserMenu(Menu):

        title = _('User Menu')

        def get_nodes(self, request):
            return [
                NavigationNode(_("Profile"), reverse(profile), 1, attr={'visible_for_anonymous': False}),
                NavigationNode(_("Log in"), reverse(login), 3, attr={'visible_for_authenticated': False}),
                NavigationNode(_("Sign up"), reverse(logout), 4, attr={'visible_for_authenticated': False}),
                NavigationNode(_("Log out"), reverse(logout), 2, attr={'visible_for_anonymous': False}),
                NavigationNode(_("System Admin"), reverse(admin), 2, attr={'staff_only': True}),
            ]

Navigation Modifiers
####################

Navigation Modifiers give your application access to navigation menus.

A modifier can change the properties of existing nodes or rearrange entire
menus.


Example use-cases
#################

A simple example: suppose you have a bunch of help pages that you want users to be able to hide
if they tick a setting in their profile.

How it works
############

Place your modifiers in your application's ``workmate_menus.py``.

To make your modifier available, it then needs to be registered with
``workmate.menus.menu_pool.menu_pool``.

Now, when a page is loaded and the menu generated, your modifier will
be able to inspect and modify its nodes.

Here is an example of a simple modifier that checks for the is_staff status
``NavigationNode``::

    from workmate.menus.base import Modifier
    from workmate.menus.menu_pool import menu_pool

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


    menu_pool.register_modifier(RequireStaff)


It has a method :meth:`~workmate.menus.base.Modifier.modify` that should return a list
of :class:`~workmate.menus.base.NavigationNode` instances.
:meth:`~workmate.menus.base.Modifier.modify` should take the following arguments:

``request``
  A Django request instance. You want to modify based on sessions, or
  user or permissions?

``nodes``
  All the nodes. Normally you want to return them again.

``namespace``
  A Menu Namespace. Only given if somebody requested a menu with only nodes
  from this namespace.
