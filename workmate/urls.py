# -*- coding: utf-8 -*-
from django.conf.urls import include, url

from workmate.views import ContactCreate, ContactDelete, ContactList, ContactUpdate, MainView


urlpatterns = [

    url(r'contacts/$', ContactList.as_view(), name='contact-list'),
    url(r'contacts/create/$', ContactCreate.as_view(), name='contact-create'),
    url(r'contacts/(?P<pk>[0-9]+)/delete/$', ContactDelete.as_view(), name='contact-delete'),
    url(r'contacts/(?P<pk>[0-9]+)/update/$', ContactUpdate.as_view(), name='contact-update'),

    url(r'^$', MainView.as_view(), name='workmate-main'),

]
