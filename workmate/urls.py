# -*- coding: utf-8 -*-
from django.conf.urls import url

from workmate.views import MainView


urlpatterns = [

    url(r'^$', MainView.as_view(), name='workmate-main'),

]
