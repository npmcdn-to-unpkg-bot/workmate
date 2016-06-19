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
