# -*- coding: utf-8 -*-
from django import template

from classytags.arguments import Argument, StringArgument
from classytags.core import Options
from classytags.helpers import InclusionTag

from workmate.menus.menu_pool import menu_pool

register = template.Library()


def check_visibility(nodes):
    final = []

    for node in nodes:
        if node.visible:
            final.append(node)

    return final


class ShowMenu(InclusionTag):
    name = 'show_menu'
    template = 'workmate/menu/dummy.html'

    options = Options(
        StringArgument('template', default='workmate/menu/menu.html', required=False),
        StringArgument('namespace', default=None, required=False),
        Argument('next_page', default=None, required=False),
    )

    def get_context(self, context, template, namespace, next_page):
        request = context['request']
        nodes = menu_pool.get_nodes(request, namespace)
        nodes = check_visibility(nodes)
        nodes = menu_pool.apply_modifiers(nodes, request, namespace, post_cut=True)
        nodes = sorted(nodes, key=lambda c: (c.sort_order, c.title))

        context['nodes'] = nodes
        context['template'] = template
        context['namespace'] = namespace

        return context


register.tag(ShowMenu)
