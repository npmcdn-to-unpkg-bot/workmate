# -*- coding: utf-8 -*-
from django import forms

from .mixins import PureCSSFormMixin
from ..models import Contact


class ContactForm(PureCSSFormMixin, forms.ModelForm):

    FORM_ATTRIBUTES = {
        'fields': {
            'first_name': {
                'class': 'pure-input-1-3', 'placeholder': 'label'
            },
            'last_name': {
                'class': 'pure-input-1-3', 'placeholder': 'label'
            },
            'email_address': {
                'class': 'pure-input-1-3', 'placeholder': 'label'
            },
            'home_number': {
                'class': 'pure-input-1-3', 'placeholder': 'help_text', 'hide_help': True
            },
            'mobile_number': {
                'class': 'pure-input-1-3', 'placeholder': 'help_text', 'hide_help': True
            },
            'work_number': {
                'class': 'pure-input-1-3', 'placeholder': 'help_text', 'hide_help': True
            },
            'website': {
                'class': 'pure-input-1-3', 'placeholder': 'help_text', 'hide_help': True
            },
            'tags': {
                'class': 'pure-input-1-2'
            },
            'notes': {
                'class': 'pure-input-1-2'
            },
        },
    }

    class Meta:
        model = Contact
        fields = '__all__'
