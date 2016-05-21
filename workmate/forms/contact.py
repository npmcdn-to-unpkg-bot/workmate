# -*- coding: utf-8 -*-
from django import forms
from django.utils.translation import ugettext_lazy as _

from localflavor.gb.forms import GBPostcodeField

from workmate.models import Contact


class ContactForm(forms.ModelForm):
    code = GBPostcodeField(label=_('Postcode'), required=False)

    class Meta:
        model = Contact
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.fields['state'].widget.attrs['class'] = 'ui search dropdown'
        self.fields['tags'].widget.attrs['class'] = 'ui search dropdown'
