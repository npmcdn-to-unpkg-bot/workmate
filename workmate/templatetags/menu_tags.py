# -*- coding: utf-8 -*-
from django import template

from classytags.arguments import IntegerArgument, Argument, StringArgument
from classytags.core import Options
from classytags.helpers import InclusionTag

from workmate.menus.menu_pool import menu_pool

register = template.Library()


class NOT_PROVIDED:
    pass


def cut_after(node, levels, removed):
    """
    given a tree of nodes cuts after N levels
    """
    if levels == 0:
        removed.extend(node.children)
        node.children = []
    else:
        removed_local = []
        for child in node.children:
            if child.visible:
                cut_after(child, levels - 1, removed)
            else:
                removed_local.append(child)
        for removed_child in removed_local:
            node.children.remove(removed_child)
        removed.extend(removed_local)


def remove(node, removed):
    removed.append(node)
    if node.parent:
        if node in node.parent.children:
            node.parent.children.remove(node)


def cut_levels(nodes, from_level, to_level, extra_inactive, extra_active):
    """
    cutting nodes away from menus
    """
    final = []
    removed = []
    selected = None

    for node in nodes:
        if not hasattr(node, 'level'):
            # remove and ignore nodes that don't have level information
            remove(node, removed)
            continue
        if node.level == from_level:
            # turn nodes that are on from_level into root nodes
            final.append(node)
            node.parent = None
        if not node.ancestor and not node.selected and not node.descendant:
            # cut inactive nodes to extra_inactive, but not of descendants of
            # the selected node
            # cut_after(node, extra_inactive, removed)
            pass
        if node.level > to_level and node.parent:
            # remove nodes that are too deep, but not nodes that are on
            # from_level (local root nodes)
            remove(node, removed)
        if node.selected:
            selected = node
        if not node.visible:
            remove(node, removed)
    if selected:
        cut_after(selected, extra_active, removed)
    if removed:
        for node in removed:
            if node in final:
                final.remove(node)
    return final


def flatten(nodes):
    flat = []
    for node in nodes:
        flat.append(node)
        flat.extend(flatten(node.children))
    return flat


class ShowMenu(InclusionTag):
    """
    render a nested list of all children of the pages
    - from_level: starting level
    - to_level: max level
    - extra_inactive: how many levels should be rendered of the not active tree?
    - extra_active: how deep should the children of the active node be rendered?
    - namespace: the namespace of the menu. if empty will use all namespaces
    - root_id: the id of the root node
    - template: template used to render the menu
    """
    name = 'show_menu'
    template = 'workmate/menu/dummy.html'

    options = Options(
        IntegerArgument('from_level', default=0, required=False),
        IntegerArgument('to_level', default=100, required=False),
        IntegerArgument('extra_inactive', default=0, required=False),
        IntegerArgument('extra_active', default=1000, required=False),
        StringArgument('template', default='workmate/menu/menu.html', required=False),
        StringArgument('namespace', default=None, required=False),
        StringArgument('root_id', default=None, required=False),
        Argument('next_page', default=None, required=False),
    )

    def get_context(self, context, from_level, to_level, extra_inactive,
                    extra_active, template, namespace, root_id, next_page):
        try:
            # If there's an exception (500), default context_processors may not be called.
            request = context['request']
        except KeyError:
            return {'template': 'workmate/menu/empty.html'}

        if next_page:
            children = next_page.children
        else:
            # new menu... get all the data so we can save a lot of queries
            nodes = menu_pool.get_nodes(request, namespace, root_id)
            if root_id:  # find the root id and cut the nodes
                id_nodes = menu_pool.get_nodes_by_attribute(nodes, "reverse_id", root_id)
                if id_nodes:
                    node = id_nodes[0]
                    nodes = node.children
                    for remove_parent in nodes:
                        remove_parent.parent = None
                    from_level += node.level + 1
                    to_level += node.level + 1
                    nodes = flatten(nodes)
                else:
                    nodes = []
            children = cut_levels(nodes, from_level, to_level, extra_inactive, extra_active)
            children = menu_pool.apply_modifiers(children, request, namespace, root_id, post_cut=True)

        try:
            context['children'] = children
            context['template'] = template
            context['from_level'] = from_level
            context['to_level'] = to_level
            context['extra_inactive'] = extra_inactive
            context['extra_active'] = extra_active
            context['namespace'] = namespace
        except:
            context = {"template": template}
        return context


register.tag(ShowMenu)
