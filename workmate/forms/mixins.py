# -*- coding: utf-8 -*-
class PureCSSFormMixin(object):

    FORM_ATTRIBUTES = None

    def __init__(self, *args, **kwargs):
        super(PureCSSFormMixin, self).__init__(*args, **kwargs)
        for field in self.fields:
            field_attrs = self.FORM_ATTRIBUTES.get('fields', {}).get(field, None)
            if field_attrs:
                self.set_field_class(field, field_attrs)
                self.set_placeholder(field, field_attrs)
                self.set_help_visibility(field, field_attrs)

    def set_field_class(self, field, field_attrs):
        class_attr = field_attrs.get('class', None)
        self.fields[field].widget.attrs['class'] = class_attr or ''

    def set_help_visibility(self, field, field_attrs):
        if field_attrs.get('hide_help', None):
            self.fields[field].help_text = None

    def set_placeholder(self, field, field_attrs):
        placeholder_attr = field_attrs.get('placeholder', '')
        if placeholder_attr == 'help_text':
            self.fields[field].widget.attrs['placeholder'] = self.fields[field].help_text or ''
        elif placeholder_attr == 'label':
            self.fields[field].widget.attrs['placeholder'] = self.fields[field].label or ''
        else:
            self.fields[field].widget.attrs['placeholder'] = placeholder_attr
