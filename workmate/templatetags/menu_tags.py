# -*- coding: utf-8 -*-
from django import template

from classytags.arguments import IntegerArgument, Argument, StringArgument
from classytags.core import Options
from classytags.helpers import InclusionTag

from workmate.menus.menu_pool import menu_pool

register = template.Library()


def remove(node, removed):
    removed.append(node)
    if node.parent:
        if node in node.parent.children:
            node.parent.children.remove(node)


def cut_levels(nodes, from_level, to_level):
    final = []
    removed = []

    for node in nodes:
        if not hasattr(node, 'level'):
            remove(node, removed)
            continue
        if node.level == from_level:
            final.append(node)
            node.parent = None
        if node.level > to_level and node.parent:
            remove(node, removed)
        if not node.visible:
            remove(node, removed)

    if removed:
        for node in removed:
            if node in final:
                final.remove(node)

    return final


class ShowMenu(InclusionTag):
    name = 'show_menu'
    template = 'workmate/menu/dummy.html'

    options = Options(
        IntegerArgument('from_level', default=0, required=False),
        IntegerArgument('to_level', default=100, required=False),
        StringArgument('template', default='workmate/menu/menu.html', required=False),
        StringArgument('namespace', default=None, required=False),
        Argument('next_page', default=None, required=False),
    )

    def get_context(self, context, from_level, to_level, template, namespace, next_page):
        request = context['request']

        if next_page:
            children = next_page.children
        else:
            nodes = menu_pool.get_nodes(request, namespace)
            children = cut_levels(nodes, from_level, to_level)
            children = menu_pool.apply_modifiers(children, request, namespace, post_cut=True)

        if children:
            children = sorted(children, key=lambda c: (c.sort_order, c.title))

        context['children'] = children
        context['template'] = template
        context['from_level'] = from_level
        context['to_level'] = to_level
        context['namespace'] = namespace

        return context


register.tag(ShowMenu)
